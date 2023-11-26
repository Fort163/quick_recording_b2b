<template>
  <div :class="['input-test-main', this.errors.length > 0 ? 'errors-input' : '']" :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')">
    <div :class="'position-before-absolute'"><label v-if="label" :class="[ (value && value.length > 0) || focus ? 'input-test-label-top' : 'input-test-label-none' ]">{{label}}</label></div>
    <input type="text" v-model="currentValue" @keyup="change()" @change="change()"
           @focusin="focus=true" @focusout="focus=false" :class="['input-test']" :placeholder="focus ? '' : label">
  </div>

</template>

<script src="./inputText.ts"></script>
<style src="./inputText.css"></style>
