# Cloud functions 

These functions are used for processing data for the site.  Main features are:
* Creating thumbnails
* Creating smaller renditions of media
* Maintaining counts (comments, etc.)

## Structure
/endpoints - The actual functions
/util - Helper classes
index.tsx - Wraps the /endpoints directory for Firebase 

## Deploy
This will lint, build and deploy the functions. 
```
npm run deploy
```

## Automated Tests
Run unit tests
```
npm run test
```
Run integration tests.  These will interact with the file system and take longer to complete.
```
npm run test-int
```

Can also run these continuously to watch the tests and re-run automatically on changes
```
npm run test-watch
```
or 
```
npm run test-watch-int
```

## Manual Testing
Run the functions using the emulators.  Note, there is no emulator for Firebase Storage.
```
npm run emulate
```

Can run an interactive shell to manually interact with the functions
```
npm run shell
```

### Update Dependencies
To update the projects dependencies run
```
npm run update-dependencies
npm install
```
