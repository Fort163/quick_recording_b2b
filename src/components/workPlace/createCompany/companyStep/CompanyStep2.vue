<template>
  <div :class="'company-step'" :key="'CompanyStep_2'">
    <h2 style="margin: auto">{{ this.$t('label.createCompany.companyStep_2.title') }}</h2>
    <div :style="{width:'100%',height:'75%'}">
      <yandex-map ref="yandexMap" v-model="this.map" :style="{width:'100%',height:'100%'}" :settings="{
        location: {
          center: this.coords,
          zoom: 15,
        }
      }">
        <yandex-map-listener :settings="{
          onClick: onSelectPosition
        }"/>
        <yandex-map-default-scheme-layer/>
        <yandex-map-default-features-layer/>
        <CompanyMarker :company="this.company"/>
      </yandex-map>
    </div>
    <div :class="'v-layout'" style="margin: auto">

      <div :class="'h-layout'" style="flex-direction: row-reverse">
        <CustomButton :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'"
                      style="margin-left: auto;margin-top: 10px"
                      :text="this.$t('label.createCompany.button.next')" @click="submit()"/>
        <CustomButton :height="50" :width="200" :radius="15" :color="'inherit'"
                      style="margin-right: auto;margin-top: 10px"
                      :text="this.$t('label.createCompany.button.back')" @click="back()"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {shallowRef, ref} from 'vue';
import type {YMap} from '@yandex/ymaps3-types';
import {Component, Vue} from "vue-facing-decorator";
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapListener,
  YandexMapMarker
} from "vue-yandex-maps";
import {useAppStore} from "@/store/qrAppState";
import {DomEvent, DomEventHandlerObject} from "@yandex/ymaps3-types/imperative/YMapListener";
import GeocoderApi, {Kind} from "@/api/geocoderApi";
import CompanyMarker from "@/components/companyMarker/CompanyMarker.vue";

@Component({
  components: {
    YandexMapListener,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMap,
    YandexMapMarker,
    CompanyMarker
  }
})
export default class CompanyStep2 extends Vue {


  private store = useAppStore();
  private geocoderApi = new GeocoderApi();
  private company: Company = this.store.createCompany.company
  private map = shallowRef<null | YMap>(null);
  private pageError: Array<string> = new Array<string>();
  private companyCoords =  ref<Array<number> | null>(null);


  get coords(): Array<number> {
    if (this.company.geoPosition) {
      return [this.company.geoPosition.longitude, this.company.geoPosition.latitude]
    }
    if (this.store.mapInfo.coords) {
      const position: GeolocationCoordinates = this.store.mapInfo.coords
      return [position.longitude, position.latitude]
    }
    return [37.611106671875, 55.749346930602925];
  }

  public onSelectPosition(object: DomEventHandlerObject, event: DomEvent) {
    this.geocoderApi.geocode(event.coordinates, [Kind.house,]).then(value => {
      if(value){
        this.company.geoPosition = value;
        this.setCompanyCoords([value.latitude, value.longitude])
      }
    })
  }

  setCompanyCoords(coord : Array<number>): void {
    this.companyCoords = coord
  }

  public submit() {
    this.pageError = new Array<string>()
    if (this.geoPosition) {
      this.$router.push('step_3')
    } else {
      this.pageError.push("Error alarm error!!!")
    }
  }

  public back() {
    this.$router.push('step_1')
  }

}
</script>

<style src="./companyStep2.css"></style>