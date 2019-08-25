import { MediaType } from "../classes/Media";

export class MediaHelper {
    static getExtension(filename: string) {
        const parts = filename.split('.');
        return parts[parts.length - 1];
    }
    static isImage(filename: string) {
        const ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
            case 'png':
                return true;
        }
        return false;
    }

    static isVideo(filename: string) {
        const ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                // etc
                return true;
        }
        return false;
    }

    static getFiletype(filename: string) {
        if (this.isImage(filename)) {
            return MediaType.Image
        } else if (this.isVideo(filename)) {
            return MediaType.Video
        } else {
            return MediaType.Unknown
        }
    }
}