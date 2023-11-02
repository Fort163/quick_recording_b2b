<template>
  <div :class="[isAuthorized?'main-size':'main-login']">
    <ModalMask/>
    <div v-if="!isAuthorized">
      <Login/>
    </div>
    <div v-if="isAuthorized" class="main-work">
      <TopPanel/>
      <WorkPlace/>
      <BottomMenu/>
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style src="./app.css"></style>
