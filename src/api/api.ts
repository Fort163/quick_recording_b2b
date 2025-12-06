import axios, {AxiosResponse} from "axios";
import {ApiError} from "@/models/error";
import {ErrorWindow, LoadMask} from "@/models/modal";
import {useI18n} from "vue-i18n";
import {ApiException} from "@/exception/apiException";
import {useAppStore} from "@/store/qrAppState";

interface Api {
    getApi<T>(uri: string): Promise<T>,

    postApi<T>(uri: string, data): Promise<T>,

    putApi<T>(uri: string, data): Promise<T>,

    patchApi<T>(uri: string, data): Promise<T>,

    deleteApi<T>(uri: string, data): Promise<T>
}

export class ApiB2B implements Api {

    private translate = useI18n();
    private store = useAppStore();

    constructor() {
    }

    getApi<T>(uri: string, param?: URLSearchParams, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        let url = uri;
        if (param) {
            url = url.concat('?' + param)
        }
        return axios.get(url)
            .then((response: AxiosResponse<T>) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError: ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })
    }

    postApi<T>(uri: string, data, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        return axios.post(uri, data)
            .then((response: AxiosResponse<T>) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError: ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })

    }

    getBlob(uri: string, data): Promise<Blob> {
        this.loadMask(true);
        return axios.post(uri, data, {responseType: 'blob'})
            .then((response: AxiosResponse) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError: ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })
    }

    putApi<T>(uri: string, data, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        return axios.put(uri, data)
            .then((response: AxiosResponse<T>) => {
                    console.warn(response)
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError: ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })
    }

    patchApi<T>(uri: string, data, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        return axios.patch(uri, data)
            .then((response: AxiosResponse<T>) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError: ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })
    }

    deleteApi<T>(uri: string, param?: URLSearchParams, maskOff?: boolean): Promise<T> {
        this.loadMask(!maskOff);
        let url = uri;
        if (param) {
            url = url.concat('?' + param)
        }
        return axios.delete(url)
            .then((response: AxiosResponse<T>) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                const response = error.response;
                const apiError: ApiError = <ApiError>response.data;
                this.handleError(apiError, response.status)
            })
    }

    private handleError(error: ApiError, status: number) {
        console.log(error);
        switch (status) {
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
        this.store.mask.loadMask = new class implements LoadMask {
            show: boolean = value;
        };
    }

    private errorWindow(error: ApiError, show: boolean) {
        this.store.mask.errorWindow = new class implements ErrorWindow {
            error: ApiError = error;
            show: boolean = show;
        };
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