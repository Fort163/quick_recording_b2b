export interface ApiError{
    service : string
    message : string
    debugMessage : string
    errors : Array<string>
    parentError : ApiError
}

export interface Errors {
    count : number;
    errors : Array<Restriction>;
    messages : Array<string>;
    hasError : boolean;
}

export class Restriction{
    valid : boolean
    error : string | undefined

    constructor(valid: boolean, error?: string) {
        this.valid = valid;
        this.error = error;
    }
}
