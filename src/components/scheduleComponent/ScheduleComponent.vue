<template>
  <div :key="keyNumber" :class="'v-layout'">
    <div :key="index" :class="'h-layout'" v-for="(item,index) in currentValue">
      <InputSchedule v-model="currentValue[index]" :restrictions="[restriction.checkSchedule()]" style="width: 100%;margin-top: 5px"/>
      <Button v-if="needRepeat" :height="50" :width="100" :radius="15" :color="'inherit'" style="margin-left: 5px;margin-top: 10px"
              :text="$t('label.scheduleComponent.button.repeat')" @click="repeat(index)"/>
    </div>
  </div>
</template>

<script src="./scheduleComponent.ts"></script>
<style src="./scheduleComponent.css"></style>
