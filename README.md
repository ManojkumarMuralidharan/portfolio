# Portfolio
This repo serves as the codebase for my portfolio website hosted at https://manoj.io.

I started this project as a way to explore and experiment various frameworks and technologies.

It uses the following for each section of the page
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
