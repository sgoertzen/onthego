/**
 * Video Rendition tests
 * 
 * @group unit
 */
import { renditioner } from './renditioner'
import { equal } from 'assert'
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'
import { videoHelper } from './videoHelper'

it('Validates correct name and type', () => {
    let meta = mockValidMetadata()
    let videoValid = renditioner.validateVideo(meta)
    equal(videoValid, true)
})

it('Invalidates missing content types', () => {
    let meta = mockValidMetadata()
    meta.contentType = ""
    let videoValid = renditioner.validateVideo(meta)
    equal(videoValid, false)
})

it('Invalidates missing names', () => {
    let meta = mockValidMetadata()
    meta.name = ""
    let videoValid = renditioner.validateVideo(meta)
    equal(videoValid, false)
})

it('Invalidates non video file', () => {
    let meta = mockValidMetadata()
    meta.contentType = "image"
    let videoValid = renditioner.validateVideo(meta)
    equal(videoValid, false)
})

it('Invalidates non post video', () => {
    let meta = mockValidMetadata()
    meta.name = "movie.avi"
    let videoValid = renditioner.validateVideo(meta)
    equal(videoValid, false)
})

it('Invalidates renditions', () => {
    let meta = mockValidMetadata()
    meta.name = `${videoHelper.RENDITION_PREFIX}_file.avi`
    let videoValid = renditioner.validateVideo(meta)
    equal(videoValid, false)
})

function mockValidMetadata():ObjectMetadata {
    let meta:ObjectMetadata = {
        kind: "",
        bucket: "",
        id: "",
        storageClass: "",
        size: "",
        timeCreated: "",
        updated: "",
        contentType: "video/",
        name: "/postvideos/test.avi"
    }
    return meta
}