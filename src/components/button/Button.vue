<template>
  <div :class="['main-button']" @mouseenter="show=true" @mouseleave="show=false">
  <label v-if="image && show" :class="'button-label'">{{text}}</label>
    <button  :class="['button-image',this.errors && this.errors.length > 0 ? 'errors-input' : '']" :errors="errors" :style="this.createStyle"
            @click="callback()">
      <label v-if="!image" style="cursor: pointer; font-size: medium; padding: 5px">{{text}}</label>
    </button>
  </div>

</template>

<script src="./button.ts"></script>
<style src="./button.css"></style>
