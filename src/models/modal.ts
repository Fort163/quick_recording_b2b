import {ApiError} from "@/models/error";

export interface MaskModel {
    modalWindow : ModalWindow | null
    errorWindow : ErrorWindow | null
    loadMask : LoadMask | null
}

export interface LoadMask{
    show: boolean
}

export interface ErrorWindow{
    error: ApiError
    show: boolean

}

export interface ModalWindow{
    message: string | null,
    show: boolean
}
