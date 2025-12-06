<template>
  <div :class="'work-place'" :key="'JoinCompany'">
    <JoinStep_1 v-if="this.$route.name === 'join_step_1'"/>
    <JoinStep_2 v-if="this.$route.name === 'join_step_2'"/>
  </div>
</template>

<script src="./joinCompany.ts"></script>

<style src="./joinCompany.css"></style>