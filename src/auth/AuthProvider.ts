import axios, {AxiosResponse} from "axios";
import {Authorization, AuthToken, ModalWindow, UserInfo} from "@/store/model";

export class AuthProvider{

    private baseUrl : string = process.env.VUE_APP_BASE_URL_SSO;
    private token : AuthToken | null = null;
    private userInfo : UserInfo | null = null;
    private authorization : Authorization | null = null
    private code : string | null = null;
    private static provider : AuthProvider;

    public static getProvider() : AuthProvider {
        if(!this.provider){
            this.provider = new AuthProvider();
        }
        return this.provider;
    }

    private constructor() {
        if(!this.token) {
            const requestParams = new URLSearchParams({
                response_type: "code",
                client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
                redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URI,
                scope: "read.scope write.scope"
            });
            const params = new URLSearchParams(document.location.search)
            const code = params.get("code")
            if (code) {
                this.code = code;
            } else {
                document.location.href = process.env.VUE_APP_BASE_URL_SSO + process.env.VUE_APP_OAUTH_AUTHORIZE + '?' + requestParams;
            }
        }
    }

    public getToken() : AuthToken | null {
        return this.token;
    }

    private createToken() : Promise<AxiosResponse<AuthToken>> | undefined{
        if(this.code) {
            const payload = new FormData()
            payload.append('grant_type', 'authorization_code')
            payload.append('code', this.code)
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
    }

    private createInfo(token : AuthToken) : Promise<AxiosResponse<UserInfo>> {
        const payload = new FormData();
        payload.append('token', token.access_token)
        const uninterceptedAxiosInstance  = axios.create()
        return uninterceptedAxiosInstance.post<UserInfo>(this.baseUrl + process.env.VUE_APP_OAUTH_INFO, payload, {
            headers: {
                'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
            }
        })
    }

    public getAuthorization() : Promise<Authorization> {
        return new Promise<Authorization>((resolve,reject) => {
            if(!this.authorization) {

                this.createToken()?.then(response => {
                    this.token = response.data
                    this.createInfo(response.data).then(infoData => {
                        this.userInfo = infoData.data
                        this.authorization = new class implements Authorization {
                            token: AuthToken = response.data;
                            user: UserInfo = infoData.data;
                        }
                        resolve(this.authorization);
                    })
                });
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
                });
            },Number.parseInt(<string>this.token?.expires_in))
            })
        )
    }

}