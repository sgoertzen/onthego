/**
 * Video Rendition tests
 * 
 * @group unit
 */
import { videoHelper} from './videoHelper'
import { equal } from 'assert'
import { Rendition } from '../classes/Rendition'

it('Video has no renditions', () => {
    const files = ['singleFile.avi']
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 4)
    equal(results[0].original, 'singleFile.avi')
})

it('Empty array returns nothing', () => {
    const files:string[] = []
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('Video has all renditions', () => {
    const files: string[] = ['folder/complete.avi']
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R240p.label}_complete.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R360p.label}_complete.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R480p.label}_complete.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R720p.label}_complete.avi`)
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('Video has all renditions but random order', () => {
    const files: string[] = []
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R360p.label}_random.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R720p.label}_random.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R240p.label}_random.avi`)
    files.push('folder/random.avi')
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R480p.label}_random.avi`)
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('Only Folder', () => {
    const files: string[] = ['folder/']
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('File named rendition', () => {
    const files: string[] = ['/folder/rendition.avi']
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 4)
})

it('Only Renditions', () => {
    const files: string[] = ['']
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R240p.label}_onlyrends.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R360p.label}_onlyrends.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R480p.label}_onlyrends.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R720p.label}_onlyrends.avi`)
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('Missing one renditions', () => {
    let files: string[] = ['folder/missingone.avi']
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R240p.label}_missingone.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R360p.label}_missingone.avi`)
    files.push(`folder/${videoHelper.RENDITION_PREFIX}${Rendition.R720p.label}_missingone.avi`)
    // files = files.splice(1,1)
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 1)
    equal(results[0].rendition, Rendition.R480p)
})

it ('Ignores images', () => {
    let files = ['folder/imagefile.png']
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})
