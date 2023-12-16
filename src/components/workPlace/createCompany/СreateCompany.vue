<template>
  <div :class="'work-place'" :key="'CreateCompany'">
    <CompanyStep_1 v-if="this.$route.name === 'step_1'"/>
    <CompanyStep_2 v-if="this.$route.name === 'step_2'"/>
    <CompanyStep_3 v-if="this.$route.name === 'step_3'"/>
    <CompanyStep_4 v-if="this.$route.name === 'step_4'"/>
  </div>
</template>

<script src="./createCompany.ts"></script>

<style src="./createCompany.css"></style>