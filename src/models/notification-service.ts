import {Base, Result, TemplateEnum} from "@/models/main";
import {MessageType, SendType} from "@/models/message";

export interface NotificationMessage extends Base{
    fromUser : string
    toUser : string
    sendType : SendType
    messageType : MessageType
    project : string
    messagePath : string | null
    message : string | null
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

export class SimpleNotificationMessage implements NotificationMessage{
    toUser: string;
    fromUser: string;
    messageType: MessageType;
    sendType: SendType;

    jsonObject: string | null;
    message: string | null;
    messageCode: string | null;
    messagePath: string | null;
    path: string | null;
    project: string;
    received: boolean;
    uuid: string | null = null;

    constructor(toUser: string, fromUser: string, messageType: MessageType, sendType: SendType,
                message: string | null = null, messageCode: string | null = null, jsonObject: string | null = null,
                messagePath: string | null = null, path: string | null = null, project: string = "QR",
                received: boolean = false, uuid: string | null = null) {
        this.toUser = toUser;
        this.fromUser = fromUser;
        this.messageType = messageType;
        this.sendType = sendType;
        this.jsonObject = jsonObject;
        this.message = message;
        this.messageCode = messageCode;
        this.messagePath = messagePath;
        this.path = path;
        this.project = project;
        this.received = received;
        this.uuid = uuid;
    }

}