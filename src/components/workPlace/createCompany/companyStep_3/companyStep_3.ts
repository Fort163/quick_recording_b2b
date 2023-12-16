import Component from "vue-class-component";
import Vue from "vue";
import {Company, DayOfWeek, Errors, NewSchedule, Restriction, Schedule} from "@/store/model";
import Button from "@/components/button/Button.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import InputSchedule from "@/components/inputSchedule/InputSchedule.vue";

@Component({
    components: {
        Button,
        InputSchedule
    }

})
export default class CompanyStep_3 extends Vue {

    private company : Company = this.$store.getters.createCompany
    private restriction : RestrictionFactory = new RestrictionFactory();
    private pageError : Array<string> = new Array<string>()

    created(){
        if(this.company.schedules.length === 0){
            Object.keys(DayOfWeek).forEach(item => {
                // @ts-ignore
                const dayOfWeekElement = DayOfWeek[item];
                this.company.schedules.push(new NewSchedule(dayOfWeekElement));
            })
        }
    }

    public submit(){
        this.pageError = new Array<string>();
        const error : Errors = this.restriction.checkError()
        if(error.hasError){
            error.errors.forEach(item => {
                this.pageError.push(item)
            })
        }
        if(!this.company.schedules.find(item => item.work)){
            this.pageError.push("У организации должен быть хотя бы один рабочий день")
        }
        if(this.pageError.length === 0){
            this.$store.commit("setCreateCompany",this.company);
            this.$router.push('step_4')
        }
    }

    public back(){
        this.$router.push('step_2')
    }

}