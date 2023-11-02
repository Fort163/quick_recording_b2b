<template>
  <div class="topMenu">
    <div class="topItems">
      <ComboBox v-if="this.showAdmin" :style="{width: this.sizeCombo+'%'}" :title="'Администрирование'" :items="this.topMenu.admin" :func="this.handler"></ComboBox>
      <ComboBox v-if="this.showCompany" :style="{width: this.sizeCombo+'%'}" :title="'Моя компания'" :items="this.topMenu.company" :func="this.handler"></ComboBox>
      <ComboBox v-if="this.showService" :style="{width: this.sizeCombo+'%'}" :title="'Мои заказы'" :items="this.topMenu.service" :func="this.handler"></ComboBox>
      <ComboBox v-if="this.showOther" :style="{width: this.sizeCombo+'%'}" :title="'Разное'" :items="this.topMenu.other" :func="this.handler"></ComboBox>
    </div>
    <transition name="labelAnimation" mode="out-in">
      <div class="topSelect" :key="this.item()"><p class="topText">{{this.item()}}</p></div>
    </transition>
  </div>
</template>

<script src="./topMenu.ts">

</script>

<style src="./topMenu.css">

</style>