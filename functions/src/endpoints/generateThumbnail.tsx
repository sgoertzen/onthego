// ****************************************************************************
//  Generate Thumbnail
//
//  Description: Creates thumbnails for an uploaded image.  Files are written
//    back to the same location but with a thumb_[size]_ name
//    Creates:
//      200x200 - Exact dimensions, cropping as necessary
//      1600x1600 - Maintain aspect ratio.  Will not be larger then this size.
//     
//  Trigger: Any file uploaded to postimages/
//     
// ****************************************************************************
import * as functions from 'firebase-functions'
import { imageHelper } from '../util/imageHelper'


exports = module.exports = functions.storage.object().onFinalize(async (object) => {
    if (!imageHelper.validateImage(object.name, object.contentType)) {
        return false
    }
    const filePath = object.name ? object.name : ""
    const contentType = object.contentType
    return imageHelper.createImageRenditions(filePath, contentType, object.bucket)
})