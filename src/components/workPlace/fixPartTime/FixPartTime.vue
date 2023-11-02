<template>
  <div :class="'mainPartTime'">
    <div class="period-block">
      <div class="search-combo" :style="{width:'200px'}">
        <label class="comboLabel">Дата с</label>
        <input class="searchDate" v-model="from" type="date"/>
      </div>
      <div class="search-combo" :style="{width:'200px'}">
        <label class="comboLabel">Дата по</label>
        <input class="searchDate" v-model="to" type="date"/>
      </div>
      <div class="search-button">
        <button :class="'button-default'" :style="{fontSize : '20px',width : '150px',marginLeft : '15px'}" @click="fix()">
          Исправить
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./fixPartTime.ts">

</script>

<style src="./fixPartTime.css">

</style>