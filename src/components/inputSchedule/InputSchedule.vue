<template>
  <div :class="['input-schedule-main', this.errors.length > 0 ? 'errors-input' : '']" :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')">
    <InputText v-model="stringValue" style="width: 35%;pointer-events: none;"/>
    <InputTime v-model="currentValue.clockFrom" :restrictions="[
        restriction.checkNotNull(this.$t('label.inputSchedule.restriction.start.fieldName').toString())]"
               @keyup="check()" :label="this.$t('label.inputSchedule.field.start').toString()" style="width: 20%;margin-right: 5px"/>
    <InputTime v-model="currentValue.clockTo" :restrictions="[
        restriction.checkNotNull(this.$t('label.inputSchedule.restriction.end.fieldName').toString())]"
               @keyup="check()" :label="this.$t('label.inputSchedule.field.end')" style="width: 20%"/>
    <div :class="'position-before-absolute'"><label :class="['input-checkBox-label-top']">{{this.$t('label.inputSchedule.button.isWorkDay')}}</label></div>
    <CheckBox v-model="currentValue.work" :size="15" @click="check()" :color="'#1E98FF'"/>
  </div>
</template>

<script src="./inputSchedule.ts"></script>
<style src="./inputSchedule.css"></style>
