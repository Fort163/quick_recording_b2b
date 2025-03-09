export function authApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_AUTH_API, uri, version);
}

export function qrB2BApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_QR_B2B_API, uri, version);
}

export function companyApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_COMPANY_API, uri, version);
}

export function notifyApi(uri:string, version?: ApiVersion):string{
    return createUri(process.env.VUE_APP_NOTIFY_API, uri, version);
}

export function createUri(service: string,uri: string, version?: ApiVersion):string{
    if(!version){
        version = ApiVersion.v1;
    }
    return service + version.toString() + uri;
}

export enum ApiVersion{
    v1 = "/api/v1",
    v2 = "/api/v2"
}