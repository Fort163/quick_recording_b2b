<template>
  <div :class="this.side ? 'sidebar-main-min' : 'sidebar-main-max'" @mousemove="side = false" @mouseleave="side = true">
    <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/company.png">
    <label v-if="!this.side" :class="'side-position'">Создать компанию</label>
    <label v-if="!this.side" :class="'side-position'">Вступить в компанию</label>
    <label v-if="!this.side" :class="'side-position'">Моя компания</label>
    <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/calendar.png">
    <label v-if="!this.side" :class="'side-position'">Мои записи</label>
    <label v-if="!this.side" :class="'side-position'">Записи компании</label>
    <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/employee.png">
    <label v-if="!this.side" :class="'side-position'">Добавить работника</label>
    <label v-if="!this.side" :class="'side-position'">Редактировать работника</label>
    <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/settings.png">
    <label v-if="!this.side" :class="'side-position'">Редактировать компанию</label>
    <label v-if="!this.side" :class="'side-position'">Редактировать услуги</label>
    <label v-if="!this.side" :class="'side-position'">Редактировать график</label>
    <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/statistics.png">
    <label v-if="!this.side" :class="'side-position'">Статистика компании</label>
    <label v-if="!this.side" :class="'side-position'">Статистика по работнику</label>
  </div>
</template>

<script src="./scrollMenu.ts"></script>
<style src="./scrollMenu.css"></style>