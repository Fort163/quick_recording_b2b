<template>
  <div :class="this.side ? 'sidebar-main-min' : 'sidebar-main-max'" @mousemove="side = false" @mouseleave="side = true">
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/company.png">
      <label v-if="!this.side" :class="'image-label'">Компания:</label>
    </div>
    <label v-if="!this.side" :class="['side-position', !hasCompany() ? '' :'side-position-disabled']" @click="submit('createCompany')" >создать</label>
    <label v-if="!this.side" :class="['side-position', !hasCompany() ? '' :'side-position-disabled']" @click="submit('joinCompany')">вступить</label>
    <label v-if="!this.side" :class="['side-position', hasCompany() ? '' :'side-position-disabled']" @click="submit('myCompany')">своя</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/calendar.png">
      <label v-if="!this.side" :class="'image-label'">Записи:</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_EMPLOYEE']) ? '' :'side-position-disabled']" @click="submit('myRecord')">мои</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_COMPANY_OWNER']) ? '' :'side-position-disabled']" @click="submit('companyRecord')">компании</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/employee.png">
      <label v-if="!this.side" :class="'image-label'">Работники:</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_COMPANY_OWNER']) ? '' :'side-position-disabled']" @click="submit('addEmployee')">добавить</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_EDIT_EMPLOYEE']) ? '' :'side-position-disabled']" @click="submit('editEmployee')">редактировать</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/settings.png">
      <label v-if="!this.side" :class="'image-label'">Настройки:</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_COMPANY_OWNER']) ? '' :'side-position-disabled']" @click="submit('settingsCompany')">компании</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_COMPANY_OWNER']) ? '' :'side-position-disabled']" @click="submit('settingsService')">услуги</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_COMPANY_OWNER']) ? '' :'side-position-disabled']" @click="submit('settingsSchedule')">времени</label>
    <div :class="'image-main'">
      <img :class="['image',!this.side ? 'image-max' : '']" src="../../assets/sideBar/statistics.png">
      <label v-if="!this.side" :class="'image-label'">Статистика:</label>
    </div>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_COMPANY_OWNER']) ? '' :'side-position-disabled']" @click="submit('statisticCompany')">по компании</label>
    <label v-if="!this.side" :class="['side-position', isEnabled(['ROLE_COMPANY_OWNER','ROLE_EMPLOYEE']) ? '' :'side-position-disabled']" @click="submit('statisticEmployee')">по работнику</label>
  </div>
</template>

<script src="./scrollMenu.ts"></script>
<style src="./scrollMenu.css"></style>