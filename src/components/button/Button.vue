<template>
  <div :class="'main-button'" @mouseenter="show=true" @mouseleave="show=false">
  <label v-if="image && show" :class="'button-label'">{{text}}</label>
    <button  :class="['button-image']" :style="this.createStyle"
            @click="callback()">
      <label v-if="!image">{{text}}</label>
    </button>
  </div>

</template>

<script src="./button.ts"></script>
<style src="./button.css"></style>
