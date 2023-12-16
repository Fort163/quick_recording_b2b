<template>
  <div :class="['input-time-main', this.errors.length > 0 ? 'errors-input' : '']" :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')">
    <div :class="'position-before-absolute'"><label v-if="label" :class="['input-time-label-top']">{{label}}</label></div>
    <input type="time" v-model="currentValue" @keyup="change()" @change="change()"
           @focusin="focus=true" @focusout="focus=false" :class="['input-time']" :placeholder="focus ? '' : label">
  </div>

</template>

<script src="./inputTime.ts"></script>
<style src="./inputTime.css"></style>
