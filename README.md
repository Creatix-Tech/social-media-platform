## Description

Social Media Platform test MVP application backend system.

## Project Main Structure
This is the project main structure:
* src
    * modules
        - auth
        - user
        - post
    * common
        - constants
        - decorators
        - exceptions
        - guards
        - services
* test


**modules** directory contains components encapsulating a closely related set of capabilities:
* *auth* - provides APIs and functionality for user registration and authentication,
* *user* - provides APIs and functionality for user creation, update and retrieval,
* *post* - provides APIs and functionality for post creation, update, retrieval and removal.


**common** directory contains common functionalities and defined constants used in the project:
* *constants* - contains enumeration types used in the project,
* *decorators* - contains decorators used in controllers,
* *exceptions* - contains different exception types used in the project,
* *guards* - contains access control guards, used to ensure that the caller has sufficient permission to execute a specific route,
* *services* - contains services (such as config service) used in the project from different components,

In **test** directory should be located unit tests for project components.

## Installation

```bash
$ npm install
```

## Local Development

A local *.env* file should be created with environment variables. Here is a template:

``` text

APP_PORT=5000
APP_GLOBAL_PREFIX=api

DB_URI=mongodb+srv://<user>:<password>@cluster0.4w3ln.mongodb.net/socialMediaPlatform?retryWrites=true&w=majority

JWT_SECRET=SomeSuperSecret
JWT_EXPIRES_IN=21600 #In seconds, 6 hours

SWAGGER_NAME=API
SWAGGER_DESCRIPTION="Social Media Platform API Documentation"
SWAGGER_VERSION=0.0.1
SWAGGER_PATH=/api/doc
```

Run the following command to start the service (in watch mode):

```bash
npm run-script start:dev
```

## Swagger Documentation

**Swagger** documentation is available in *http://localhost:5000/api/doc/* URL.