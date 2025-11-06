import Vue from 'vue'
import Vuex from "vuex";
import Component from "vue-class-component";
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import {Provide, Watch} from "vue-property-decorator";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import VueCookies from "vue-cookies";
import {ApiB2B} from "@/api/api";
import ModalMask from "@/components/modal/modal/mask/ModalMask.vue";
import ScrollMenu from "@/components/scrollMenu/ScrollMenu.vue";
import BottomBar from "@/components/bottomBar/BottomBar.vue";
import NotificationMenu from "@/components/notificationMenu/NotificationMenu.vue";
import {convertCookieLocale} from "@/store/util/LocaleUtil";
import {ApiWS} from "@/api/apiWS";
import {NotificationMessage} from "@/models/notification-service";
import {LocaleItem} from "@/models/main";
import {userApi} from "@/api/apiUtil";
import {UserInfo} from "@/models/user-service";
import {AuthProvider} from "@/auth/AuthProvider";

Vue.use(Vuex);
Vue.use(VueCookies);
@Component({
    components: {
        ModalMask,
        TopPanel,
        WorkPlace,
        ScrollMenu,
        BottomBar,
        NotificationMenu
    }
})
export default class App extends Vue {

    @Provide('api') api: ApiB2B = new ApiB2B(this.$store, this.$i18n);
    @Provide('socket') mainSocket: ApiWS = new ApiWS();

    @Watch('connect')
    socketConnect(val: boolean, oldVal: boolean) {
        this.socket?.subscribe('/user/queue/notification', message => {
            const notification : NotificationMessage= <NotificationMessage>JSON.parse(message.body)
            this.$store.commit("setNotification",notification);
        });
        this.socket?.subscribe('/topic/notification', message => {
            const notification : NotificationMessage= <NotificationMessage>JSON.parse(message.body)
            this.$store.commit("setNotification",notification);
        });
    }

    created(){
        this.api.init();
        this.mainSocket.connect();
        const locale : LocaleItem = this.$store.getters.locale;
        if(locale){
            this.$i18n.locale = locale.locale
        }
        else {
            const localeItem = convertCookieLocale(this.$cookies.get("i18next"));
            console.warn("i18next")
            console.warn(localeItem)
            if (localeItem){
                this.$store.commit("setLocale", localeItem)
                this.$i18n.locale = localeItem.locale
            }
        }
        navigator.geolocation.getCurrentPosition((pos : GeolocationPosition) => {
            this.$store.commit('setCoordsUser',pos.coords);
        }, err => {
            console.error("Position user not set");
        })
        this.api.getApi<UserInfo>(userApi("/user/"+AuthProvider.init().userInfo?.uuid)).then(value => {
            this.$store.commit("setUserInfo", value);
        })
    }

    get socket() {
        return this.mainSocket?.socket
    }

    get connect() {
        return this.mainSocket?.isConnect;
    }

}