<template>
  <div :class="this.side ? 'sidebar-main-min' : 'sidebar-main-max'" @mousemove="side = false" @mouseleave="side = true">
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/company.png">
      <label v-if="!this.side" :class="'image-label'">Компания:</label>
    </div>
    <label v-if="!this.side" :class="'side-position'">создать</label>
    <label v-if="!this.side" :class="'side-position'">вступить</label>
    <label v-if="!this.side" :class="'side-position'">своя</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/calendar.png">
      <label v-if="!this.side" :class="'image-label'">Записи:</label>
    </div>
    <label v-if="!this.side" :class="'side-position'">мои</label>
    <label v-if="!this.side" :class="'side-position'">компании</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/employee.png">
      <label v-if="!this.side" :class="'image-label'">Работники:</label>
    </div>
    <label v-if="!this.side" :class="'side-position'">добавить</label>
    <label v-if="!this.side" :class="'side-position'">редактировать</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/settings.png">
      <label v-if="!this.side" :class="'image-label'">Настройки:</label>
    </div>
    <label v-if="!this.side" :class="'side-position'">компании</label>
    <label v-if="!this.side" :class="'side-position'">услуги</label>
    <label v-if="!this.side" :class="'side-position'">графика</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/statistics.png">
      <label v-if="!this.side" :class="'image-label'">Статистика:</label>
    </div>
    <label v-if="!this.side" :class="'side-position'">по компании</label>
    <label v-if="!this.side" :class="'side-position'">по работнику</label>
  </div>
</template>

<script src="./scrollMenu.ts"></script>
<style src="./scrollMenu.css"></style>