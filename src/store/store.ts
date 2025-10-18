import Vuex, {Store} from "vuex";
import axios from "axios";
import {AuthProvider} from "@/auth/AuthProvider";
import {convertI18nLocale} from "@/store/util/LocaleUtil";
import i18n from "@/locales/i18n";
import {qrB2BApi} from "@/api/apiUtil";
import {LocaleItem, MapInfo, State} from "@/models/main";
import {ErrorWindow, LoadMask, MaskModel, ModalWindow} from "@/models/modal";
import {Company} from "@/models/company-service";
import {NotificationMessage} from "@/models/notification-service";

function defaultMapInfo() : MapInfo{
    return {
        settings : {
            apiKey: 'e8f7c134-5dcd-4af9-be0d-f53bce9e8a0a',
            lang: 'ru_RU',
            coordorder: 'latlong',
            version: '2.1'
        },
        coords : null
    }
}

function defaultLocale() : LocaleItem{
    let locale = convertI18nLocale(i18n.locale);
    if(!locale){
        locale = new LocaleItem("ru","ru", "ru_RU", "ru_RU");
    }
    return locale;
}

class AppState implements State{
    mapInfo : MapInfo;
    mask : MaskModel;
    createCompany : Company | null
    myCompany : Company | null
    currentPath : string
    locale : LocaleItem
    notifications: Array<NotificationMessage>
    constructor() {
        this.currentPath = 'home'
        this.createCompany = null
        this.myCompany = null
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

function getState() : Promise<State> {
    return new Promise<State>(((resolve, reject) => {
            const uninterceptedAxiosInstance  = axios.create()
            const provider = AuthProvider.init()
            const token = provider.getToken()?.token_type + ' ' + provider.getToken()?.access_token;
            uninterceptedAxiosInstance.get<State>(
                process.env.VUE_APP_BASE_URL_GATEWAY + qrB2BApi("/session"),{
                    headers: {
                        'Authorization': token
                    }
                }
            ).then(response => {
                if(response.data) {
                    resolve(response.data);
                }
                else {
                    resolve(new AppState());
                }
            }).catch(reason => {
                resolve(new AppState());
            });
        })
    )
}

function createStore(state : State) : Store<State>{
    const storeApp = new Vuex.Store({
        state: state,
        actions: {
            setCurrentPath(context,value : string){
                const uninterceptedAxiosInstance = axios.create()
                const provider = AuthProvider.init()
                const token = provider.getToken()?.token_type + ' ' + provider.getToken()?.access_token;
                context.commit('setCurrentPath',value);
                const sendState = Object.assign(new AppState(),context.state);
                sendState.notifications = [];
                uninterceptedAxiosInstance.post<String>(
                    process.env.VUE_APP_BASE_URL_GATEWAY + qrB2BApi("/session"),
                    sendState, {
                    headers: {
                        'Authorization': token
                    }
                }).then(response => {

                }).catch(reason => {

                })
            }
        },
        mutations: {
            setCurrentPath (state : State,value : string){
                state.currentPath = value;
                console.log("Set path " + value)
            },
            setCreateCompany (state : State,value : Company){
                state.createCompany = value;
                console.log("Set company")
            },
            setMyCompany (state : State,value : Company){
                state.myCompany = value;
            },
            setLoadMask (state : State,value : LoadMask) {
                state.mask.loadMask = value;
                console.log("Load mask : " + (value.show?'On':'Off'))
            },
            setModalWindow (state : State,value : ModalWindow) {
                state.mask.modalWindow = value;
                console.log("Modal window : " + (value.show?'On':'Off'))
            },
            setErrorWindow (state : State,value : ErrorWindow | null) {
                state.mask.errorWindow = value;
                console.log("Error window : " + (value?.show ? 'On':'Off'))
            },
            setCoordsUser(state : State, value : GeolocationCoordinates){
                state.mapInfo.coords = value
                console.log("Set user position")
            },
            setLocale(state : State, value : LocaleItem){
                state.locale = value
                state.mapInfo.settings.lang = value.localeForMap
                console.log("Set locale")
            },
            setNotification(state : State, value : NotificationMessage){
                state.notifications.push(value)
                console.log("Set notification")
            }
        },
        getters: {
            currentPath(state){
                return state.currentPath
            },
            createCompany(state){
                return state.createCompany
            },
            myCompany(state){
                return state.myCompany
            },
            coordsUser(state){
                return state.mapInfo.coords
            },
            settingsMap(state){
                return state.mapInfo.settings
            },
            locale(state){
                return state.locale
            },
            notifications(state){
                return state.notifications
            }
        }
    });
    return storeApp;
}

export function initStore() : Promise<Store<State>>{
    return new Promise<Store<State>>(((resolve, reject) => {
        getState().then(state => {
            resolve(createStore(state))
        }).catch(reason => {
                console.error("Error not create store!")
                console.error(reason)
        })
    }))
}