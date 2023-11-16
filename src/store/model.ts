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

export interface UserInfo{

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