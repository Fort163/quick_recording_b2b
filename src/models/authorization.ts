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

export interface Authorization {
    token : AuthToken
    user : UserInfo
}