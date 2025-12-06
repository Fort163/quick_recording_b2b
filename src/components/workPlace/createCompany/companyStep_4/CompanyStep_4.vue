<template>
  <div :class="'company-step'" :key="'CompanyStep_2'">

    <div :class="'v-layout'">
      <label :class="'label-simple'" >{{this.$t('label.createCompany.companyStep_4.name')}}</label>
      <label :class="'label-simple'" style="font-size: x-large">{{ company.name }}</label>
      <label :class="'label-simple'">{{ this.$t('label.createCompany.companyStep_4.address')}}</label>
      <label :class="'label-simple'">{{ company.geoPosition.name }}</label>
      <label :class="'label-simple'">{{ this.$t('label.createCompany.companyStep_4.activity')}}</label>
      <ul>
        <template v-for="item in company.activity">
          <li :class="'label-simple'" :key="item.uuid">{{ item.name }}</li>
        </template>
      </ul>
      <label :class="'label-simple'">{{ this.$t('label.createCompany.companyStep_4.schedule')}}</label>
      <ul>
        <template v-for="item in company.schedules">
          <li :class="'label-simple'" v-if="item.work" :key="item.uuid">
            {{createScheduleString(item)}}
          </li>
        </template>
      </ul>
    </div>

    <div v-if="!this.$store.getters.createCompanyCreated" :class="'h-layout'" style="flex-direction: row-reverse">
      <Button :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'"
              style="margin-left: auto;margin-top: 10px"
              :text="this.$t('label.createCompany.companyStep_4.customButton.create')" @click="submit()"/>
      <Button :height="50" :width="200" :radius="15" :color="'inherit'" style="margin-right: auto;margin-top: 10px"
              :text="this.$t('label.createCompany.customButton.back')" @click="back()"/>
    </div>
  </div>
</template>

<script lang="ts" src="./companyStep_4.ts"></script>

<style src="./companyStep_4.css"></style>