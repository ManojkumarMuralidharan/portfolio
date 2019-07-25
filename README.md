# Portfolio  [![CircleCI](https://img.shields.io/circleci/build/github/ManojkumarMuralidharan/Portfolio/master.svg?style=for-the-badge)]

![Lighthouse Audit status](https://github.com/ManojkumarMuralidharan/Portfolio/blob/master/lighthouse/results/Status.png)

This repo serves as the codebase for my portfolio website hosted at https://manoj.io

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
12. PWA - Progressive Web Apps with service workers for offline experience
13. Gmail API to send email



## UI Library 
1. @material-ui/core   - ^4.0.1
2. @material-ui/icons  - ^1.0.0
3. @material-ui/styles - ^4.1.1

## Projects 
Github Integration - Github's GraphQL

## Camping
Maps  - Google Maps v3

Database - Firebase integration

## Blogging
Blogging Articles - Medium json parser

## api Key Management
api keys - dotenv loader

## Mail service
Gmail API

## CI Builds
Circle CI

## How to run the project locally

1] To test it on your local, make sure to add all you env to a .env file at the root of the project
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

2] Clone the project
```
git clone 
cd Portfolio
```

3] Install depedancies
```
npm i
```

4] Build the front end bundle
```
npm run build
```

5] Start the application
```
npm run start
```

6] Start pm2 process
```
pm2 start npm -- start
```
