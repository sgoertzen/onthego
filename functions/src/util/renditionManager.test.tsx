/**
 * Video Rendition tests
 * 
 * @group unit
 */
import { renditionManager } from './renditionManager'
import { equal } from 'assert'
import { videoHelper } from './videoHelper'

it('Validates correct name and type', () => {
    let videoValid = renditionManager.validateVideo('postvideos/test.avi', 'video/')
    equal(videoValid, true)
})

it('Invalidates missing content types', () => {
    let videoValid = renditionManager.validateVideo('postvideos/test.avi', '')
    equal(videoValid, false)
})

it('Invalidates missing names', () => {
    let videoValid = renditionManager.validateVideo('', 'video/')
    equal(videoValid, false)
})

it('Invalidates non video file', () => {
    let videoValid = renditionManager.validateVideo('postvideos/test.avi', 'image/')
    equal(videoValid, false)
})

it('Invalidates non post video', () => {
    let videoValid = renditionManager.validateVideo('nodirectory.avi', 'video/')
    equal(videoValid, false)
})

it('Invalidates renditions', () => {
    let videoValid = renditionManager.validateVideo(`${videoHelper.RENDITION_PREFIX}_file.avi`, 'video/')
    equal(videoValid, false)
})
