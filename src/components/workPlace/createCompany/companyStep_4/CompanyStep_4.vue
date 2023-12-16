<template>
  <div :class="'company-step'" :key="'CompanyStep_2'">

    <div :class="'v-layout'">
      <label :class="'label-simple'" >Название : </label>
      <label :class="'label-simple'" style="font-size: x-large">{{ company.name }}</label>
      <label :class="'label-simple'">Адрес : </label>
      <label :class="'label-simple'">{{ company.geoPosition.name }}</label>
      <label :class="'label-simple'">Виды деятельности : </label>
      <ul>
        <template v-for="item in company.activity">
          <li :class="'label-simple'" :key="item.uuid">{{ item.name }}</li>
        </template>
      </ul>
      <label :class="'label-simple'">График : </label>
      <ul>
        <template v-for="item in company.schedules">
          <li :class="'label-simple'" v-if="item.work" :key="item.uuid">{{ item.dayOfWeek }} c {{ item.clockFrom }} до
            {{ item.clockTo }}
          </li>
        </template>
      </ul>
    </div>

    <div :class="'h-layout'" style="flex-direction: row-reverse">
      <Button :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'"
              style="margin-left: auto;margin-top: 10px"
              :text="'Создать'" @click="submit()"/>
      <Button :height="50" :width="200" :radius="15" :color="'inherit'" style="margin-right: auto;margin-top: 10px"
              :text="'Назад'" @click="back()"/>
    </div>
  </div>
</template>

<script src="./companyStep_4.ts"></script>

<style src="./companyStep_4.css"></style>