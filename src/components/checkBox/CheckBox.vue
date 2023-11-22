<template>
  <div :class="'container-checkbox'" @click="callback()">
    <label v-if="this.text" :for="this.uniqId" :class="'label-checkbox'" :style="this.createStyleLabel">{{text}}</label>
    <input type="checkbox" :checked="value" @click="change()" :style="this.createStyle" :id="this.uniqId"/>
  </div>

</template>

<script src="./checkBox.ts"></script>
<style src="./checkBox.css"></style>
