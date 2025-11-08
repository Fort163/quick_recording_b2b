import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import Button from "@/components/button/Button.vue";
import {ApiB2B} from "@/api/api";
import {notificationApi, qrB2BApi, userApi} from "@/api/apiUtil";
import {Company, Schedule} from "@/models/company-service";
import {UserInfo} from "@/models/user-service";
import {AuthProvider} from "@/auth/AuthProvider";
import {Page} from "@/models/main";
import {NotificationMessage} from "@/models/notification-service";

@Component({
    components: {
        Button
    }

})
export default class CompanyStep_4 extends Vue {

    @Inject('api') api: ApiB2B | undefined;
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
    }

}