<template>
  <div :style="'{width:100%;height:100%}'">
    <div v-if="this.showLoadMask || this.showInfoWindow" :class="'modalMask'">
      <div v-if="this.showInfoWindow" :class="'modalWindow'">
        <div :class="'modalValue'">{{this.message}}</div>
        <button :class="'okButton'" @click="close()"></button>
      </div>
      <div v-if="this.showLoadMask" :class="'animation'">
        <button :class="'cloud'"/>
      </div>
    </div>
  </div>
</template>

<script src="./modalMask.ts">
</script>

<style src="./modalMask.css">
</style>