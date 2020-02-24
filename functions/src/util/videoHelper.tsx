import { basename, dirname, join } from 'path'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs-extra'
import { MediaHelper } from '../../../src/util/MediaHelper'
import { Rendition } from '../classes/Rendition'

class NeededRendition {
    original: string
    rendition: Rendition
    constructor(original: string, rendition: Rendition) {
        this.original = original
        this.rendition = rendition
    }
}

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
}

export class videoHelper {

    static RENDITION_PREFIX = "rendition"
    // Created all needed rendtions for a given video file
    // Returns the list of rendition file paths (wrapped in a promise)
    static async createRendition(file: string, rend: Rendition): Promise<string> {
        const fileName = basename(file)
        const directory = dirname(file)

        if (!fs.existsSync(file)) {
            return ''
        }

        return new Promise<string>((resolve, reject) => {
            const renditionFileName = `${videoHelper.RENDITION_PREFIX}${rend.label}_${fileName}`
            const reditionFullPath = join(directory, renditionFileName)
            console.debug(`ffmpeg creating ${renditionFileName}`)

            ffmpeg(file)
                .output(reditionFullPath)
                .size(rend.size)
                .on('error', (err: any) => {
                    reject(err.message)
                }).on('end', () => {
                    console.debug(`rendition created ${renditionFileName}`)
                    resolve(renditionFileName)
                }).run()
        })
    }

    static findMissingRenditions(filenames: string[]): NeededRendition[] {
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

        // Loop over file sets and return any renditions that are needed
        const needsRenditions: NeededRendition[] = []
        filesets.forEach((set) => {
            if (set.Rend240p.length === 0) {
                needsRenditions.push(new NeededRendition(set.Original, Rendition.R240p))
            }
            if (set.Rend360p.length === 0) {
                needsRenditions.push(new NeededRendition(set.Original, Rendition.R360p))
            }
            if (set.Rend480p.length === 0) {
                needsRenditions.push(new NeededRendition(set.Original, Rendition.R480p))
            }
            if (set.Rend720p.length === 0) {
                needsRenditions.push(new NeededRendition(set.Original, Rendition.R720p))
            }
        })
        return needsRenditions
    }
}