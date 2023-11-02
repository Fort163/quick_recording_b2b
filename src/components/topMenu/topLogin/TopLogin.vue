<template>
    <div class="topMenuLogin">
      <div class="loginInfo">
        <img class="photo" alt="No photo" :src="this.userpic">
        <div class="loginRow"><p class="loginText">Добро пожаловать,</p></div>
        <div class="loginRow"><p class="loginText">{{this.welcome}}</p></div>
        <div class="loginRow"><p class="loginText">{{this.employeeName}}</p></div>
        <div class="loginRow"><p class="loginText">{{this.companyName}}</p></div>
      </div>
      <div class="loginButtons">
        <button class="exit-button" @click="logout"></button>
        <button class="settings-button" @click="settings"></button>
      </div>
    </div>
</template>

<script src="./topLogin.ts"></script>

<style src="./topLogin.css"></style>