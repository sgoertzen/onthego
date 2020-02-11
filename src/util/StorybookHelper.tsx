import * as firebase from "firebase/app"
import { firebaseConfig } from '../config/firebase.config'

// We need to initialize Firebase exactly once for storybook.  This does not seem like the 
// best way, but until another way is found this works for now.  If a global storybook initializer can be found
// then this class should be removed as well as the calls to it
export class StorybookHelper {
    static initFirebase(): void {
        if (firebase.apps.length < 0 || firebase.apps[0] === undefined) {
            firebase.initializeApp(firebaseConfig);
        }
    }
}