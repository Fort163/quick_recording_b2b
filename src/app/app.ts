import Vue from 'vue'
import {createStore} from '@/store/store.ts'
import Vuex from "vuex";
import Component from "vue-class-component";
import Login from '@/components/login/Login.vue'
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import {State, UserInfoModel} from "@/store/model.ts";
import {Provide} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi.ts"
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import ModalMask from "@/components/modal/mask/ModalMask.vue";
import {FastWebWS} from "@/components/api/ws/fastWebWS.ts";
import BottomMenu from "@/components/bottomMenu/BottomMenu.vue";
import VueCookies from "vue-cookies";

Vue.use(Vuex);
Vue.use(VueCookies);
@Component({
    components: {
        ModalMask,
        Login,
        TopPanel,
        WorkPlace,
        BottomMenu
    },
    store:createStore()
})
export default class App extends Vue {
    @Provide('state') mainState: State = this.state;
    @Provide('api') mainApi: FastWebApi = new FastWebApi("accessToken",this.$store);
    @Provide('socket') mainSocket: FastWebWS = new FastWebWS("accessToken",this.$store);

    mounted(){
        console.log(process.env);
        navigator.geolocation.getCurrentPosition((pos : GeolocationPosition) => {
            this.$store.commit('setCoords',pos.coords);
        }, err => {
            console.error("Position user not set");
        })
        const accessToken = this.$cookies.get("access_token");
        if (accessToken) {
            this.$store.commit('login',accessToken);
            this.api.accessToken = accessToken;
            const userPromise = this.api.getApi<UserInfoModel>('/user/me');
            userPromise.then((user:UserInfoModel)=> {
                this.$store.commit('setCurrentUser',user);
            });
            this.socket.accessToken = accessToken;
            this.socket.connect();
            this.$cookies.remove("access_token");
            window.history.replaceState({}, document.title, process.env.VUE_APP_BASE_URL_B2B);
        }
    }

    set api( api : FastWebApi) {
        this.mainApi = api;
    }

    get api() : FastWebApi {
        return this.mainApi
    }

    set socket( api : FastWebWS) {
        this.mainSocket = api;
    }

    get socket() : FastWebWS {
        return this.mainSocket
    }

    get state() : State {
        return this.$store.state
    }

    get isAuthorized() : boolean {
        return this.state.loginModel.accessToken!=null;
    }

}