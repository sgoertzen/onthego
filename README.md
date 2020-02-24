

# On the go
Custom website for tracking and sharing a year long travel.  Main features include:
* Map showing path of travel
* Show photos, videos and descriptions of each travel location
* Allow users to post comments

## Development
Status: [![Build Status](https://travis-ci.com/sgoertzen/onthego.svg?branch=master)](https://travis-ci.com/sgoertzen/onthego) 

### Development stack
* Written in TypeScript
* Hosted on Google firebase
* Uses Cloud firestore for data storage
* Tests and storybook stories live next to the code

### Directory Structure
```
/functions - Cloud functions, used for media resizing, etc.
/public - Public assests deployed to webserver
/src
    /classes - POTOs (plain old TypeScript objects)
    /components - UI Components
    /config - Configuration files
```

### Building
```
npm run build
```

### Formatting
```
npm run format
```
This will auto format all the code.

### Deployment
Deploy everything
```
npm run deploy
```

Can also deploy pieces individually
```
npm run deploy-functions
npm run deploy-hosting
npm run deploy-database
npm run deploy-rules
```
More details at [https://firebase.google.com/docs/web/setup?authuser=0#install-cli_deploy](https://firebase.google.com/docs/web/setup?authuser=0#install-cli_deploy)

### Testing
For manual testing
```
npm run start
```
This will open [http://localhost:3000](http://localhost:3000)

To run the automated tests
```
npm run test
```

### Update Dependencies
To update the projects dependencies run
```
npm run update-dependencies
npm install
```

Note: this will not update dependencies for /functions.  Those should be updated on their own.