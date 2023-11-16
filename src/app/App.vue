<template>
  <div :class="'main'">
    <ModalMask/>
    <TopPanel/>
    <ScrollMenu/>
    <transition name="component">
      <router-view></router-view>
    </transition>
    <BottomBar/>
  </div>
</template>

<script src="./app.ts"></script>
<style src="./app.css"></style>
