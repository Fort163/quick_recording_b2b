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
    deleteApi<T>(uri: string,data?:any): Promise<T>
}

export class ApiB2B implements Api{
    private store: Store<any>
    private translate : VueI18n

    constructor(store: Store<any>, translate : VueI18n ) {
        this.store = store;
        this.translate = translate;
    }

    getApi<T>(uri: string, param?: URLSearchParams, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        let url = uri;
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
        return axios.post(uri,data)
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
        return axios.post(uri,data,{responseType: 'blob'})
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
        return axios.put(uri,data)
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
        return axios.patch(uri,data)
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
        let url = uri;
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