<template>
  <div :class="'company-step'" :key="'CompanyStep_2'">
    <h2 style="margin: auto">{{ this.$t('label.createCompany.companyStep_2.title') }}</h2>
    <div :style="{width:'100%',height:'75%'}">
      <yandex-map :style="{width:'100%',height:'100%'}" @click="onClick($event)" :settings="settings" :coords="coords" :zoom="17">
          <ymap-marker v-if="companyCoords" :coords="companyCoords" marker-id="123" :icon="markerCompany"/>
      </yandex-map>
    </div>
    <div :class="'v-layout'" style="margin: auto">

      <div :class="'h-layout'" style="flex-direction: row-reverse">
        <Button  :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'" style="margin-left: auto;margin-top: 10px"
                 :text="this.$t('label.createCompany.button.next')" @click="submit()"/>
        <Button  :height="50" :width="200" :radius="15" :color="'inherit'" style="margin-right: auto;margin-top: 10px"
                 :text="this.$t('label.createCompany.button.back')" @click="back()"/>
      </div>
    </div>
  </div>
</template>

<script src="./companyStep_2.ts"></script>

<style src="./companyStep_2.css"></style>