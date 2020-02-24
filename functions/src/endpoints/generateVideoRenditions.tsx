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
import { Rendition } from '../classes/Rendition';

exports = module.exports = functions.storage.object().onFinalize(async (object: functions.storage.ObjectMetadata) => {
    const filepath = object.name ? object.name : ""
    return renditionManager.createRenditions(
        filepath,
        [Rendition.R240p, Rendition.R360p, Rendition.R480p, Rendition.R720p],
        object.bucket,
        object.contentType)
})
