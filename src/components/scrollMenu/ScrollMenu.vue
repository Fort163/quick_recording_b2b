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

<script src="./scrollMenu.ts"></script>
<style src="./scrollMenu.css"></style>