// Adapted from: https://gist.github.com/theprojectsomething/2076f856f9c4488366dc88e6e8ab2f20

import { sync } from 'glob'
import { resolve } from 'path'

const ENDPOINT_FOLDER = './endpoints';
const DO_NOT_DEPLOY = /^(admin|a|debug|d)$/;
const IGNORE = /^(ignore|i)$/;
const BREAK_ON_ERROR = true;

const is = {
    triggered: false,
    deployable: false,
    emulating: process.env.hasOwnProperty('FIREBASE_PROJECT'),
    deploying: !process.env.hasOwnProperty('FUNCTION_NAME'),
};

const skipped:string[] = [];
sync(`./**/*.js`, {
  cwd: resolve(__dirname, ENDPOINT_FOLDER),
})
.map(file => ({
  path: file.slice(2),
  components: file.slice(2, -3).split(/[\/.]/g),
}))
.sort((a, b) => b.components.length - a.components.length)
.forEach(file => {

  // ignore by name
  if (file.components.find(c => IGNORE.test(c))) return;

   // firebase naming standard
  const FB_NAME = file.components.join('-');
  //const FB_NAME = file.components[0]

  // function is currently being triggered
  is.triggered = process.env.FUNCTION_NAME === FB_NAME;

  // only deploy files locally or if allowed to deploy
  is.deployable = is.emulating || !file.components.find(c => DO_NOT_DEPLOY.test(c));

  // export module if triggered or deploying
  if (is.triggered || is.deploying && is.deployable) {

    // map the module to a deep path: { [component]: { [component]: module } }
    file.components.reduce((_, c, i, list) => {

      // get the map for each path component
      if (i < list.length - 1) {
        if (!_[c]) _[c] = {};
        return _[c];
      }

      // skip files where a naming conflict exists with a directory
      if (_[c]) return skipped.push(`./${file.path.slice(0, -3)}`);

      // export the module
      _[c] = require(`./${ENDPOINT_FOLDER}/${file.path}`);
    }, exports);
  }
});

// don't allow conflicts to deploy
if (BREAK_ON_ERROR && skipped.length) {
  throw new Error(`naming conflict: "${skipped.join('", "')}"`);
}


// import { readdirSync } from 'fs'
// import { resolve } from 'path'

// // Folder where all your individual Cloud Functions files are located.
// const FUNCTIONS_FOLDER = './endpoints';

// readdirSync(resolve(__dirname, FUNCTIONS_FOLDER)).forEach(file => { // list files in the folder.
//   if(file.endsWith('.js')) {
//     const fileBaseName = file.slice(0, -3); // Remove the '.js' extension
//     if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === fileBaseName) {
//       exports[fileBaseName] = require(`${FUNCTIONS_FOLDER}/${fileBaseName}`);
//     }
//   }
// });