<template>
  <div :class="'company-step'" :key="'CompanyStep_1'">
    <div :class="'v-layout'" style="margin: auto">
      <InputText :label="this.$t('label.createCompany.companyStep_1.field.companyName')"
                 :restrictions="[
                     restriction.checkNotNull(this.$t('label.createCompany.companyStep_1.restriction.companyName.fieldName').toString()),
                     restriction.checkCharacterLength(3)
                   ]"
                 v-model="company.name" style="width: 100%"/>
      <ComboBox :searchOn="true" v-model="company.activity" :restrictions="[
                  restriction.checkNotNull(this.$t('label.createCompany.companyStep_1.restriction.activity.fieldName').toString())
                ]"
                :label="this.$t('label.createCompany.companyStep_1.field.activityPlaceholder')" :request="getActivity()" style="width: 100%; height: 50px" />
      <div :class="'h-layout'" style="flex-direction: row-reverse">
        <Button  :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'" style="margin-left: 20px;margin-top: 10px"
                 :text="this.$t('label.createCompany.button.next')" @click="submit()"/>
      </div>
    </div>
  </div>
</template>

<script src="./companyStep_1.ts"></script>

<style src="./companyStep_1.css"></style>