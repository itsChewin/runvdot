#!/usr/bin/env bash
set -o errexit

composer install --no-dev --optimize-autoloader
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan key:generate
touch database/database.sqlite
php artisan migrate --force