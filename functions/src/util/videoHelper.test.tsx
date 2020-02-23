/**
 * Video Rendition tests
 * 
 * @group unit
 */
import { videoHelper } from './videoHelper'
import { equal } from 'assert'

it('Video has no renditions', () => {
    const files = ['singleFile.avi']
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 1)
    equal(results[0], 'singleFile.avi')
})

it('Empty array returns nothing', () => {
    const files:string[] = []
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('Video has all renditions', () => {
    const files: string[] = ['folder/complete.avi']
    videoHelper.RENDITIONS.forEach(value => 
        files.push(`folder/${videoHelper.RENDITION_PREFIX}${value.label}_complete.avi`))
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('Video has all renditions but random order', () => {
    const files: string[] = []
    videoHelper.RENDITIONS.forEach(value => 
        files.push(`folder/${videoHelper.RENDITION_PREFIX}${value.label}_random.avi`))
    files.push('folder/random.avi')
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
    equal(results.length, 1)
})

it('Only Renditions', () => {
    const files: string[] = ['']
    videoHelper.RENDITIONS.forEach(value => 
        files.push(`folder/${videoHelper.RENDITION_PREFIX}${value.label}_onlyrends.avi`))
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})

it('Missing one renditions', () => {
    let files: string[] = ['folder/file.avi']
    videoHelper.RENDITIONS.forEach(value => files.push(`folder/${value}_file.avi`))
    files = files.splice(1,1)
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 1)
})

it ('Ignores images', () => {
    let files = ['folder/imagefile.png']
    let results = videoHelper.findFilesNeedingRenditions(files)
    equal(results.length, 0)
})
