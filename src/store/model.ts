import {GeocoderResult} from "@/structure/map/ymapsModel";
import {AuthProvider} from "@/auth/AuthProvider";

export interface State{
    currentPath : string
    createCompany : Company | null
    myCompany : Company | null
    mapInfo : MapInfo
    mask : MaskModel
    locale : LocaleItem
    notifications: Array<NotificationMessage>
}

export interface Base{
    uuid : string | null
}

export interface Company extends Base {
    name : string | null
    activity : Array<Activity>
    schedules : Array<Schedule>
    geoPosition : GeocoderResult | null
}

export interface Schedule extends Base{
    dayOfWeek : string,
    clockFrom : string,
    clockTo : string,
    work : boolean
}

export class NewSchedule implements Schedule{
    uuid = null
    clockFrom : string = '';
    clockTo : string = '';
    work : boolean = false;
    dayOfWeek: string;
    constructor(dayOfWeek: string) {
        this.dayOfWeek = dayOfWeek;
    }
}

export interface Activity extends Base{
    name: string
    description: string
    isActive: boolean
}

export interface MaskModel {
    modalWindow : ModalWindow | null
    loadMask : LoadMask | null
}

export interface LoadMask{
    show: boolean
}

export interface ModalWindow{
    message: string | null,
    show: boolean
}

export interface AuthToken {
    access_token : string
    token_type : string
    refresh_token : string
    expires_in : string
    scope : string
}

export interface Authority{
    authority : string
}

export interface UserInfo{
    uuid : string
    authorities : Array<Authority>,
    name : string,
    fullName: string,
    userpic : string,
    email: string,
    gender: string,
    phoneNumber: string,
    birthDay: string
}

export class UserInfoChange{

    uuid : string
    firstName : string
    lastName : string
    picture : FileUpload | null
    email: string | null
    gender: string
    phoneNumber: string | null
    birthDay: string | null

    constructor(info : UserInfo) {
        const strings = info.fullName.split(' ');
        this.uuid = info.uuid
        this.firstName = strings[0]
        this.lastName = strings[1]
        this.picture = null
        this.gender = info.gender
        this.phoneNumber = info.phoneNumber
        this.birthDay = info.birthDay
        this.email = info.email
    }

}

export interface FileUpload {
    fileBase64 : String,
    fileName : String,
    size : number
}

export interface Authorization {
    token : AuthToken
    user : UserInfo
}

export interface MapInfo{
    settings : MapSettings,
    coords : GeolocationCoordinates | null
}

export interface MapSettings{
    apiKey: string,
    lang: string,
    coordorder: string,
    version: string
}

export enum DayOfWeek{
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
}

export interface Errors {
    count : number
    errors : Array<string>
    hasError : boolean
}

export class Restriction{
    valid : boolean
    error : string | undefined

    constructor(valid: boolean, error?: string) {
        this.valid = valid;
        this.error = error;
    }
}

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

export class LocaleItem {
    /*
        Ссылка на картинку флага
     */
    public imageName: string
    /*
        Строка локали
     */
    public locale: string
    /*
        Строка локали для cookie
     */
    public localeCookie: string
    /*
        Строка локали для карт яндекс
     */
    public localeForMap: string

    constructor(imageName : string, locale : string, localeCookie : string, localeForMap: string) {
        this.imageName = imageName
        this.locale = locale
        this.localeCookie = localeCookie
        this.localeForMap = localeForMap
    }
}

export enum Result{
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}

export enum TemplateEnum{
    REGISTRATION = "REGISTRATION",
    QR_B2B_CODE = "QR_B2B_CODE",
    QR_B2B_NOTIFICATION = "QR_B2B_NOTIFICATION"
}

export enum MessageType{
    INFO = "INFO",
    LOGOUT = "LOGOUT",
    WARNING = "WARNING",
    ACTION = "ACTION",
    REDIRECT = "REDIRECT"
}

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

export interface MessageResult{
    result : Result
    messageId : string | null
    resultText : string | null
}

export enum SendType {
    TO_USER = "TO_USER",
    ALL = "ALL",
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