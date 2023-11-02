<template>
  <div :style="{width:'100%', height:'300px'}">
      <div v-if="!coords" @mouseenter="watchPosition">
        <div :class="'infoMessage'"><h3>Разрешите сайту получать информацию о вашем местоположении</h3><img :class="'imageAnim'" src="../../../assets/other/geoPosition.png"></div>
        <div :class="'infoMessage'"><input :class="'companyName'" v-model="city" :placeholder="'Или введите ваш город'"><button :class="'right-button'" @click="getCoords()"/></div>
      </div>
      <div v-if="coords" :class="'infoMessage'">
        <div :style="{width:'80%', height:'60px'}" :class="'selectBox'"><SelectBoxFilter :value="this.selectCompany" :data="this.company" :placeholder="this.sizeCompany>0?'Введите название компании':'В нашей системе нет компаний из вашего города'" /></div>
        <button :class="'right-button'" @click="claim()" :disabled="this.isDisabled"/>
      </div>
  </div>
</template>

<script src="./claimCompany.ts">
</script>

<style src="./claimCompany.css">

</style>