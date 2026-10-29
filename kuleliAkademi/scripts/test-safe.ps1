#Requires -Version 5.1
<#
.SYNOPSIS
    The ONLY sanctioned way to run this project's PHPUnit suite.

.DESCRIPTION
    Refuses to run tests unless it can positively confirm, from inside the
    app container, that the resolved database connection is the disposable
    mysql_test / kuleliakademi_test database -- never kuleli_mysql /
    kuleliakademi (the real local dev database with real data).

    Background: on 2026-07-22, running `docker exec kuleli_app ./vendor/bin/phpunit`
    directly wiped the dev database, because docker-compose.yml sets DB_* as
    real container env vars which silently beat phpunit.xml's <env> overrides
    unless force="true" is used. This script re-verifies at runtime instead of
    trusting config files alone.
#>

param(
    [string]$AppContainer = "kuleli_app",
    [string]$TestDbContainer = "kuleli_mysql_test",
    [string]$TestDbService = "mysql_test",
    [string]$ExpectedConnection = "mysql",
    [string]$ExpectedHost = "mysql_test",
    [string]$ExpectedDatabase = "kuleliakademi_test",
    [string]$ForbiddenDatabase = "kuleliakademi"
)

function Write-Section($text) {
    Write-Host ""
    Write-Host "== $text ==" -ForegroundColor Cyan
}

Write-Section "Expected test configuration"
Write-Host "  APP_ENV      : testing"
Write-Host "  DB_CONNECTION: $ExpectedConnection"
Write-Host "  DB_HOST      : $ExpectedHost"
Write-Host "  DB_DATABASE  : $ExpectedDatabase"
Write-Host "  container    : $AppContainer (app) / $TestDbContainer (db)"
Write-Host "  volume       : mysql_test_data (kuleliakademi_mysql_test_data)"

Write-Section "Ensuring the disposable test database is running"
docker compose up -d $TestDbService
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to start the '$TestDbService' service." -ForegroundColor Red
    exit 1
}

Write-Host "Waiting for MySQL in '$TestDbContainer' to accept connections..."
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    docker exec $TestDbContainer mysqladmin ping -uroot -proot --silent 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $ready = $true
        break
    }
    Start-Sleep -Seconds 2
}

if (-not $ready) {
    Write-Host "Timed out waiting for '$TestDbContainer' to become ready." -ForegroundColor Red
    exit 1
}
Write-Host "  ready." -ForegroundColor Green

Write-Section "Resolving the ACTUAL database Laravel will use for tests"

$envArgs = @(
    "-e", "APP_ENV=testing",
    "-e", "DB_CONNECTION=$ExpectedConnection",
    "-e", "DB_HOST=$ExpectedHost",
    "-e", "DB_PORT=3306",
    "-e", "DB_DATABASE=$ExpectedDatabase",
    "-e", "DB_USERNAME=root",
    "-e", "DB_PASSWORD=root"
)

$resolved = docker exec @envArgs $AppContainer php artisan db:resolve 2>$null |
    Select-Object -Last 1

Write-Host "  resolved -> $resolved"

$parts = $resolved -split '\|'
$resolvedConnection = $parts[0]
$resolvedHost = $parts[1]
$resolvedDatabase = $parts[2]

if ($resolvedDatabase -eq $ForbiddenDatabase) {
    Write-Host ""
    Write-Host "ABORTING: resolved database is '$ForbiddenDatabase' -- the REAL dev database." -ForegroundColor Red
    Write-Host "Refusing to run tests. Fix the environment/config before retrying." -ForegroundColor Red
    exit 1
}

if ($resolvedConnection -ne $ExpectedConnection -or $resolvedHost -ne $ExpectedHost -or $resolvedDatabase -ne $ExpectedDatabase) {
    Write-Host ""
    Write-Host "ABORTING: resolved DB config does not match the expected disposable test DB." -ForegroundColor Red
    Write-Host "  expected: $ExpectedConnection|$ExpectedHost|$ExpectedDatabase" -ForegroundColor Red
    Write-Host "  resolved: $resolved" -ForegroundColor Red
    exit 1
}

Write-Host "  confirmed safe: tests will run against '$resolvedDatabase' on '$resolvedHost'." -ForegroundColor Green

Write-Section "Running PHPUnit"
docker exec @envArgs $AppContainer ./vendor/bin/phpunit @args
exit $LASTEXITCODE
