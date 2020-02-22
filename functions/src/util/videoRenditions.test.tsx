/**
 * Video Rendition tests
 * 
 * @group integration
 */
import { videos } from './videoRenditions'
import { join } from 'path'
import { equal, fail } from 'assert'
import * as fs from 'fs-extra'
import { tmpdir } from 'os'

interface VideoData {
    fullpath: string,
    directory: string
}

it('Exists when file does not exist', async () => {
    const nonExistantFile = '/nope/notthere.avi'
    const renderer = 
        videos
            .createRenditions(nonExistantFile)
            .catch(() => {fail("Error occurred when file does not exist")})
    await renderer
})

it('Calls callback when complete', async () => {
    // Setup
    const testdata = setupVideoData()
    // Test
    let callbackCalled = false
    await videos.createRenditions(testdata.fullpath)
            .catch((msg) => {fail(`Error occurred when creating all reditions: ${msg}`)})
            .then(() =>  { callbackCalled = true }, (reason) => fail(`Failed due to ${reason}`))

    equal(true, callbackCalled, "Callback was never called after rendition creation")

    // Teardown
    fs.removeSync(testdata.directory)
})

// it('Creates all renditions', async () => {
//     const testdata = setupVideoData()

//     const renderer = videos.createRenditions(testdata.fullpath, (f:string) => {
//         console.log(`callback file: ${f}`)
//         // TODO: Change this assert to the specific file name, don't trust that we are being passed the correct file
//         // Might need to wait until all callbacks are called in order to do this.  Good luck future self!  :)
//         // Also need to make sure we don't only assert if the callback is called
//         equal(fs.existsSync(f), true)
//     })
//     .catch(() => {fail("Error occurred when creating all reditions")})
//     await renderer

    
//     const rend240pFile = join(testdata.directory, `rendition240p_${VIDEO_FILE}`)
//     equal(fs.existsSync(rend240pFile), true, `Unable to find ${rend240pFile}`)

//     //fs.removeSync(testdata.directory)
// })

it('Cleans up after callbacks are called', () => {
    //videos.createRenditions()
})

it('Does all processing in background', () => {
    //videos.createRenditions()
})


// it('Calculates distance between Belgium and Italy', () => {
//     const a:LatitudeLongitude = {latitude: 51.2088596, longitude: 3.2243476}
//     const b:LatitudeLongitude = {latitude: 41.9027125, longitude: 12.4961813}
//     const distInMeters = haversine.distance(a, b)
//     equal(Math.round(distInMeters), 1253613)
// })
const VIDEO_FILE = 'SampleVideo_720x480_1mb.mp4'

function setupVideoData():VideoData {
    const testFile = join(process.cwd(), '../testdata/' + VIDEO_FILE)
    console.log(`testFile: ${testFile}`)

    const tempDir = fs.mkdtempSync(join(tmpdir(), 'VideoDataTest-'))
    const tempFile = join(tempDir, VIDEO_FILE)
    console.log(`tempDir: ${tempFile}`)

    fs.copyFileSync(testFile, tempFile)

    const tempVideo = join(tempFile, VIDEO_FILE)
    console.log(`tempVideo: ${tempVideo}`)
    return { fullpath: tempFile, directory: tempDir}

}