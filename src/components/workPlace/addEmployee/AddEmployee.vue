<template>
  <div :class="'addEmployeeMain'">
    <transition name="frame" mode="out-in">
      <div v-if="this.currentFrame === 'MAIN'" :class="'addEmployeeMain'" :key="'MAIN'">
        <h1>Выбирите действие</h1>
        <button v-if="this.showOwnerEmployee" :class="'button-default'" :style="{fontSize : '25px'}" @click="selectWithConfig(null)">
          Принимать заявки
        </button>
        <transition-group :class="'employeeItems'" name="notificationAnimation" tag="div">
          <div :class="'employeeItem'" v-for="item in this.claims" :key="item.id">
            <button :class="'button-danger'" @click="refuse(item)">
              Отказать
            </button>
            <div :class="'employeeName'">{{item.user.fullName}}</div>
            <button :class="'button-default'" :style="{fontSize : '20px'}" @click="selectWithConfig(item)">
              Добавить с настройками
            </button>
            <button :class="'button-default'" :style="{fontSize : '18px'}" @click="selectWithOutConfig(item)">
              Добавить и разрешить редактирование
            </button>
          </div>
        </transition-group>
      </div>
      <WithConfig v-if="this.currentFrame === 'WITH_CONFIG'" :selectRequest="this.selectRequest" v-on:back-frame="backFrame()" :key="'WITH_CONFIG'"></WithConfig>
      <With-out-config v-if="this.currentFrame === 'WITH_OUT_CONFIG'" :selectRequest="this.selectRequest" v-on:back-frame="backFrame()" :key="'WITH_OUT_CONFIG'"></With-out-config>
    </transition>
  </div>
</template>

<script src="./addEmployee.ts">
</script>

<style src="./addEmployee.css">
</style>