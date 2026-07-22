<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        if (! $this->app->runningUnitTests()) {
            return;
        }

        $connection = (string) config('database.default');

        $database = (string) config(
            "database.connections.{$connection}.database"
        );

        $host = (string) config(
            "database.connections.{$connection}.host"
        );

        $safeInMemorySqlite =
            $connection === 'sqlite'
            && $database === ':memory:';

        $safeMySqlTestDatabase =
            $connection === 'mysql'
            && $host === 'mysql_test'
            && preg_match(
                '/^kuleliakademi_test(?:_\d+)?$/',
                $database
            ) === 1;

        if (! $safeInMemorySqlite && ! $safeMySqlTestDatabase) {
            throw new LogicException(
                'TESTLER GÜVENLİK NEDENİYLE DURDURULDU. '
                ."APP_ENV: {$this->app->environment()}, "
                ."connection: {$connection}, "
                ."host: {$host}, "
                ."database: {$database}. "
                .'Testler sadece mysql_test / kuleliakademi_test '
                .'veya SQLite :memory: üzerinde çalışabilir.'
            );
        }
    }
}
