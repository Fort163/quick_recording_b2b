<template>
  <div v-if="!this.show" :class="'locale-picker'">
    <img :src="getImgUrl(this.value.imageName)" @click="show = true">
  </div>
  <div v-else :class="'locale-picker'" :style="{bottom : getOffset()}" @mouseleave="show = false">
    <transition-group v-for="item in this.store" :key="item.locale" :class="'locale-item'" name="locale-store" tag="div">
      <img :src="getImgUrl(item.imageName)" :key="item.locale" @click="setLocale(item)">
    </transition-group>
  </div>
</template>

<script src="./localePicker.ts"></script>

<style src="./localePicker.css"></style>