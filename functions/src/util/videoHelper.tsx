import { basename, dirname, join } from 'path'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs-extra'
import { MediaHelper } from '../../../src/util/MediaHelper'

class RenditionSet {
    Original: string
    Rend240p: string
    Rend360p: string
    Rend480p: string
    Rend720p: string

    constructor(orig: string) {
        this.Original = orig
        this.Rend240p = ''
        this.Rend360p = ''
        this.Rend480p = ''
        this.Rend720p = ''
    }

    hasAllRenditions = () => {
        return this.Rend240p.length > 0 &&
            this.Rend360p.length > 0 &&
            this.Rend480p.length > 0 &&
            this.Rend720p.length > 0
    }
}

export class videoHelper {

    static RENDITION_PREFIX = "rendition"
    static RENDITIONS = [
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
            for (const rendition of videoHelper.RENDITIONS) {
                const renditionFileName = `${videoHelper.RENDITION_PREFIX}${rendition.label}_${fileName}`
                const reditionFullPath = join(directory, renditionFileName)
                console.debug(`ffmpeg configured to create ${renditionFileName}`)
                ffm.output(reditionFullPath)
                    .size(rendition.size)
            }
            ffm.on('error', (err: any) => {
                reject(err.message)
            }).on('end', () => {
                const results: string[] = []
                for (const rendition of videoHelper.RENDITIONS) {
                    const renditionFileName = `${videoHelper.RENDITION_PREFIX}${rendition.label}_${fileName}`
                    console.debug(`Storing rendition of ${renditionFileName}`)
                    results.push(renditionFileName)
                }
                resolve(results)
            }).run()
        })
        return promise
    }

    static findFilesNeedingRenditions(filenames: string[]): string[] {
        const filesets = new Map<string, RenditionSet>()
        const renditionFiles: string[] = []

        // Initial pass to pull out originals and group renditions
        for (const filename of filenames) {
            if (!MediaHelper.isVideo(filename)) {
                continue
            }
            if (filename.endsWith('/')) {
                continue
            }
            const b = basename(filename)
            if (b.length === 0) {
                continue
            }
            if (b.includes(this.RENDITION_PREFIX) && b.includes('_')) {
                renditionFiles.push(b)
            } else {
                filesets.set(b, new RenditionSet(b))
            }
        }

        // Fill in filesets with all found renditions
        for (const rendition of renditionFiles) {
            const filename = basename(rendition)
            const orig = filename.substr(filename.indexOf('_') + 1)
            const rendLabel = filename.substr(videoHelper.RENDITION_PREFIX.length, 4)
            const fileset = filesets.get(orig)
            if (!fileset) {
                continue
            }
            switch (rendLabel) {
                case '240p':
                    fileset.Rend240p = filename
                    break
                case '360p':
                    fileset.Rend360p = filename
                    break
                case '480p':
                    fileset.Rend480p = filename
                    break
                case '720p':
                    fileset.Rend720p = filename
                    break
            }
        }

        // Loop over file sets and return any that aren't full
        const needsRenditions: string[] = []
        filesets.forEach((set) => {
            if (!set.hasAllRenditions()) {
                needsRenditions.push(set.Original)
            }
        })
        return needsRenditions
    }
}