# Portfolio  [![Circle CI](https://img.shields.io/circleci/project/ManojkumarMuralidharan/Portfolio/node-csgo-parser.svg?style=for-the-badge)](https://circleci.com/gh/ManojkumarMuralidharan/Portfolio/)

This repo serves as the codebase for my portfolio website hosted at https://manoj.io.

I started this project as a way to explore and experiment various web frameworks and technologies.

This project was built progressively, to add mulitple features.

## Feature List
1. Github Projects
2. Medium Articles
3. Firebase Integration
4. Circle CI
5. Google Maps
6. Server side rendering
7. Webpack 4
8. Material Design Lite 
9. Node Performance Optimization
10. Hosting on a VPS with SSL
11. Google Cloud Functions 
12. PWA - Progressive Web Apps



## Global
UI Components MDL v1.x

## Projects
Github Integration - Github's GraphQL

## Camping
Maps  - Google Maps v3

Database - Firebase integration

## Blogging
Blogging Articles - Medium json parser

## api Key Management
api keys - dotenv loader

## CI Builds
Circle CI

## How to run the project locally
To test it on your local, make sure to add all you env to a .env file at the root of the project
```
gitApiKey=<gitApiKey>
apiKey=<Firebase_apiKey>
authDomain=<Firebase_authDomain>
databaseURL=<Firebase_databaseURL>
projectId=<Firebase_projectId>
storageBucket=<Firebase_storageBucket>
messagingSenderId=<Firebase_messagingSenderId>
gitClientId=<gitClientId>
gitClientSecret=<gitClientSecret>
googleMapsApiKey=<googleMapsApiKey>
appPort=<appPort>
```

Clone the project
```
git clone 
cd Portfolio
```

Install depedancies
```
npm i
```

Build the front end bundle
```
npm run build
```

Start the application
```
npm run start
```
