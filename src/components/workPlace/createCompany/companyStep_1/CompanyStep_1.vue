<template>
  <div :class="'company-step'" :key="'CompanyStep_1'">
    <div :class="'v-layout'" style="margin: auto">
      <InputText :label="'Название компании'" :restrictions="[restriction.checkNotNull('Название компании'),restriction.checkCharacterLength(3)]"
                 v-model="company.name" style="width: 100%"/>
      <ComboBox :searchOn="true" v-model="company.activity" :restrictions="[restriction.checkNotNull('Виды деятельности')]"
                :label="'Выберите виды деятельности'" :request="getActivity()" style="width: 100%; height: 50px" />
      <div :class="'h-layout'" style="flex-direction: row-reverse">
        <Button  :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'" style="margin-left: 20px;margin-top: 10px"
                 :text="'Далее'" @click="submit()"/>
      </div>
    </div>
  </div>
</template>

<script src="./companyStep_1.ts"></script>

<style src="./companyStep_1.css"></style>