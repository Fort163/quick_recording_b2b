<template>
  <div :class="'mainSelectBoxFilter'">
    <input :class="'selectInput'" :placeholder="placeholder" v-model="search" @blur="clearStore()"/>
    <div :class="'selectData'" >
      <transition-group :class="'storeItems'" name="storeAnimation" tag="div">
        <div :class="'storeItem'" v-for="(item,index) in this.store" @click="select(item)" :key="index">
          <div :class="'storeItemValue'">{{item.name}}</div>
          <div :class="'storeItemButton'"/>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script src="./selectBoxFilter.ts">
</script>

<style src="./selectBoxFilter.css">
</style>