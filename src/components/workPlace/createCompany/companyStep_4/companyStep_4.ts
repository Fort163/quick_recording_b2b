import Component from "vue-class-component";
import Vue from "vue";
import {Company, Errors, State, UserInfo} from "@/store/model";
import {Inject} from "vue-property-decorator";
import Button from "@/components/button/Button.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import {AuthProvider} from "@/auth/AuthProvider";
import {ApiB2B} from "@/api/api";

@Component({
    components: {
        Button
    }

})
export default class CompanyStep_4 extends Vue {

    @Inject('api') api: ApiB2B | undefined;
    private company : Company = this.$store.getters.createCompany
    private restriction : RestrictionFactory = new RestrictionFactory();
    private pageError : Array<string> = new Array<string>()

    public submit(){
        this.api?.postApi<Company>('/company',this.company).then(response => {
            /*this.$store.commit("setCreateCompany",null);
            this.$store.commit("setMyCompany",response);
            this.$router.push('home')*/
        });

    }

    public back(){
        this.$router.push('step_3')
    }

}