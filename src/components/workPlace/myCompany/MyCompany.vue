<template>
  <div :class="'mainMyCompany'">
    <div :class="'menuMyCompany'">
      <button :class="[this.currentFrame==='STATISTIC' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('STATISTIC')">
        Статистика
      </button>
      <button :class="[this.currentFrame==='EMPLOYEES' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('EMPLOYEES')">
        Сотрудники
      </button>
      <button :class="[this.currentFrame==='CREATE_SERVICE_TYPE' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('CREATE_SERVICE_TYPE')">
        Типы услуг
      </button>
      <button :class="[this.currentFrame==='INTEGRATION' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('INTEGRATION')">
        Интеграция
      </button>
    </div>
    <div :class="'tableMyCompany'">
      <Statistic v-if="this.currentFrame==='STATISTIC'" :key="'statistic'"></Statistic>
      <Employees v-if="this.currentFrame==='EMPLOYEES'" :key="'employees'"></Employees>
      <CreateServiceType v-if="this.currentFrame==='CREATE_SERVICE_TYPE'" :key="'createServiceType'"></CreateServiceType>
      <Integration v-if="this.currentFrame==='INTEGRATION'" :key="'integration'"></Integration>
    </div>
  </div>
</template>

<script src="./myCompany.ts">
</script>

<style src="./myCompany.css">
</style>