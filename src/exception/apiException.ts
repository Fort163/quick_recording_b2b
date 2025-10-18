import {ApiError} from "@/models/error";

export class ApiException extends Error{

    error : ApiError;
    status : number;

    constructor(error : ApiError,status : number) {
        super(error.message);
        this.error = error;
        this.status = status;
    }

}