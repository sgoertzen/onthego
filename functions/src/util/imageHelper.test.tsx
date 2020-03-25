/**
 * Image Rendition tests
 * 
 * @group unit
 */
import { imageHelper} from './imageHelper'
import { equal } from 'assert'

it('Missing file path', () => {
    const path = ''
    const contentType = 'image/png'
    let results = imageHelper.validateImage(path, contentType)
    equal(results, false)
})

it('Missing content type', () => {
    const path = ''
    const contentType = 'image/png'
    let results = imageHelper.validateImage(path, contentType)
    equal(results, false)
})

it('valid image', () => {
    const path = 'postimages/someimage.png'
    const contentType = 'image/png'
    let results = imageHelper.validateImage(path, contentType)
    equal(results, true)
})

