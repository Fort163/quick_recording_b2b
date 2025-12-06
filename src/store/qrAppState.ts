import {defineStore} from 'pinia'
import {LocaleItem, MapInfo, State} from "@/models/main";
import {ErrorWindow, LoadMask, MaskModel, ModalWindow} from "@/models/modal";
import {UserInfo} from "@/models/user-service";
import {NotificationMessage} from "@/models/notification-service";
import {AuthProvider} from "@/auth/AuthProvider";
import axios, {AxiosResponse} from "axios";
import {qrB2BApi, userApi} from "@/api/apiUtil";

export const useAppStore = defineStore('appStore', {
    state: (): State => (defaultValueStore),
    actions: {
        async uploadStore() {
            return new Promise<State>((resolve, reject) => {
                initStore().then(state => {
                    this.currentPath = state.currentPath
                    this.createCompany = state.createCompany
                    this.joinCompany = state.joinCompany
                    this.userInfo = state.userInfo
                    this.mask = state.mask
                    this.mapInfo = state.mapInfo
                    this.locale = state.locale
                    this.notifications = state.notifications
                    resolve(this);
                })
            })
        },
        async setCurrentPath(path: string) {
            return new Promise<Boolean>((resolve, reject) => {
                this.currentPath = path
                const sendState = Object.assign(defaultValueStore, this);
                sendState.notifications = [];
                axios.post<void>(qrB2BApi("/session"), sendState)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(reason => {
                        resolve(false);
                    })
            });
        }
    }
})

function initStore(): Promise<State> {
    return new Promise<State>((resolve, reject) => {
        getState().then(state => {
            console.debug("State download");
            updateState(state).then(updatedState => {
                    console.debug("State updated");
                    resolve(updatedState);
                }
            ).catch(reason => {
                throw new Error("State not updated");
            })
        }).catch(reason => {
            console.error("Error not create store!")
            console.error(reason)
        })
    })
}

function getState(): Promise<State | null> {
    return new Promise<State>(((resolve, reject) => {
            axios.get<State>(qrB2BApi("/session")).then((response: AxiosResponse<State>) => {
                if (response.data) {
                    resolve(response.data);
                } else {
                    resolve(defaultValueStore);
                }
            }).catch(reason => {
                resolve(defaultValueStore);
            });
        })
    )
}

function updateState(state: State | null): Promise<State> {
    return new Promise<State>(resolve => {
        if(state) {
            axios.get<UserInfo>(userApi("/user/" + AuthProvider.init().userInfo?.uuid)).then((response: AxiosResponse<UserInfo>) => {
                state.userInfo = response.data;
                resolve(state);
            }).catch(reason => {
                throw new Error("Error get userInfo!")
            })
        }
        else {
            resolve(null);
        }
    })
}

const defaultValueStore : State = {
    currentPath : 'home',
    createCompany : null,
    joinCompany : null,
    userInfo : null,
    mask : new class implements MaskModel {
        errorWindow: ErrorWindow | null = null;
        loadMask: LoadMask | null = null;
        modalWindow: ModalWindow | null = null;
    },
    mapInfo : defaultMapInfo(),
    locale : defaultLocale(),
    notifications : new Array<NotificationMessage>()
}

function defaultMapInfo(): MapInfo {
    return {
        settings: {
            lang: 'ru_RU'
        },
        coords: null
    }
}

function defaultLocale(): LocaleItem {
    return new LocaleItem("ru", "ru", "ru_RU", "ru_RU");
}
