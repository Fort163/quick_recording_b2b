import Component from "vue-class-component";
import Vue from "vue";
import {AuthProvider} from "@/auth/AuthProvider";
import LocalePicker from "@/components/topMenu/localePicker/LocalePicker.vue";

@Component({
    components: {
        LocalePicker
    }
})
export default class TopPanel extends Vue {

    private show : boolean = false;
    private userInfo = AuthProvider.init().userInfo;
    $router: any;

    public logout(){
        AuthProvider.init().logout();
    }

    public dispatch(path : string) : void{
        this.$router.push(path);
        this.show = false;
    }

}