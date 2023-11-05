<template>
  <div :class="[isAuthorized?'main-size':'main-login']">
    <ModalMask/>
    <div v-if="!isAuthorized">
      <Login/>
      <div style="display: flex;width: 100%; height: 100%;overflow-wrap: anywhere;">
        <div style="display: flex;width: 50%; height: 100%;overflow-wrap: anywhere;">
          Token
          {{token}}
        </div>
        <div style="display: flex;width: 50%; height: 100%;overflow-wrap: anywhere;" @click="info()">
          Token info
          {{token_info}}
        </div>
      </div>
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
