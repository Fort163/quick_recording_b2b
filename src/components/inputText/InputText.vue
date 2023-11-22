<template>
  <div :class="'input-test-main'">
    <label v-if="label" :class="[ (value && value.length > 0) || focus ? 'input-test-label-top' : 'input-test-label-none' ]">{{label}}</label>
    <input type="text" v-model="currentValue" @keyup="change()" @focusin="focus=true" @focusout="focus=false" :class="'input-test'" :placeholder="focus ? '' : label">
  </div>
</template>

<script src="./inputText.ts"></script>
<style src="./inputText.css"></style>
