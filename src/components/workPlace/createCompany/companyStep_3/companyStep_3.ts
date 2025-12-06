import {Component, toNative, Vue} from "vue-facing-decorator";
import {VueCons} from "vue-facing-decorator/dist/esm/class";
import CustomButton from "@/components/customButton/CustomButton.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import ScheduleComponent from "@/components/scheduleComponent/ScheduleComponent.vue";
import {Company, NewSchedule} from "@/models/company-service";
import {DayOfWeek} from "@/models/main";
import {Errors} from "@/models/error";

@Component({
    components: {
        /*CustomButton,
        ScheduleComponent*/
    }

})
export class CompanyStep_3 extends Vue {

    /*private company : Company = this.$store.getters.createCompany
    private restriction : RestrictionFactory = new RestrictionFactory();
    private pageError : Array<string> = new Array<string>()

    created(){
        if(this.company.schedules?.length === 0){
            for (const item in DayOfWeek) {
                if(!(Number(item) >= 0)){
                    this.company.schedules.push(new NewSchedule(item));
                }
            }
        }
    }

    public submit(){
        this.pageError = new Array<string>();
        const error : Errors = this.restriction.checkError(this)
        if(error.hasError){
            error.messages.forEach(item => {
                this.pageError.push(item)
            })
        }
        if(!this.company.schedules?.find(item => item.work)){
            this.pageError.push(this.$t('label.createCompany.companyStep_3.restriction.haveWorkDay').toString())
        }
        if(this.pageError.length === 0){
            this.$store.commit("setCreateCompany",this.company);
            this.$router.push('step_4')
        }
    }

    public back(){
        this.$router.push('step_2')
    }*/

}

export default toNative(<VueCons>CompanyStep_3);