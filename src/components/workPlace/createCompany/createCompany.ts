import Component from "vue-class-component";
import Vue from "vue";
import CompanyStep_1 from "@/components/workPlace/createCompany/companyStep_1/CompanyStep_1.vue";
import CompanyStep_2 from "@/components/workPlace/createCompany/companyStep_2/CompanyStep_2.vue";
import CompanyStep_3 from "@/components/workPlace/createCompany/companyStep_3/CompanyStep_3.vue";
import CompanyStep_4 from "@/components/workPlace/createCompany/companyStep_4/CompanyStep_4.vue";
import {Geocoder} from "@/structure/map/ymapsModel";
import {Activity, Company, Schedule, Service} from "@/models/company-service";

@Component({
    components: {
        CompanyStep_1,
        CompanyStep_2,
        CompanyStep_3,
        CompanyStep_4,
    }

})
export default class CreateCompany extends Vue {

    created() {
        this.setStep()
    }

    updated() {
        if (this.$route.name === 'createCompany') {
            this.setStep()
        }
    }

    private setStep() {
        if (!this.$store.getters.createCompany) {
            this.$store.commit("setCreateCompany", new CompanyNew());
            this.$router.push('step_1')
        } else {
            const company: Company = this.$store.getters.createCompany
            if (!company.name && company.activities?.length === 0) {
                this.$router.push('step_1')
                return
            }
            if (!company.geoPosition) {
                this.$router.push('step_2')
                return
            }
            if (company.schedules?.filter(item => item.work).length === 0) {
                this.$router.push('step_3')
                return
            }
            if (this.$route.name != 'step_4') {
                this.$router.push('step_4')
            }
        }
    }

}

class CompanyNew implements Company {
    activities: Array<Activity>;
    geoPosition: Geocoder | null;
    name: string | null;
    description: string | null;
    schedules: Array<Schedule>;
    services: Array<Service> | null;
    uuid: string | null;
    createdBy: string | undefined;
    createdWhen: string | undefined;
    isActive: boolean = true;
    updatedBy: string | undefined;
    updatedWhen: string | undefined;

    constructor() {
        this.activities = new Array<Activity>()
        this.geoPosition = null
        this.name = null
        this.description = null
        this.schedules = new Array<Schedule>()
        this.uuid = null
        this.services = null
    }
}