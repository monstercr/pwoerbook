# Signature App

Backend for Signature App project, based on [Nest](https://github.com/nestjs/nest).

## Installation

Docker

    $ docker run -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 --name mysql -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    $ docker exec -it mysql mysql -u root -p

MySQL

    mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
    mysql> CREATE DATABASE signaturedb;

NPM

```bash
$ npm install
```

## Running the app

### Database:

```bash
$ docker start mysql
```

### Nest app:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database: Migrations

```bash
# run
$ npm run migration:run

# generate
$ npm run migration:generate [name]

# revert
$ npm run migration:revert
```
