export class Rendition {
    label: string
    size: string
    constructor(label: string, size: string) {
        this.label = label
        this.size = size
    }

    static R240p = new Rendition('240p', '320x?')
    static R360p = new Rendition('360p', '480x?')
    static R480p = new Rendition('480p', '720x?')
    static R720p = new Rendition('720p', '1280x?')
}