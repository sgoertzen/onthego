/**
 * Video Rendition tests
 * 
 * @group integration
 */
import { videoHelper } from './videoHelper'
import { join } from 'path'
import { equal, fail } from 'assert'
import * as fs from 'fs-extra'
import { tmpdir } from 'os'

interface VideoData {
    fullpath: string,
    directory: string
}
const VIDEO_TEST_FILE = 'SampleVideo_720x480_1mb.mp4'

it('Exists when file does not exist', async () => {
    const nonExistantFile = '/nope/notthere.avi'
    const renderer = 
        videoHelper
            .createRenditions(nonExistantFile)
            .catch(() => {fail("Error occurred when file does not exist")})
    await renderer
})

it('Calls callback when complete', async () => {
    // Setup
    const testdata = setupVideoData()
    // Test
    let callbackCalled = false
    await videoHelper.createRenditions(testdata.fullpath)
            .catch((msg) => {fail(`Error occurred when creating all reditions: ${msg}`)})
            .then(() =>  { callbackCalled = true }, (reason) => fail(`Failed due to ${reason}`))

    equal(true, callbackCalled, "Callback was never called after rendition creation")

    // Cleanup
    fs.removeSync(testdata.directory)
})

it('Creates all renditions', async () => {
    // Setup
    const testdata = setupVideoData()

    // Test
    await videoHelper.createRenditions(testdata.fullpath)
            .catch((msg) => {fail(`Error occurred when creating all reditions: ${msg}`)})
            .then(() =>  { }, (reason) => fail(`Failed due to ${reason}`))

    const rend240pFile = join(testdata.directory, `rendition240p_${VIDEO_TEST_FILE}`)
    equal(fs.existsSync(rend240pFile), true, `Unable to find ${rend240pFile}`)

    // Cleanup
    fs.removeSync(testdata.directory)
})

function setupVideoData():VideoData {
    const testFile = join(process.cwd(), '../testdata/' + VIDEO_TEST_FILE)
    console.log(`testFile: ${testFile}`)

    const tempDir = fs.mkdtempSync(join(tmpdir(), 'VideoDataTest-'))
    const tempFile = join(tempDir, VIDEO_TEST_FILE)
    console.log(`tempDir: ${tempFile}`)

    fs.copyFileSync(testFile, tempFile)

    const tempVideo = join(tempFile, VIDEO_TEST_FILE)
    console.log(`tempVideo: ${tempVideo}`)
    return { fullpath: tempFile, directory: tempDir}

}