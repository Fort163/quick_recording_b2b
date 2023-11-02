<template>
  <div :class="'mainStatistic'">
    <div :class="'mainStatistic-search'">
      <SearchService/>
    </div>
    <div :class="'mainStatistic-table'">
      <TableCustom :tableSettings="this.settings"/>
    </div>
  </div>
</template>

<script src="./statistic.ts">
</script>

<style src="./statistic.css">
</style>