<template>
  <div :class="'company-step'" :key="'CompanyStep_3'">
    <h2 style="margin: auto">{{ this.$t('label.createCompany.companyStep_3.title') }}</h2>
    <div :class="'v-layout'">
      <ScheduleComponent v-model="company.schedules" :needRepeat="true" />
    </div>
    <div :class="'h-layout'" style="flex-direction: row-reverse">
      <Button  :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'" style="margin-left: auto;margin-top: 10px"
               :text="this.$t('label.createCompany.button.next')" @click="submit()"/>
      <Button  :height="50" :width="200" :radius="15" :color="'inherit'" style="margin-right: auto;margin-top: 10px"
               :text="this.$t('label.createCompany.button.back')" @click="back()"/>
    </div>
  </div>
</template>

<script src="./companyStep_3.ts"></script>

<style src="./companyStep_3.css"></style>