<template>
  <div :class="'footerCompany'">
    <div :class="'footerLeft'">
      <button v-if="this.step.value!='Step_1'" :class="'left-button'" @click="this.previous"/>
    </div>
    <div :class="'footerRight'">
      <button v-if="this.step.value!=this.max" :disabled="this.isDisabled(this.step.value)" :class="'right-button'" @click="this.next" />
      <button v-if="this.step.value===this.max" :class="'button-default'" @click="this.funcLast">
        {{this.lastButtonText}}
      </button>
    </div>
  </div>
</template>

<script src="./buttonFooter.ts">
</script>

<style src="./buttonFooter.css">
</style>