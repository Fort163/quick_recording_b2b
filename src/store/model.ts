import {GeocoderResult} from "@/structure/map/ymapsModel";
import {AuthProvider} from "@/auth/AuthProvider";

export interface State{
    mapInfo : MapInfo,
    mask : MaskModel
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

    firstName : string
    lastName : string
    picture : FileUpload | null
    email: string | null
    gender: string
    phoneNumber: string | null
    birthDay: string | null

    constructor(info : UserInfo) {
        const strings = info.fullName.split(' ');
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
    monday = "Понедельник",
    tuesday = "Вторник",
    wednesday = "Среда",
    thursday = "Четверг",
    friday = "Пятница",
    saturday = "Суббота",
    sunday = "Воскресенье"
}