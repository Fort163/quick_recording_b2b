<template>
  <div :class="'mainSettings'">
    <div :class="'menuSettings'">
      <button :class="[this.currentFrame==='CHANGE_USER' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('CHANGE_USER')">
        Редактировать пользователя
      </button>
<!--      <button :class="[this.currentFrame==='EMPLOYEES' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('EMPLOYEES')">
        Сотрудники
      </button>
      <button :class="[this.currentFrame==='CREATE_SERVICE_TYPE' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('CREATE_SERVICE_TYPE')">
        Типы услуг
      </button>-->
    </div>
    <div :class="'tableSettings'">
      <WarningWindow v-if="this.currentFrame==='WARNINGS'" :key="'warnings'"></WarningWindow>
      <ChangeUser v-if="this.currentFrame==='CHANGE_USER'" :key="'changeUser'"></ChangeUser>
    </div>
  </div>
</template>

<script src="./settingsWindow.ts"></script>

<style src="./settingsWindow.css"></style>