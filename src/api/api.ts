import axios from "axios";
import {Store} from "vuex";
import {LoadMask} from "@/store/model";
import {AuthProvider} from "@/auth/AuthProvider";

interface Api {
    getApi<T>(uri:string):Promise<T>,
    postApi<T>(uri:string,data?:any):Promise<T>,
    putApi<T>(uri: string,data?:any): Promise<T>,
    patchApi<T>(uri: string,data?:any): Promise<T>,
}

export class ApiB2B implements Api{
    private _URL : string;
    private store: Store<any>
    constructor(store: Store<any>) {
        this._URL = process.env.VUE_APP_BASE_URL_B2B_SERVICE;
        this.store = store;
    }

    get URL(): string {
        return this._URL;
    }

    set URL(value: string) {
        this._URL = value;
    }

    getApi<T>(uri: string, map?: Map<string, Object>): Promise<T> {
        this.loadMask(true);
        if (map) {
            uri = this.addParameterToUri(uri,map);
        }
        return axios.get(this._URL + uri)
            .then((response: any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }

    postApi<T>(uri:string,data?:any): Promise<T> {
        this.loadMask(true);
        return axios.post(this._URL + uri,data)
            .then((response:any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error: any) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })

    }

    getBlob(uri:string,data?:any): Promise<Blob>{
        this.loadMask(true);
        return axios.post(this._URL + uri,data,{responseType: 'blob'})
            .then((response:any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error: any) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }

    putApi<T>(uri: string,data?:any): Promise<T> {
        this.loadMask(true);
        return axios.put(this._URL + uri,data)
            .then((response: any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }

    patchApi<T>(uri: string,data?:any): Promise<T> {
        this.loadMask(true);
        return axios.patch(this._URL + uri)
            .then((response: any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }

    public init(){
        axios.interceptors.request.use(function (config) {
            const provider = AuthProvider.getProvider()
            const token = provider.getToken()?.token_type + ' ' + provider.getToken()?.access_token;
            config.headers.Authorization =  token;
            return config;
        })
    }


    private loadMask(value: boolean) {
        this.store.commit('setLoadMask', new class implements LoadMask {
            show: boolean = value;
        });
    }

    private addParameterToUri(uri: string, map: Map<string, Object>): string {
        uri = uri.concat('?')
        for (const item of map.keys()) {
            uri = uri.concat(item, '=', map.get(item)?.toString() || '')
            uri = uri.concat('&')
        }
        uri = uri.substring(0, uri.length - 1)
        return uri;
    }

}