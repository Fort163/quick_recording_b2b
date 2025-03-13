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
        this._URL = process.env.VUE_APP_BASE_URL_GATEWAY;
        this.store = store;
    }

    get URL(): string {
        return this._URL;
    }

    set URL(value: string) {
        this._URL = value;
    }

    getApi<T>(uri: string, param?: URLSearchParams, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        let url = this._URL + uri;
        if(param){
            url = url.concat('?' + param)
        }
        return axios.get(url)
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

    postApi<T>(uri:string,data?:any, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
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

    putApi<T>(uri: string,data?:any, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
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

    patchApi<T>(uri: string,data?:any, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        return axios.patch(this._URL + uri,data)
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
            const provider = AuthProvider.init()
            const token = provider.getToken()?.token_type + ' ' + provider.getToken()?.access_token;
            config.headers.Authorization =  token;
            config.withCredentials = true
            return config;
        })
    }


    private loadMask(value: boolean) {
        this.store.commit('setLoadMask', new class implements LoadMask {
            show: boolean = value;
        });
    }


}

export interface Pageable<T> {
    content: Array<T>
    number: number
    size: number
    totalElements: number
    first: boolean
    last: boolean
    numberOfElements: number
    totalPages: number
    hasContent: boolean
}