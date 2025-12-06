<template>
  <div v-if="!this.show" :class="'locale-picker'">
    <img :src="getImgUrl(this.value.imageName)" @click="show = true">
  </div>
  <div v-else :class="'locale-picker'" :style="{bottom : getOffset()}" @mouseleave="show = false">
    <transition-group v-for="item in this.localeStore" :key="item.locale" :class="'locale-item'" name="locale-store" tag="div">
      <img :src="getImgUrl(item.imageName)" :key="item.locale" @click="setLocale(item)">
    </transition-group>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-facing-decorator";
import {convertI18nLocale} from "@/i18n/LocaleUtil";
import {LocaleItem} from "@/models/main";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/qrAppState";

@Component({
  components: {}
})
export default class LocalePicker extends Vue {

  private i18n = useI18n();
  private show: boolean = false;
  private store = useAppStore();

  private localeStore: Array<LocaleItem> = new Array<LocaleItem>()
  private value: LocaleItem = this.convertLocale(this.i18n.locale.value);

  created() {
    this.i18n.availableLocales.forEach(item => {
      this.localeStore.push(this.convertLocale(item))
    })
  }

  public setLocale(value: LocaleItem): void {
    this.show = false;
    this.value = value;
    this.i18n.locale = value.locale
    this.$cookie.setCookie("i18next", value.localeCookie, { expire: '90d' })
    this.store.locale =  value;
  }

  private convertLocale(locale: string): LocaleItem {
    let result = convertI18nLocale(locale);
    if (!result) {
      result = new LocaleItem("ru", "ru", "ru_RU", "ru_RU")
    }
    return result;
  }

  getOffset(): string {
    const offset = (this.localeStore.length - 1) * -25;
    return offset + 'px';
  }

  getImgUrl(locale: string) {
    return "/src/assets/locales/"+locale+".png";
  }

}
</script>

<style src="./localePicker.css"></style>