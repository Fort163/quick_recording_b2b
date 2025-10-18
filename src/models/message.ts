import {Result} from "@/models/main";


export enum MessageType{
    INFO = "INFO",
    LOGOUT = "LOGOUT",
    WARNING = "WARNING",
    ACTION = "ACTION",
    REDIRECT = "REDIRECT"
}

export interface MessageResult{
    result : Result
    messageId : string | null
    resultText : string | null
}

export enum SendType {
    TO_USER = "TO_USER",
    ALL = "ALL",
}