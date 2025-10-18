import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import Button from "@/components/button/Button.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import {AuthProvider} from "@/auth/AuthProvider";
import {ApiB2B} from "@/api/api";
import {companyApi} from "@/api/apiUtil";
import {Company, Schedule} from "@/models/company-service";

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
        this.api?.postApi<Company>(companyApi('/company'),this.company).then(response => {
            /*this.$store.commit("setCreateCompany",null);
            this.$store.commit("setMyCompany",response);
            this.$router.push('home')*/
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
    }

}