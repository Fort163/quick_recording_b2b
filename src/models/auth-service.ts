import {Base, Smart} from "@/models/main";
import {FileUpload} from "@/models/component";

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

export interface User extends Smart{
    fullName : string;
    firstName : string;
    lastName: string;
    userpic : string;
    email: string;
    username: string;
    gender: string;
    phoneNumber: string;
    birthDay: string;
    provider: AuthProvider;
}

export interface AuthService {
    token : AuthToken
    user : Base
}

export class UserChange {

    uuid : string
    firstName : string
    lastName : string
    picture : FileUpload | null
    email: string | null
    gender: string
    phoneNumber: string | null
    birthDay: string | null

    constructor(info : User) {
        const strings = info.fullName.split(' ');
        this.uuid = info.uuid != null ? info.uuid : ""
        this.firstName = strings[0]
        this.lastName = strings[1]
        this.picture = null
        this.gender = info.gender
        this.phoneNumber = info.phoneNumber
        this.birthDay = info.birthDay
        this.email = info.email
    }

}

export enum AuthProvider {
    local,
    service,
    google,
    yandex,
    vk
}