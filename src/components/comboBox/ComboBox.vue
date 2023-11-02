<template >
  <div :class="'combobox'" @mousemove="setEnter(true)" @mouseleave="setEnter(false)">
    <label :class="'combobox-label'">{{this.title}}</label>
    <transition-group v-if="this.enter || true" v-bind:class="'combobox-ul'" name="comboAnimation" tag="ul">
      <li :class="'li-combobox first'" @click="clickFunc(item)" v-for="(item) in this.comboItem" :key="item.id">
        {{ item.name }}
      </li>
    </transition-group>
  </div>
</template>

<script src="./comboBox.ts">
</script>

<style src="./comboBox.css">
</style>