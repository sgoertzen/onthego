import { basename, dirname, join } from 'path'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs-extra'

export class videoHelper {

    static RENDITION_PREFIX = "rendition"
    static renditions = [
        { label: "240p", size: "320x?" },
        { label: "360p", size: "480x?" },
        { label: "480p", size: "720x?" },
        { label: "720p", size: "1280x?" }
    ]

    // Created all needed rendtions for a given video file
    // Returns the list of rendition file paths (wrapped in a promise)
    static async createRenditions(file: string): Promise<string[]> {

        const fileName = basename(file)
        const directory = dirname(file)

        if (!fs.existsSync(file)) {
            return []
        }

        const promise = new Promise<string[]>((resolve, reject) => {
            const ffm = ffmpeg(file)
            for (const rendition of videoHelper.renditions) {
                const renditionFileName = `${videoHelper.RENDITION_PREFIX}${rendition.label}_${fileName}`
                const reditionFullPath = join(directory, renditionFileName)
                ffm.output(reditionFullPath)
                    .size(rendition.size)
            }
            ffm.on('error', (err: any) => {
                reject(err.message)
            }).on('end', () => {
                const results: string[] = []
                for (const rendition of videoHelper.renditions) {
                    const renditionFileName = `${videoHelper.RENDITION_PREFIX}${rendition.label}_${fileName}`
                    results.push(renditionFileName)
                }
                resolve(results)
            })
                .run()
        })
        return promise
    }
}