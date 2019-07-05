

# On the go
Custom website for tracking and sharing a year long travel.  Main features include:
* Map showing path of travel
* Show photos, videos and descriptions of each travel location
* Allow users to post comments

Development stack
* Hosted on Google firebase
* Uses Cloud firestore for data storage

## Development
Status: [![Build Status](https://travis-ci.com/sgoertzen/onthego.svg?branch=master)](https://travis-ci.com/sgoertzen/onthego) 

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
```
firebase deploy
```

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
