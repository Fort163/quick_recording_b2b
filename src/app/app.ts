import Vue from 'vue'
import Vuex from "vuex";
import Component from "vue-class-component";
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import {Provide} from "vue-property-decorator";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import VueCookies from "vue-cookies";
import {ApiB2B} from "@/api/api";
import ModalMask from "@/components/modal/modal/mask/ModalMask.vue";
import ScrollMenu from "@/components/scrollMenu/ScrollMenu.vue";
import BottomBar from "@/components/bottomBar/BottomBar.vue";
import i18n from "@/locales/i18n";
import {convertCookieLocale} from "@/store/util/LocaleUtil";
import {LocaleItem} from "@/store/model";

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

    created(){
        this.api.init();
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

}