import axios from "axios";
import {Store} from "vuex";
import {AuthProvider} from "@/auth/AuthProvider";
import {ApiError} from "@/models/error";
import {ErrorWindow, LoadMask} from "@/models/modal";
import VueI18n from "vue-i18n";
import {ApiException} from "@/exception/apiException";

interface Api {
    getApi<T>(uri:string):Promise<T>,
    postApi<T>(uri:string,data?:any):Promise<T>,
    putApi<T>(uri: string,data?:any): Promise<T>,
    patchApi<T>(uri: string,data?:any): Promise<T>,
}

export class ApiB2B implements Api{
    private _URL : string;
    private store: Store<any>
    private translate : VueI18n

    constructor(store: Store<any>, translate : VueI18n ) {
        this._URL = process.env.VUE_APP_BASE_URL_GATEWAY;
        this.store = store;
        this.translate = translate;
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
                const response = error.response;
                const apiError : ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
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
                const response = error.response;
                const apiError : ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
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
                const response = error.response;
                const apiError : ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })
    }

    putApi<T>(uri: string,data?:any, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        return axios.put(this._URL + uri,data)
            .then((response: any) => {
                    console.warn(response)
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError : ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
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
                const response = error.response;
                const apiError : ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })
    }

    deleteApi<T>(uri: string, param?: URLSearchParams, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        let url = this._URL + uri;
        if(param){
            url = url.concat('?' + param)
        }
        return axios.delete(url)
            .then((response: any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError : ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
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

    private handleError(error : ApiError, status: number){
        console.log(error);
        switch (status){
            case 403 : {
                this.errorWindow(error, true);
                throw new ApiException(error, status);
                break;
            }
            default: {
                throw new ApiException(error, status)
            }
        }
    }

    private loadMask(value: boolean) {
        this.store.commit('setLoadMask', new class implements LoadMask {
            show: boolean = value;
        });
    }

    private errorWindow( error : ApiError, show: boolean) {
        this.store.commit('setErrorWindow', new class implements ErrorWindow {
            error: ApiError = error;
            show: boolean = show;
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