<template>
  <div v-if="this.user != null" class="topPanel">
    <div style="width: 75%">
      <img :class="'logo'" src="../../../../public/logo.svg">
    </div>
    <div v-if="this.user.userpic != null" :class="'user-info'" :title="this.user.fullName" @click="show = !show">
      <img :class="'userpic'" :src="this.user.userpic" >
    </div>
    <div v-else :class="'user-info'" @click="show = !show">
      {{ this.user.fullName }}
    </div>
    <transition-group :class="'user-info-bar-window'" name="user-info-bar" tag="div" >
      <div :key="'bar'" :class="'user-info-bar'" v-if="this.show" @mouseleave="show=false">
        <label :class="'user-info-bar-item'" @click="logout()">
          <img :class="'user-info-bar-icon'" src="../../../assets/topPanel/logout.png" >
          <label :class="'user-info-bar-label'">{{$t("label.topPanel.exit")}}</label>
        </label>
        <label :class="'user-info-bar-item'" @click="dispatch('/editUser')">
          <img :class="'user-info-bar-icon'" src="../../../assets/topPanel/edit-profile.png" >
          <label :class="'user-info-bar-label'">{{$t("label.topPanel.changeInfo")}}</label>
        </label>
        <label :class="'user-info-bar-item'" @click="dispatch('/')">
          <img :class="'user-info-bar-icon'" src="../../../assets/topPanel/edit-profile.png" >
          <label :class="'user-info-bar-label'">{{$t("label.topPanel.home")}}</label>
        </label>
        <LocalePicker/>
      </div>
    </transition-group>
  </div>
</template>

<script src="./topPanel.ts"></script>

<style src="./topPanel.css"></style>