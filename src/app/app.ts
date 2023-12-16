import Vue from 'vue'
import Vuex from "vuex";
import Component from "vue-class-component";
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import {Provide} from "vue-property-decorator";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import VueCookies from "vue-cookies";
import {AuthProvider} from "@/auth/AuthProvider";
import {ApiB2B} from "@/api/api";
import ModalMask from "@/components/modal/modal/mask/ModalMask.vue";
import ScrollMenu from "@/components/scrollMenu/ScrollMenu.vue";
import BottomBar from "@/components/bottomBar/BottomBar.vue";

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
        navigator.geolocation.getCurrentPosition((pos : GeolocationPosition) => {
            this.$store.commit('setCoordsUser',pos.coords);
        }, err => {
            console.error("Position user not set");
        })
    }

}