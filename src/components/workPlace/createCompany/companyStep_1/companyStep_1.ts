import Component from "vue-class-component";
import Vue from "vue";
import {Combo, Company, Errors, State, UserInfo} from "@/store/model";
import {Inject} from "vue-property-decorator";
import ComboBox from "@/components/comboBox/ComboBox.vue";
import {RequestCombo} from "@/components/comboBox/comboBox";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import InputText from "@/components/inputText/InputText.vue";
import Button from "@/components/button/Button.vue";
import {AuthProvider} from "@/auth/AuthProvider";

@Component({
    components: {
        ComboBox,
        InputText,
        Button
    }

})
export default class CompanyStep_1 extends Vue {

    private company : Company = this.$store.getters.createCompany
    private restriction : RestrictionFactory = new RestrictionFactory();
    private pageError : Array<string> = new Array<string>()

    public getActivity() : RequestCombo {
        return new RequestCombo('/company/activity','GET',null,'name','uuid',true,'name')
    }

    public submit(){
        this.pageError = new Array<string>();
        const error : Errors = this.restriction.checkError()
        if(error.hasError){
            error.errors.forEach(item => {
                this.pageError.push(item)
            })
        }
        if(this.pageError.length === 0){
            this.$store.commit("setCreateCompany",this.company);
            this.$router.push('step_2')
        }
    }

}