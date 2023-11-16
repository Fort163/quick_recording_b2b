import Vuex, {Store} from "vuex";
import {
    Authorization,
    LoadMask,
    MapInfo,
    MaskModel,
    ModalWindow,
    State
} from "@/store/model";

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

class AppState implements State{
    mapInfo : MapInfo;
    mask : MaskModel;
    authorization : Authorization | null;
    constructor() {
        this.authorization = null;
        this.mask = new class implements MaskModel {
            loadMask: LoadMask | null = null;
            modalWindow: ModalWindow | null = null;
        };
        this.mapInfo = defaultMapInfo();
    }


}

export function createStore() : Store<State>{
    const storeApp = new Vuex.Store({
        state: new AppState(),
        mutations: {
            setLoadMask (state : State,value : LoadMask) {
                state.mask.loadMask = value;
                console.log("Load mask : " + (value.show?'On':'Off'))
            },
            setCoordsUser(state : State, value : GeolocationCoordinates){
                state.mapInfo.coords = value
                console.log("Set user position")
            }
        },
        getters: {

        }
    });
    return storeApp;
}