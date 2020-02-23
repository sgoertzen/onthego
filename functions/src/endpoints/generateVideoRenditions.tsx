// ****************************************************************************
//  Generate Video Renditions
//
//  Description: Resizes videos  
//     
//  Trigger: Any file uploaded to postvideos/
//     
// ****************************************************************************
import * as functions from 'firebase-functions'
import { renditionManager } from '../util/renditionManager';

exports = module.exports = functions.storage.object().onFinalize(async (object: functions.storage.ObjectMetadata) => {
    return renditionManager.createRenditions(object)
})
