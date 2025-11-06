import axios, {AxiosResponse} from "axios";
import {AuthService, AuthToken} from "@/models/auth-service";
import {Base} from "@/models/main";

export class AuthProvider{

    private baseUrl : string = process.env.VUE_APP_BASE_URL_SSO;
    private token : AuthToken | null = null;
    private _userInfo : Base | null = null;
    private authorization : AuthService | null = null
    private code : string | null = null;
    private static provider : AuthProvider;

    public static init() : AuthProvider {
        if(!this.provider){
            this.provider = new AuthProvider();
        }
        return this.provider;
    }

    private constructor() {

    }

    private createCode(): Promise<string>{
        return new Promise(((resolve, reject) => {
            const requestParams = new URLSearchParams({
                response_type: "code",
                client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
                redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URI,
                scope: "read.scope write.scope"
            });
            const params = new URLSearchParams(document.location.search)
            const code = params.get("code")
            if(code){
                resolve(code)
            }
            else {
                const location = Location.prototype;
                window.location.href = process.env.VUE_APP_BASE_URL_SSO + process.env.VUE_APP_OAUTH_AUTHORIZE + '?' + requestParams;
            }
        }));
    }

    public getToken() : AuthToken | null {
        return this.token;
    }

    get userInfo() : Base | null {
        return this._userInfo;
    }

    set userInfo(value: Base | null) {
        this._userInfo = value;
    }

    public logout() : void{
        if(this.token) {
            const strings = document.cookie.split('=');
            let headerName = ''
            let headerValue = ''
            if(strings.length === 2){
                headerName=strings[0]
                headerValue=strings[1]
            }
            const uninterceptedAxiosInstance = axios.create()
            let config;
            if(headerName.length > 0){
                config = {
                    headers: {
                        Authorization : this.token.token_type + ' ' + this.token.access_token,
                        [headerName] : headerValue
                    }
                }
            }
            else {
                config = {
                    headers: {
                        Authorization : this.token.token_type + ' ' + this.token.access_token
                    }
                }
            }
            uninterceptedAxiosInstance.get(this.baseUrl + process.env.VUE_APP_OAUTH_LOGOUT, config
            ).then(response => {
                console.warn(response)
                if(response){
                    if(this.token) {
                        const payload = new FormData()
                        payload.append('token', this.token.refresh_token)
                        payload.append('token_type_hint', 'refresh_token')
                        uninterceptedAxiosInstance.post(this.baseUrl + process.env.VUE_APP_OAUTH_REVOKE, payload, {
                                headers: {
                                    'Content-type': 'application/url-form-encoded',
                                    'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
                                }
                            }
                        ).then(response => {
                            if (response.status === 200) {
                                if (this.token) {
                                    const payload = new FormData()
                                    payload.append('token', this.token.access_token)
                                    payload.append('token_type_hint', 'access_token')
                                    uninterceptedAxiosInstance.post(this.baseUrl + process.env.VUE_APP_OAUTH_REVOKE, payload, {
                                        headers: {
                                            'Content-type': 'application/url-form-encoded',
                                            'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
                                        }
                                    }).then(response => {
                                            this.clear()
                                            window.location.reload()
                                        }
                                    )
                                }
                            }
                        })
                    }
                }
            });
        }
    }

    private createToken(code : string) : Promise<AxiosResponse<AuthToken>> | undefined{
        const payload = new FormData()
        payload.append('grant_type', 'authorization_code')
        payload.append('code', code)
        payload.append('redirect_uri', process.env.VUE_APP_OAUTH_REDIRECT_URI)
        payload.append('client_id', process.env.VUE_APP_OAUTH_CLIENT_ID)
        const uninterceptedAxiosInstance  = axios.create()
        return uninterceptedAxiosInstance.post<AuthToken>(this.baseUrl + process.env.VUE_APP_OAUTH_TOKEN, payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
                }
            }
        );
    }

    private createInfo(token : AuthToken) : Promise<AxiosResponse<Base>> {
        const payload = new FormData();
        payload.append('token', token.access_token)
        const uninterceptedAxiosInstance  = axios.create()
        return uninterceptedAxiosInstance.post<Base>(this.baseUrl + process.env.VUE_APP_OAUTH_INFO, payload, {
            headers: {
                'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
            }
        })
    }

    public getAuthorization() : Promise<AuthService> {
        return new Promise<AuthService>((resolve, reject) => {
            if(!this.authorization) {
                this.createCode().then(code =>{
                    this.createToken(code)?.then(response => {
                        this.token = response.data
                        this.createInfo(response.data).then(infoData => {
                            this._userInfo = infoData.data
                            this.authorization = new class implements AuthService {
                                token: AuthToken = response.data;
                                user: Base = infoData.data;
                            }
                            resolve(this.authorization);
                        })
                    });
                })
            }
            else {
                resolve(this.authorization);
            }
        });
    }

    public refreshToken() : Promise<boolean> {
        return new Promise<boolean>(((resolve, reject) => {
            setTimeout(()=>{
                const payload = new FormData();
                payload.append('grant_type', "refresh_token")
                payload.append('client_id', process.env.VUE_APP_OAUTH_CLIENT_ID)
                payload.append('refresh_token', <string>this.token?.refresh_token)
                const uninterceptedAxiosInstance  = axios.create()
                uninterceptedAxiosInstance.post<AuthToken>(this.baseUrl + process.env.VUE_APP_OAUTH_TOKEN, payload, {
                        headers: {
                            'Content-type': 'application/url-form-encoded',
                            'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
                        }
                    }
                ).then(tokenData =>{
                    this.token = tokenData.data;
                    resolve(true)
                }).catch(reason => {
                    this.getAuthorization().then(value => {
                        this.token = value.token
                        resolve(true)
                    })
                });
            },Number.parseInt(<string>this.token?.expires_in))
            })
        )
    }

    private clear() : void{
        this.token = null;
        this._userInfo = null;
        this.authorization = null;
        document.cookie = 'main_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}