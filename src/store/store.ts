import axios, {AxiosResponse} from "axios";
import {AuthProvider} from "@/auth/AuthProvider";
import {convertI18nLocale} from "@/store/util/LocaleUtil";
import {qrB2BApi, userApi} from "@/api/apiUtil";
import {CreateCompany, LocaleItem, MapInfo, State} from "@/models/main";
import {ErrorWindow, LoadMask, MaskModel, ModalWindow} from "@/models/modal";
import {Company} from "@/models/company-service";
import {NotificationMessage} from "@/models/notification-service";
import {UserInfo} from "@/models/user-service";
import {useI18n} from "vue-i18n";
import {Store} from "pinia";

function defaultMapInfo(): MapInfo {
    return {
        settings: {
            apiKey: 'e8f7c134-5dcd-4af9-be0d-f53bce9e8a0a',
            lang: 'ru_RU',
            coordorder: 'latlong',
            version: '2.1'
        },
        coords: null
    }
}

function defaultLocale(): LocaleItem {
    const i18n = useI18n();
    let locale = convertI18nLocale(i18n.locale.value);
    if (!locale) {
        locale = new LocaleItem("ru", "ru", "ru_RU", "ru_RU");
    }
    return locale;
}

class AppState implements State {
    mapInfo: MapInfo;
    mask: MaskModel;
    createCompany: CreateCompany
    userInfo: UserInfo | null
    currentPath: string
    locale: LocaleItem
    notifications: Array<NotificationMessage>

    constructor() {
        this.currentPath = 'homePage'
        this.createCompany = new class implements CreateCompany {
            company : Company | null = null;
            created : boolean = false;
        }
        this.userInfo = null
        this.mask = new class implements MaskModel {
            errorWindow: ErrorWindow | null = null;
            loadMask: LoadMask | null = null;
            modalWindow: ModalWindow | null = null;
        };
        this.mapInfo = defaultMapInfo();
        this.locale = defaultLocale();
        this.notifications = new Array<NotificationMessage>();
    }
}

function getState(): Promise<State> {
    return new Promise<State>(((resolve, reject) => {
            axios.get<State>(qrB2BApi("/session")).then(response => {
                if (response.data) {
                    resolve(response.data);
                } else {
                    resolve(new AppState());
                }
            }).catch(reason => {
                resolve(new AppState());
            });
        })
    )
}

function createStore(state: State): Store<State> {
    const storeApp = new Vuex.Store({
        state: state,
        actions: {
            setCurrentPath(context, value: string) {
                context.commit('setCurrentPath', value);
                const sendState = Object.assign(new AppState(), context.state);
                sendState.notifications = [];
                axios.post<void>(qrB2BApi("/session"), sendState)
                    .then(response => {})
                    .catch(reason => {})
            }
        },
        mutations: {
            setCurrentPath(state: State, value: string) {
                state.currentPath = value;
                console.log("Set path " + value)
            },
            setCreateCompany(state: State, value: Company) {
                state.createCompany.company = value;
                console.log("Set company")
            },
            setCreateCompanyCreated(state: State, value: boolean) {
                state.createCompany.created = value;
                console.log("Set created company")
            },
            setUserInfo(state: State, value: UserInfo) {
                state.userInfo = value;
                console.log("Set userInfo")
            },
            setLoadMask(state: State, value: LoadMask) {
                state.mask.loadMask = value;
                console.log("Load mask : " + (value.show ? 'On' : 'Off'))
            },
            setModalWindow(state: State, value: ModalWindow) {
                state.mask.modalWindow = value;
                console.log("Modal window : " + (value.show ? 'On' : 'Off'))
            },
            setErrorWindow(state: State, value: ErrorWindow | null) {
                state.mask.errorWindow = value;
                console.log("Error window : " + (value?.show ? 'On' : 'Off'))
            },
            setCoordsUser(state: State, value: GeolocationCoordinates) {
                state.mapInfo.coords = value
                console.log("Set user position")
            },
            setLocale(state: State, value: LocaleItem) {
                state.locale = value
                state.mapInfo.settings.lang = value.localeForMap
                console.log("Set locale")
            },
            setNotification(state: State, value: NotificationMessage) {
                state.notifications.push(value)
                console.log("Set notification")
            },
            removeNotification(state: State, value: NotificationMessage) {
                state.notifications.splice(state.notifications.findIndex(item => item.uuid === value.uuid),1);
                console.log("Delete notification")
            }
        },
        getters: {
            currentPath(state) {
                return state.currentPath
            },
            createCompany(state) {
                return state.createCompany.company
            },
            createCompanyCreated(state) {
                return state.createCompany.created
            },
            userInfo(state) {
                return state.userInfo
            },
            coordsUser(state) {
                return state.mapInfo.coords
            },
            settingsMap(state) {
                return state.mapInfo.settings
            },
            locale(state) {
                return state.locale
            },
            notifications(state) {
                return state.notifications
            }
        }
    });
    return storeApp;
}
