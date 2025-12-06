<template>
  <div :class="'work-place'" :key="'CreateCompany'">
    <CompanyStep1 v-if="this.$route.name === 'step_1'"/>
    <CompanyStep2 v-if="this.$route.name === 'step_2'"/>
    <!--    <CompanyStep_3 v-if="this.$route.name === 'step_3'"/>
        <CompanyStep_4 v-if="this.$route.name === 'step_4'"/>-->
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-facing-decorator";
import CompanyStep1 from "@/components/workPlace/createCompany/companyStep/CompanyStep1.vue";
import CompanyStep2 from "@/components/workPlace/createCompany/companyStep/CompanyStep2.vue";
import {Geocoder} from "@/structure/map/ymapsModel";
import {Activity, Company, Schedule, Service} from "@/models/company-service";
import {useAppStore} from "@/store/qrAppState";

@Component({
  components: {
    CompanyStep1,
    CompanyStep2
    /*
    CompanyStep_3,
    CompanyStep_4,*/
  }

})
export default class CreateCompany extends Vue {

  public store = useAppStore();


  created() {
    this.setStep()
  }

  updated() {
    if (this.$route.name === 'createCompany') {
      this.setStep()
    }
  }

  private setStep() {
    if (!this.store.createCompany) {
      this.store.createCompany = {
        company : new CompanyNew(),
        created : false
      };
      this.$router.push('step_1')
    } else {
      const company = this.store.createCompany?.company
      if (!company.name && (!company.activities || company.activities?.length === 0)) {
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


</script>

<style src="./createCompany.css"></style>