<template>
  <div :class="'mainIntegration'">
    <div :class="'integrationButton'">
      <button :class="[this.currentStyle==='white' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setStyle('white')">
        Белый
      </button>
      <button :class="[this.currentStyle==='gray' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setStyle('gray')">
        Серый
      </button>
      <button :class="[this.currentStyle==='black' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setStyle('black')">
        Черный
      </button>
    </div>
    <iframe width="100%" height="60%" :src="this.src"/>
    <div>
      <h3>Ваш фрейм:</h3>
      {{this.frame}}
    </div>
  </div>
</template>

<script src="./integration.ts">
</script>

<style src="./integration.css">
</style>