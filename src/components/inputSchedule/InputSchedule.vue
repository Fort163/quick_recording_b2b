<template>
  <div :class="['input-schedule-main', this.errors.length > 0 ? 'errors-input' : '']" :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')">
    <InputText v-model="currentValue.dayOfWeek" style="width: 35%;pointer-events: none;"/>
    <InputTime v-model="currentValue.clockFrom" :restrictions="[restriction.checkNotNull('Время начала')]" @keyup="check()" :label="'Начало'" style="width: 20%;margin-right: 5px"/>
    <InputTime v-model="currentValue.clockTo" :restrictions="[restriction.checkNotNull('Время окончания')]" @keyup="check()" :label="'Конец'" style="width: 20%"/>
    <div :class="'position-before-absolute'"><label :class="['input-checkBox-label-top']">Рабочий день?</label></div>
    <CheckBox v-model="currentValue.work" :size="15" @click="check()" :color="'#1E98FF'"/>
  </div>
</template>

<script src="./inputSchedule.ts"></script>
<style src="./inputSchedule.css"></style>
