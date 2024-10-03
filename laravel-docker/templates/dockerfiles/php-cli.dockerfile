FROM --platform=linux/arm64 php:8.3-cli-alpine

# Use /var/www/html as the working directory within the container
RUN mkdir -p /var/www/html
WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Install packages for Alpine
RUN apk --update add \
    wget \
    curl \
    gd \
    build-base \
    libmcrypt-dev \
    libxml2-dev \
    pcre-dev \
    zlib-dev \
    autoconf \
    oniguruma-dev \
    openssl \
    openssl-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    jpeg-dev \
    libpng-dev \
    imagemagick-dev \
    imagemagick \
    postgresql-dev \
    libzip-dev \
    gettext-dev \
    libxslt-dev \
    libgcrypt-dev \
    mysql-client \
    linux-headers && \
    rm /var/cache/apk/*

# Install PHP extensions
RUN pecl channel-update pecl.php.net && \
    pecl install mcrypt redis && \
    rm -rf /tmp/pear

RUN docker-php-ext-install -j$(nproc) gd

RUN docker-php-ext-install \
    mysqli \
    mbstring \
    pdo \
    pdo_mysql \
    xml \
    pcntl \
    bcmath \
    pdo_pgsql \
    zip \
    intl \
    gettext \
    soap \
    sockets \
    xsl
RUN docker-php-ext-enable mcrypt redis

USER www-data

COPY php.ini /usr/local/etc/php/conf.d/99-custom.ini
