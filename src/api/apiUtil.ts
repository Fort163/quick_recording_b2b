export function userApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_USER_API, uri, version);
}

export function authApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_AUTH_API, uri, version);
}

export function qrB2BApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_QR_B2B_API, uri, version);
}

export function companyApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_COMPANY_API, uri, version);
}

export function notificationApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_NOTIFICATION_API, uri, version);
}

export function createUri(service: string,uri: string, version?: ApiVersion):string{
    if(!version){
        version = ApiVersion.v1;
    }
    return process.env.VUE_APP_BASE_URL_GATEWAY + service + version.toString() + uri;
}

export enum ApiVersion{
    v1 = "/api/v1",
    v2 = "/api/v2"
}