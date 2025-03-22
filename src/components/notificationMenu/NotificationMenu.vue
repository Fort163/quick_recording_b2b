<template>
  <div v-if="this.notifications.length > 0" :class="this.side ? ['sidebar-main-min', 'sidebar-right-min'] : ['sidebar-main-max', 'sidebar-right-max']"
       @mousemove="side = false" @mouseleave="side = true">
    <template v-if="this.notificationInfo.length > 0">
      <div :class="'image-main'">
        <p v-if="side" :class="['counter']">
          <label :class="['counter-label']">{{this.notificationInfo.length}}</label>
        </p>
        <img :class="['image', !this.side ? 'image-max' : '']" src="../../assets/notification/info.png">
        <label v-if="!this.side" :class="['image-label','image-label-medium']"> - {{this.$t("notification.label.info")}}</label>
      </div>
      <template v-for="(item,index) in this.notificationInfo">
        <label v-if="!side && index < 5" :key="item.uuid" :class="['side-position']" @click="doNotification(item)">
          {{messageNotification(item)}}</label>
      </template>
    </template>
    <template v-if="this.notificationWarning.length > 0">
      <div :class="'image-main'">
        <p v-if="side" :class="['counter']">
          <label :class="['counter-label']">{{this.notificationWarning.length}}</label>
        </p>
        <img :class="['image', !this.side ? 'image-max' : '']" src="../../assets/notification/warning.png">
        <label v-if="!this.side" :class="['image-label','image-label-medium']"> - {{this.$t("notification.label.warning")}}</label>
      </div>
      <template v-for="(item,index) in this.notificationWarning">
        <label v-if="!side && index < 5" :key="item.uuid" :class="['side-position']" @click="doNotification(item)">
          {{messageNotification(item)}}</label>
      </template>
    </template>
    <template v-if="this.notificationRedirect.length > 0">
      <div :class="'image-main'">
        <p v-if="side" :class="['counter']">
          <label :class="['counter-label']">{{this.notificationRedirect.length}}</label>
        </p>
        <img :class="['image', !this.side ? 'image-max' : '']" src="../../assets/notification/redirect.png">
        <label v-if="!this.side" :class="['image-label','image-label-medium']"> - {{this.$t("notification.label.redirect")}}</label>
      </div>
      <template v-for="(item,index) in this.notificationRedirect">
        <label v-if="!side && index < 5" :key="item.uuid" :class="['side-position']" @click="doNotification(item)">
          {{messageNotification(item)}}</label>
      </template>
    </template>
    <template v-if="this.notificationLogout.length > 0">
      <div :class="'image-main'">
        <p v-if="side" :class="['counter']">
          <label :class="['counter-label']">{{this.notificationLogout.length}}</label>
        </p>
        <img :class="['image', !this.side ? 'image-max' : '']" src="../../assets/notification/logout.png">
        <label v-if="!this.side" :class="['image-label','image-label-medium']"> - {{this.$t("notification.label.logout")}}</label>
      </div>
      <template v-for="(item,index) in this.notificationLogout">
        <label v-if="!side && index < 5" :key="item.uuid" :class="['side-position']" @click="doNotification(item)">
          {{messageNotification(item)}}</label>
      </template>
    </template>
    <template v-if="this.notificationAction.length > 0">
      <div :class="'image-main'">
        <p v-if="side" :class="['counter']">
          <label :class="['counter-label']">{{this.notificationAction.length}}</label>
        </p>
        <img :class="['image', !this.side ? 'image-max' : '']" src="../../assets/notification/action.png">
        <label v-if="!this.side" :class="['image-label','image-label-medium']"> - {{this.$t("notification.label.action")}}</label>
      </div>
      <template v-for="(item,index) in this.notificationAction">
        <label v-if="!side && index < 5" :key="item.uuid" :class="['side-position']" @click="doNotification(item)">
          {{messageNotification(item)}}</label>
      </template>
    </template>
  </div>
</template>

<script src="./notificationMenu.ts"></script>
<style src="./notificationMenu.css"></style>