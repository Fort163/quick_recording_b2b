<template>
  <div :class="'bottomMenuMain'">
    <transition-group :class="'notificationItems'" name="notificationAnimation" tag="div">
      <div :class="'notificationItem'" v-for="(item,index) in this.notifications" :key="index" @click="selectTop(index)">
        <div :class="'notificationCount'">{{item.count}}</div>
        <div :class="'notificationValue'">{{item.name}}</div>
      </div>
    </transition-group>
  </div>
</template>

<script src="./bottomMenu.ts">
</script>

<style src="./bottomMenu.css">
</style>