import {Component, toNative, Vue} from "vue-facing-decorator";
import {VueCons} from "vue-facing-decorator/dist/esm/class";
import CustomButton from "@/components/customButton/CustomButton.vue";
import {ApiB2B} from "@/api/api";
import {qrB2BApi} from "@/api/apiUtil";
import {Company, Schedule} from "@/models/company-service";

@Component({
    components: {
        /*CustomButton*/
    }

})
export class CompanyStep_4 extends Vue {

    /*@Inject('api') api: ApiB2B | undefined;
    private company : Company = this.$store.getters.createCompany
    private pageError : Array<string> = new Array<string>()

    public submit(){
        this.api?.postApi<Company>(qrB2BApi('/company'),this.company).then(response => {
            this.$store.commit("setCreateCompanyCreated", true);
        });
    }

    public createScheduleString(item: Schedule) : string{
        return this.$t('label.createCompany.companyStep_4.scheduleString',{
            dayOfWeek:this.$t('enums.dayOfWeek.'+item.dayOfWeek),
            clockFrom:item.clockFrom,
            clockTo:item.clockTo,
        }).toString();
    }

    public back(){
        this.$router.push('step_3')
    }*/

}

export default toNative(<VueCons>CompanyStep_4);