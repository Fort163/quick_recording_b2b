<template>
  <div :class="this.side ? 'sidebar-main-min' : 'sidebar-main-max'" @mousemove="side = false" @mouseleave="side = true">
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/company.png">
      <label v-if="!this.side" :class="'image-label'">{{this.$t("label.scrollMenu.label.company")}}</label>
    </div>
    <label v-if="!this.side" :class="['side-position', !hasCompany() ? '' :'side-position-disabled']" @click="submit('createCompany')" >
      {{this.$t("label.scrollMenu.label.create")}}</label>
    <label v-if="!this.side" :class="['side-position', !hasCompany() ? '' :'side-position-disabled']" @click="submit('joinCompany')">
      {{this.$t("label.scrollMenu.label.join")}}</label>
    <label v-if="!this.side" :class="['side-position', hasCompany() ? '' :'side-position-disabled']" @click="submit('myCompany')">
      {{this.$t("label.scrollMenu.label.itsOwn")}}</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/calendar.png">
      <label v-if="!this.side" :class="'image-label'">{{this.$t("label.scrollMenu.label.record")}}</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['WORKER']) ? '' :'side-position-disabled']" @click="submit('myRecord')">
      {{this.$t("label.scrollMenu.label.my")}}</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER','MANAGER']) ? '' :'side-position-disabled']" @click="submit('companyRecord')">
      {{this.$t("label.scrollMenu.label.recordCompany")}}</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/employee.png">
      <label v-if="!this.side" :class="'image-label'">{{this.$t("label.scrollMenu.label.workers")}}</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER','MANAGER']) ? '' :'side-position-disabled']" @click="submit('addEmployee')">
      {{this.$t("label.scrollMenu.label.add")}}</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER','MANAGER']) ? '' :'side-position-disabled']" @click="submit('editEmployee')">
      {{this.$t("label.scrollMenu.label.edit")}}</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/settings.png">
      <label v-if="!this.side" :class="'image-label'">{{this.$t("label.scrollMenu.label.settings")}}</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER']) ? '' :'side-position-disabled']" @click="submit('settingsCompany')">
      {{this.$t("label.scrollMenu.label.settingsCompany")}}</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER']) ? '' :'side-position-disabled']" @click="submit('settingsService')">
      {{this.$t("label.scrollMenu.label.services")}}</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER']) ? '' :'side-position-disabled']" @click="submit('settingsSchedule')">
      {{this.$t("label.scrollMenu.label.time")}}</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/statistics.png">
      <label v-if="!this.side" :class="'image-label'">{{this.$t("label.scrollMenu.label.statistics")}}</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER']) ? '' :'side-position-disabled']" @click="submit('statisticCompany')">
      {{this.$t("label.scrollMenu.label.byCompany")}}</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['OWNER','WORKER']) ? '' :'side-position-disabled']" @click="submit('statisticEmployee')">
      {{this.$t("label.scrollMenu.label.byWorker")}}</label>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-facing-decorator";
import {UserInfo} from "@/models/user-service";
import {Company, CompanyHierarchy, Employee} from "@/models/company-service";
import router from "@/router";
import {useAppStore} from "@/store/qrAppState";

@Component({
  components: {}
})
export default class ScrollMenu extends Vue {

  private side: boolean = true
  private store = useAppStore();
  private userInfo: UserInfo = this.store.userInfo
  private company: Company | null = this.userInfo.company
  private employee: Employee | null = this.userInfo.employee


  public hasCompany(): boolean {
    return !!this.company
  }

  public isEnabled(value: Array<string>): boolean {
    const result = this.authority?.find(item => value.includes(item));
    return !!result
  }

  public submit(pathName: string) {
    router.push(pathName)
  }

  get authority(): Array<CompanyHierarchy> | undefined {
    return this.employee?.permissions
  }

}
</script>
<style src="./scrollMenu.css"></style>