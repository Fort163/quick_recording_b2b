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
import {convertCookieLocale} from "@/store/util/LocaleUtil";
import {LocaleItem, NotificationMessage} from "@/store/model";
import {ApiWS} from "@/api/apiWS";
import {notificationApi} from "@/api/apiUtil";

Vue.use(Vuex);
Vue.use(VueCookies);
@Component({
    components: {
        ModalMask,
        TopPanel,
        WorkPlace,
        ScrollMenu,
        BottomBar
    }
})
export default class App extends Vue {

    @Provide('api') api: ApiB2B = new ApiB2B(this.$store);
    @Provide('socket') mainSocket: ApiWS = new ApiWS();

    @Watch('connect')
    socketConnect(val: boolean, oldVal: boolean) {
        this.socket?.subscribe('/user/qr-message/notification', message => {
            console.warn("User");
            const notification : NotificationMessage= <NotificationMessage>JSON.parse(message.body)
            console.error(notification);
        });
        this.socket?.subscribe('/qr-message/notification', message => {
            console.warn("All");
            const notification : NotificationMessage= <NotificationMessage>JSON.parse(message.body)
            console.error(notification);
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
    }

    get socket() {
        return this.mainSocket?.socket
    }

    get connect() {
        return this.mainSocket?.isConnect;
    }

}