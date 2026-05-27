FROM node:20 AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ÖNCE TÜM PROJE
COPY . .

# SONRA COMPOSER
RUN composer install --no-dev --prefer-dist --no-interaction

# FRONTEND BUILD COPY
COPY --from=frontend /app/public/build ./public/build

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]