import {Base, Result, TemplateEnum} from "@/models/main";
import {MessageType, SendType} from "@/models/message";

export interface NotificationMessage extends Base{
    fromUser : string | null
    toUser : string | null
    sendType : SendType
    messageType : MessageType
    message : string
    messageCode : string | null
    jsonObject : string | null
    path : string | null
    received : boolean
}

export interface MailResult{
    result : Result
    messageId : string | null
    notificationId : string | null
    resultText : string | null
}

export interface MailCode{
    email : string
    template : TemplateEnum | null
    code : string | null
}

export class MailCodeClass implements MailCode{

    code: string | null;
    email: string;
    template: TemplateEnum | null;

    constructor(email: string, template: TemplateEnum | null, code: string | null) {
        this.code = code;
        this.email = email;
        this.template = template;
    }
}