<template>
  <div :class="'work-place-overflow-y'">
    <transition name="work-place">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script src="./workPlace.ts"></script>

<style src="./workPlace.css"></style>