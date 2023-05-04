# University Research Website

## Overview

The website is developed with the purpose of managing, showing and promoting some of the most notable research from a university

## Technoligies

- Express.js
- JWT
- Mongoose
- Firebase Storage
- Docker & Docker Compose

## Available Scripts

### Development Purpose (with Node.js)

- Download Node.js (https://nodejs.org/en/)
- Go to main folder and run command `npm install`
- After installing the packages, we can run command `npm run dev` to bootstrap the app on your localhost
- The api will be available on port 8000

### Development Purpose (with Docker & Docker Compose)

- Download Docker (https://nodejs.org/en/)
- Download Docker Compose (https://docs.docker.com/desktop/install/windows-install/)
- Go to main folder and run `docker-compose -f .\docker-compose.dev.yml build server`
- After the script is completed we can now start the container `docker-compose -f .\docker-compose.dev.yml up server`
- The api will be available on port 8000
