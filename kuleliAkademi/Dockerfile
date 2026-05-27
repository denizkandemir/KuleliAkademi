FROM php:8.2-cli

ENV DEBIAN_FRONTEND=noninteractive \
    COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl unzip zip nodejs npm \
    libzip-dev libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
    libonig-dev libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring bcmath exif pcntl gd zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN mkdir -p storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    bootstrap/cache \
    public/storage \
    && rm -rf public/storage \
    && ln -s /var/www/html/storage/app/public /var/www/html/public/storage \
    && chmod -R 775 storage bootstrap/cache
    
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader --no-scripts

RUN npm ci
RUN npm run build

RUN php artisan package:discover --ansi \
    && php artisan config:clear \
    && php artisan route:clear \
    && php artisan storage:link || true
   
    

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]