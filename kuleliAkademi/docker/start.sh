#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

: "${PORT:=10000}"

if [ -z "${APP_KEY:-}" ]; then
  echo "APP_KEY is missing. Set APP_KEY in Render environment variables."
  exit 1
fi

sed -ri "s/^Listen [0-9]+$/Listen ${PORT}/" /etc/apache2/ports.conf
sed -ri "s/:80>/:${PORT}>/g" /etc/apache2/sites-available/000-default.conf

mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache

php artisan config:cache
php artisan route:cache
php artisan view:cache

exec apache2-foreground
