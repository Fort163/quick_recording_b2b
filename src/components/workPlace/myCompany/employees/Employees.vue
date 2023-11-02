<template>
  <div :class="'mainEmployees'">
    Сотрудники в разработке
    <div v-if="selectEmployee == null">
      <div v-for="(item,index) in this.employees" :key="index" @click="selectEmployee=item">{{ item.user.fullName }}
        {{ item.name }}
      </div>
    </div>

    <WithConfig v-if="selectEmployee != null" :editEmployee="selectEmployee"/>
  </div>
</template>

<script src="./employees.ts">
</script>

<style src="./employees.css">
</style>