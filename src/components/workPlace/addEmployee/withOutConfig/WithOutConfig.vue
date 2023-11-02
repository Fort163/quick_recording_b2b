<template>
  <div :class="'withOutConfigMain'">
    <h1 :class="'requestName'" @click="$emit('back-frame')">{{this.requestName}}</h1>
    <div :class="'withOutConfig-textPanel'">
      <h1>Укажите название должности работника.</h1>
      <input :class="'employeeField'" v-model="employeeName" :placeholder="'Введите название должности работника'" />
    </div>
    <div :class="'withOutConfig-buttonPanel'">
      <button v-if="this.employeeName && this.employeeName.length > 3" :class="'button-default'" :style="{fontSize : '22px'}" @click="save()">
        Сохранить
      </button>
    </div>
  </div>
</template>


<script src="./withOutConfig.ts">
</script>


<style src="./withOutConfig.css">
</style>