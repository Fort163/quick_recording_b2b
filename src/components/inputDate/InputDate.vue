<template>
  <div :class="['input-date-main', this.errors.length > 0 ? 'errors-input' : '']" :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')">
    <div :class="'position-before-absolute'"><label v-if="label" :class="[ (value && value.length > 0) || focus ? 'input-date-label-top' : 'input-date-label-none' ]">{{label}}</label></div>
    <input type="date" v-model="currentValue" @change="change()"
           @focusin="focus=true" @focusout="focus=false" :class="'input-date'" :placeholder="focus ? '' : label">
  </div>
</template>

<script src="./inputDate.ts"></script>
<style src="./inputDate.css"></style>
