<template>
  <div :class="'join-step'" :key="'JoinCompany'">
    <div :class="'v-layout'" style="margin: auto">

      <ComboBox :searchOn="true" v-model="this.joinCompany.selectActivity" :restrictions="[
                  restriction.checkNotNull(this.$t('label.createCompany.companyStep.restriction.activity.fieldName').toString()),
                ]"
                :label="this.$t('label.createCompany.companyStep.field.activityPlaceholder')"
                :request="getActivity()"
                style="width: 100%; height: 50px"
      />
    </div>
    <div :style="{width:'100%',height:'85%'}">
      <yandex-map :style="{width:'100%',height:'100%'}" @map-was-initialized="initEventsMap($event)" :settings="settings" :coords="coords" :zoom="17">
        <ymap-marker v-for="item in this.companies" :coords="createCoord(item.geoPosition)" :key="item.uuid" :marker-id="item.uuid" :icon="markerCompany"/>
      </yandex-map>
    </div>
  </div>
</template>

<script src="./joinStep_1.ts"></script>

<style src="./joinStep_1.css"></style>