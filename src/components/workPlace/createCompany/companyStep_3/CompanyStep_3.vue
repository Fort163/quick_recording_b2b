<template>
  <div :class="'company-step'" :key="'CompanyStep_2'">
    <h2 style="margin: auto">Укажите рабочий график компании</h2>
    <div :class="'v-layout'">
      <template v-for="(item,index) in company.schedules">
        <InputSchedule :key="index" v-model="company.schedules[index]" :restrictions="[restriction.checkSchedule()]" style="width: 100%;margin-top: 5px"/>
      </template>
    </div>
    <div :class="'h-layout'" style="flex-direction: row-reverse">
      <Button  :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'" style="margin-left: auto;margin-top: 10px"
               :text="'Далее'" @click="submit()"/>
      <Button  :height="50" :width="200" :radius="15" :color="'inherit'" style="margin-right: auto;margin-top: 10px"
               :text="'Назад'" @click="back()"/>
    </div>
  </div>
</template>

<script src="./companyStep_3.ts"></script>

<style src="./companyStep_3.css"></style>