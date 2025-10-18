import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import ComboBox from "@/components/comboBox/ComboBox.vue";
import {RequestCombo} from "@/components/comboBox/comboBox";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import InputText from "@/components/inputText/InputText.vue";
import Button from "@/components/button/Button.vue";
import {ApiB2B} from "@/api/api";
import {companyApi} from "@/api/apiUtil";
import {Company} from "@/models/company-service";
import {Errors} from "@/models/error";

@Component({
    components: {
        ComboBox,
        InputText,
        Button
    }

})
export default class CompanyStep_1 extends Vue {

    @Inject('api') api: ApiB2B | undefined;
    private company : Company = this.$store.getters.createCompany
    private restriction : RestrictionFactory = new RestrictionFactory();
    private pageError : Array<string> = new Array<string>()

    public getActivity() : RequestCombo {
        const uri = companyApi('/activity');
        if(!uri){
            throw new Error("ApiB2B not create")
        }
        return new RequestCombo(uri,'GET',null,'name','uuid',true,'name')
    }

    public submit(){
        this.pageError = new Array<string>();
        const error : Errors = this.restriction.checkError(this)
        if(error.hasError){
            error.messages.forEach(item => {
                this.pageError.push(item)
            })
        }
        if(this.pageError.length === 0){
            this.$store.commit("setCreateCompany",this.company);
            this.$router.push('step_2')
        }
    }

}