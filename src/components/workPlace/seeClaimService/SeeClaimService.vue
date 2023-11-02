<template>
  <div :class="'main-see-claim-service'">
    <div :class="'main-see-claim-search'">
      <SearchService/>
    </div>
    <div :class="'main-see-claim-table'">
      <TableCustom :tableSettings="this.settings"/>
    </div>
  </div>
</template>

<script src="./seeClaimService.ts"></script>

<style src="./seeClaimService.css"></style>