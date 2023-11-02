<template>
  <div :style="{width:'100%',height:'100%'}">
    <h1 :class="'requestName'" @click="$emit('back-frame')">{{this.requestName}}</h1>
    <transition name="frame" mode="out-in">
      <div v-if="this.step==='Step_1'" :class="'bodyEmployee'" :key="'Step_1'">
        <h1>Шаг 1.</h1>
        <h1>Укажите название должности работника и типы оказываемых им услуг.</h1>
        <input :class="'employeeField'" v-model="employeeName" :placeholder="'Введите название должности работника'" />
        <div v-if="comboData.length>0" >
          <h1>Выберите типы оказываемых им услуг</h1>
          <SelectBox :model="comboData" :value="this.employeeServiceType" :class="'employeeServiceType'"/>
        </div>
        <div v-if="comboData.length===0" >
          <h1>Создайте типы услуг Моя компания -> Типы услуг</h1>
        </div>
      </div>
      <div v-if="this.step==='Step_2'" :class="'bodyEmployee'" :key="'Step_2'">
        <h1>Шаг 2.</h1>
        <TableCustom :tableSettings="scheduleTable"></TableCustom>
      </div>
      <div v-if="this.step==='Step_3'" :class="'bodyEmployee'" :key="'Step_3'">
        <h1>Шаг 3.</h1>
        <h1>Проверьте данные</h1>
        <div :class="'choseData'">
          <div :class="'chose'"><div :class="'choseLabel'">Должность : </div><div :class="'choseValue'">{{this.employeeName}}</div></div>
          <div :class="'chose'"><div :class="'choseLabel'">Типы услуг : </div><div :class="'choseValue'">{{this.serviceTypeString}}</div></div>
          <div :class="'chose'">
            <div :class="'choseLabel'">Режим работы : </div>
            <div :class="'choseSchedule'">
              <div v-for="item in this.schedulesList" :key="item.dayOfWeek">
                <div v-if="item.work" :class="'choseValue'">
                  {{item.dayOfWeek}} {{item.clockFrom}}-{{item.clockTo}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <ButtonFooter :startStep="this.currentStep" :maxStep="'Step_3'" :lastButtonText="'Сохранить!'" :lastFunc="this.save()" :disabled="this.isDisabled()" />
  </div>
</template>

<script src="./withConfig.ts">
</script>

<style src="./withConfig.css">
</style>