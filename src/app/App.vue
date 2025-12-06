<template>
  <div :class="'main'">
    <ModalMask/>
    <TopPanel/>
    <WorkPlace/>
    <ScrollMenu/>
    <BottomBar/>
    <!--
    <NotificationMenu/>
    -->
  </div>
</template>

<script lang="ts">
import {Component, Provide, Vue} from "vue-facing-decorator";
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import BottomBar from "@/components/bottomBar/BottomBar.vue";
import ScrollMenu from "@/components/scrollMenu/ScrollMenu.vue";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import ModalMask from "@/components/modal/modal/mask/ModalMask.vue";
import {ApiB2B} from "@/api/api";

@Component({
  components: {
    ModalMask,
    TopPanel,
    ScrollMenu,
    BottomBar,
    WorkPlace
    /*
    NotificationMenu*/
  }
})
export default class App extends Vue {

  @Provide('api') api: ApiB2B = new ApiB2B();

  /*
  @Provide('socket') mainSocket: ApiWS = new ApiWS();

  @Watch('connect')
  socketConnect(val: boolean, oldVal: boolean) {
      this.socket?.subscribe('/user/queue/notification', message => {
          const notification : NotificationMessage= <NotificationMessage>JSON.parse(message.body)
          this.$store.commit("setNotification",notification);
      });
      this.socket?.subscribe('/topic/notification', message => {
          const notification : NotificationMessage= <NotificationMessage>JSON.parse(message.body)
          this.$store.commit("setNotification",notification);
      });
  }

  created(){
      this.mainSocket.connect();
      const locale : LocaleItem = this.$store.getters.locale;
      if(locale){
          this.$i18n.locale = locale.locale
      }
      else {
          const localeItem = convertCookieLocale(this.$cookies.get("i18next"));
          console.warn("i18next")
          console.warn(localeItem)
          if (localeItem){
              this.$store.commit("setLocale", localeItem)
              this.$i18n.locale = localeItem.locale
          }
      }
      navigator.geolocation.getCurrentPosition((pos : GeolocationPosition) => {
          this.$store.commit('setCoordsUser',pos.coords);
      }, err => {
          console.error("Position user not set");
      })
      const requestParams = new URLSearchParams();
      requestParams.append("received", "false");
      requestParams.append("toUser", this.$store.getters.userInfo.user.username);
      requestParams.append("size", "100");
      this.api.getApi<Page<NotificationMessage>>(notificationApi("/notification/message"), requestParams).then(value => {
          value.content.forEach(item => this.$store.commit("setNotification",item));
      });
  }

  get socket() {
      return this.mainSocket?.socket
  }

  get connect() {
      return this.mainSocket?.isConnect;
  }*/

}


</script>
<style src="./app.css"></style>
