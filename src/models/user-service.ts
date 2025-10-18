import {FileUpload} from "@/models/component";
import {UserInfo} from "@/models/authorization";

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