export class RequestCombo {
}export class RequestCombo {
}
<template>
  <div :class="['main-combo', disabled ? 'main-combo-disabled' : '', this.errors.length > 0 ? 'errors-input' : '' ]"
       :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')"
       @mouseleave="mouseLeaveComponent()">
    <div :class="['combo-display' , disabled ? 'combo-display-disabled' : '']"
         @dblclick="openStore = true" @click="(!multi) ? openStore = true : openStore=true">
      <label v-if="label && ((!currentValue && !multi) || (multi && !openStore && currentValue.length === 0))" :class="['combo-label']">{{label}}</label>
      <input v-if="openStore && searchOn && !disabled" type="search" :class="'combo-search'" :placeholder="'Поиск'" autofocus v-model="search" @change="searchRequest()" @keyup="searchRequest()"
             @focusin="openStore = true" @focusout="openStore = false">
      <template v-if="(multi && !openStore && searchOn) || (multi && !searchOn)">
        <transition-group v-for="item in this.currentValue" :key="item[key]" :class="'combo-multi'" name="combo-value" tag="div" @click="(multi) ? openStore = true : openStore=openStore">
            <div :key="item[key]" :class="'combo-item'" :title="item[val]">
              <label :class="'combo-label-item'">{{ item[val] }}</label>
              <div style="width: 1%">
                <Button :image="'close.png'" :size="'15px'" :backgroundSize="'100%'" :class="'combo-item-close'" @click="clearCurrentValue(item)"/>
              </div>
            </div>
        </transition-group>
      </template>
      <template v-else>
        <div v-if="(this.currentValue && searchOn && !openStore) || (this.currentValue && !searchOn)" :class="'combo-item'" :title="this.currentValue[val]">
          <label :class="'combo-label-item'">{{ currentValue[val] }}</label>
          <div style="width: 1%">
            <Button :image="'close.png'" :size="'15px'" :backgroundSize="'100%'" :class="'combo-item-close'" @click="clearCurrentValue(currentValue)"/>
          </div>
        </div>
      </template>
    </div>
    <transition name="combo-store-animation">
      <div v-if="openStore" :class="'combo-store-position'" @mouseleave="changeOpenStore()">
        <div :class="'combo-store-size'" @mouseleave="inStore = false" @mousemove="inStore = true">
          <div :class="'combo-store'">
            <template v-for="item in filterStore()" :class="'combo-store'">
              <div :class="'combo-store-item'" :key="item[key]" @click="select(item)" :title="item[val]">{{ item[val] }}</div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script src="./comboBox.ts"></script>
<style src="./comboBox.css"></style>
