import Component from "vue-class-component";
import Vue from "vue";
import {AuthProvider} from "@/auth/AuthProvider";
import LocalePicker from "@/components/topMenu/localePicker/LocalePicker.vue";
import {UserInfo} from "@/models/user-service";
import {User} from "@/models/auth-service";

@Component({
    components: {
        LocalePicker
    }
})
export default class TopPanel extends Vue {

    private show : boolean = false;
    $router: any;

    public logout(){
        AuthProvider.init().logout();
    }

    public dispatch(path : string) : void{
        this.$router.push(path);
        this.show = false;
    }

    get user(): User | undefined {
        return this.$store.getters.userInfo?.user;
    }
}