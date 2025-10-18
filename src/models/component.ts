export interface Combo{
    key : string
    value : string
}

export class ComboItem implements Combo{
    key: string;
    value: string;

    constructor(key?: string, value?: string) {
        if(key){
            this.key = key;
        }
        else {
            this.key = '';
        }
        if(value){
            this.value = value;
        }
        else {
            this.value = '';
        }

    }
}

export interface FileUpload {
    fileBase64 : String,
    fileName : String,
    size : number
}