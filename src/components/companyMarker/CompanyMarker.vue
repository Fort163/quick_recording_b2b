<template>
  <yandex-map-marker v-if="this.geocoder" :settings="{
          coordinates: [this.geocoder.longitude, this.geocoder.latitude]
        }">
    <CustomButton :image="'activities/tooth.png'" :height="35" :width="35" :radius="50"/>

  </yandex-map-marker>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Company} from "@/models/company-service";
import CustomButton from "@/components/customButton/CustomButton.vue";
import {YandexMapMarker} from "vue-yandex-maps";
import {Geocoder} from "@/structure/map/ymapsModel";

@Component({
  components: {
    YandexMapMarker,
    CustomButton}
})
export default class CompanyMarker extends Vue {

  @Prop({
    required : true
  })
  private company : Company

  get geocoder() : Geocoder | null {
    return this.company.geoPosition
  }


}
</script>

<style src="./comapnyMarker.css"/>