<template>
  <div class="mainTable">
    <div :class="'columnTable'">
      <TrCustom :columns="tableColumn" :key="'title'" :isTitle="true" />
    </div>
    <transition-group :class="'dataTable'" name="dataAnimation" tag="div">
      <TrCustom v-for="(item,index) in this.tableData" :key="index" :isTitle="false" :index="index"/>
    </transition-group>
    <div v-if="tableColumn" :class="'buttonBar'">
      <button v-if="addButton" :class="'tableAdd'" :title="'Добавить'" @click="addItem()"/>
      <button v-if="saveButton" :class="'tableSave'" :title="'Сохранить'" @click="save()"/>
    </div>
    <div v-if="showError" :class="'errorDown'">
      <h3>Ошибка заполнения</h3>
      <div :class="'errorValue'" v-for="(item,index) in this.errors" :key="index" >
        {{item}}
      </div>
    </div>
  </div>
</template>

<script src="./tableCustom.ts">
</script>

<style src="./tableCustom.css">

</style>