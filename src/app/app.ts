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
import axios from "axios";

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

    private token : string | null = null
    private access_token : string | null = null
    private token_info : string | null = null

    mounted(){
        console.log(process.env);
        navigator.geolocation.getCurrentPosition((pos : GeolocationPosition) => {
            this.$store.commit('setCoords',pos.coords);
        }, err => {
            console.error("Position user not set");
        })
        const params = new URLSearchParams(document.location.search)
        const code = params.get("code")
        if(code){
            const payload = new FormData()

            payload.append('grant_type', 'authorization_code')
            payload.append('code', code)
            payload.append('redirect_uri', process.env.VUE_APP_OAUTH_REDIRECT_URI)
            payload.append('client_id', process.env.VUE_APP_OAUTH_CLIENT_ID)
            return axios.post(process.env.VUE_APP_BASE_URL_SSO + '/oauth2/token', payload, {
                    headers: {
                        'Content-type': 'application/url-form-encoded',
                        'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
                    }
                }
            ).then(response => {
                console.warn(response.data)
                this.access_token = response.data.access_token
                this.token = JSON.stringify(response.data)

            })
        }
        else {
            const error = params.get("error")
            if(!error) {
                document.location.href = this.createUrl(process.env.VUE_APP_OAUTH_QR);
            }
        }


        /*const accessToken = this.$cookies.get("access_token");
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
        }*/
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

    public info(){
        if(this.access_token){
            const payload = new FormData();
            payload.append('token', this.access_token)
            return axios.post(process.env.VUE_APP_BASE_URL_SSO + '/oauth2/token-info', payload, {
                headers: {
                    'Authorization': process.env.VUE_APP_OAUTH_AUTH_HEADER
                }
            }).then(result => {
                this.token_info = result.data;
            })
                .catch((err) => {

                });
        }
    }

    private createUrl(oauthUrl: string): string {
        const requestParams = new URLSearchParams({
            response_type: "code",
            client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
            redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URI,
            scope: "read.scope write.scope"
        });
        return process.env.VUE_APP_BASE_URL_SSO + oauthUrl +'?'+ requestParams;
    }

}