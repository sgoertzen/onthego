export class StringHelper {
    static html(text:string):string {
        return text.replace(/\n/g, "<br />");
    }
}