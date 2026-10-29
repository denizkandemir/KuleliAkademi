<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

/**
 * Diagnostic-only command used by scripts/test-safe.ps1 to positively confirm
 * which database Laravel will actually use before any test run touches it.
 * Prints "<connection>|<host>|<database>" on a single line.
 */
class ResolveDatabaseConnection extends Command
{
    protected $signature = 'db:resolve';

    protected $description = 'Print the resolved default DB connection, host, and database name as connection|host|database.';

    public function handle(): int
    {
        $connection = config('database.default');
        $host = config("database.connections.{$connection}.host");
        $database = config("database.connections.{$connection}.database");

        $this->line("{$connection}|{$host}|{$database}");

        return self::SUCCESS;
    }
}
