<template>
  <div :class="'trMain'">
    <TdCustom v-for="item in this.columns" :key="item.itemName" :isTitle="isTitle" :column="item" :index="index"/>
    <button v-if="deleteButton&&!isTitle" :class="'trDelete'" :title="'Удалить'" @click="selectFunc()"></button>
  </div>
</template>

<script src="./trCustom.ts">
</script>

<style src="./trCustom.css">
</style>