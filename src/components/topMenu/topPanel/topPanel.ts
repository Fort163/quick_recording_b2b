import Component from "vue-class-component";
import TopMenu from "@/components/topMenu/topMenu/TopMenu.vue";
import TopLogin from "@/components/topMenu/topLogin/TopLogin.vue";
import Vue from "vue";

@Component({
    components: {
        TopMenu,
        TopLogin
    }
})
export default class TopPanel extends Vue {

}