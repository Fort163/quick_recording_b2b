import Vuex, {Store} from "vuex";
import {
    CompanyModel,
    LoadMask,
    LoginInfoModel,
    MapInfo,
    MaskModel,
    ModalWindow, Role, SearchDto, SearchServiceDto,
    State,
    UserInfoModel
} from "@/store/model";
import {ComboboxTopMenu} from "@/components/topMenu/topMenu/topMenuMapHelper";

function emptyLoginInfoModel() : LoginInfoModel{
    return {
        accessToken : null,
        currentUser : null
    }
}

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
    loginModel: LoginInfoModel;
    mapInfo : MapInfo;
    currentMenuItem : ComboboxTopMenu | null;
    mask : MaskModel;
    searchDto : SearchDto = new SearchDto();
    constructor() {
        this.loginModel = emptyLoginInfoModel();
        this.currentMenuItem = null;
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
            login (state : State,value : string) {
                state.loginModel.accessToken = value;
                console.log("Set accessToken")
            },
            setCurrentUser (state : State,value : UserInfoModel) {
                state.loginModel.currentUser = value;
                console.log("Set currentUser")
            },
            setCurrentMenuItem (state : State,value : ComboboxTopMenu | null) {
                if(value === null){
                    value = new class implements ComboboxTopMenu{
                        id: Number = -1;
                        name: String = 'Настройки';
                        permission: String | null = null;
                    }
                }
                state.currentMenuItem = value;
                console.log("Set currentMenuItem : "+value?.name )
            },
            setModalWindow (state : State,value : ModalWindow) {
                state.mask.modalWindow = value;
                console.log("Modal window : " + (value.show?'On':'Off'))
            },
            setLoadMask (state : State,value : LoadMask) {
                state.mask.loadMask = value;
                console.log("Load mask : " + (value.show?'On':'Off'))
            },
            setCoords(state : State,value : GeolocationCoordinates){
                state.mapInfo.coords = value;
                console.log("Set position")
            },
            clearRole (state : State) {
                (<UserInfoModel>state.loginModel.currentUser).roleList = new Array<Role>();
                console.log("Clear Role list " )
            },
            searchService (state : State,value : SearchServiceDto) {
                state.searchDto.searchService = value;
                console.log("Set service search " )
            },
        },
        getters: {
            owner: state => {
                return state.loginModel.currentUser?.employee.isOwner;
            },
            ownerWithoutService: state => {
                const owner : boolean | null | undefined = state.loginModel.currentUser?.employee.isOwner;
                if(owner){
                    let flag = true;
                    (<Array<Role>>state.loginModel.currentUser?.roleList).forEach(item =>{
                        if(item.name === "EMPLOYEE_CONFIG"){
                            flag = false;
                        }
                    })
                    return flag;
                }
                else {
                    return false;
                }
            },
            user: state => {
                return state.loginModel.currentUser;
            },
            employee: state => {
                return state.loginModel.currentUser?.employee;
            },
            company: state => {
                return state.loginModel.currentUser?.employee?.company;
            },
            searchService: state => {
                return state.searchDto.searchService;
            }
        }
    });
    return storeApp;
}