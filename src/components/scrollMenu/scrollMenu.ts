import Component from "vue-class-component";
import Vue from "vue";
import {AuthProvider} from "@/auth/AuthProvider";
import {Authority} from "@/models/auth-service";

@Component({
    components: {
    }
})
export default class ScrollMenu extends Vue {

    private side : boolean = true
    private authority : Array<Authority> | undefined = undefined;//AuthProvider.init().userInfo?.authorities


    public hasCompany() : boolean{
        return !!this.$store.getters.myCompany
    }

    public isEnabled(value : Array<string>) : boolean{
        const result = this.authority?.find(item => value.includes(item.authority));
        return !!result
    }

    public submit(pathName : string){
        this.$router.push(pathName)
    }

}