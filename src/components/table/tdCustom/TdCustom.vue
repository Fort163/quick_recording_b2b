<template>
  <div :class="'tdMain'" :style="{width:this.width}">
    <div v-if="this.isTitle" :class="'tdTitle'">{{this.value}}</div>
    <div v-else :class="'tdData'">
      <div v-if="type.toString()==='noEditable'" :class="[this.isOk ? '' : 'error','tdAll']" :title="isOk?'':errorMessage">{{this.value}}</div>
      <input v-if="type.toString()==='text'" :class="[this.isOk ? '' : 'error','tdAll']" v-model="value" :title="isOk?'':errorMessage"/>
      <textarea v-if="type.toString()==='textarea'" :class="[this.isOk ? '' : 'error','tdAll text']" v-model="value" :title="isOk?'':errorMessage"/>
      <input v-if="type.toString()==='date'" :class="[this.isOk ? '' : 'error','tdAll date']" type="date" v-model="value" :title="isOk?'':errorMessage"/>
      <input v-if="type.toString()==='time'" :class="[this.isOk ? '' : 'error','tdAll datetime']" type="time" min="00:00" max="23:59" v-model="value" :title="isOk?'':errorMessage"/>
      <input v-if="type.toString()==='email'" :class="[this.isOk ? '' : 'error','tdAll email']" type="email" v-model="this.value" :title="isOk?'':errorMessage"/>
      <input v-if="type.toString()==='number'" :class="[this.isOk ? '' : 'error','tdAll number']" type="number" step="0.01" v-model="value" :title="isOk?'':errorMessage"/>
      <div v-if="type.toString()==='checkbox'" :class="'checkbox'" v-on:click="value=!value">
        <div :class="[this.value ? 'check' : 'uncheck']"/>
      </div>
      <input v-if="type.toString()==='radio'" :class="[this.isOk ? '' : 'error','tdAll radio']" type="radio" v-model="value" :title="isOk?'':errorMessage"/>
      <SelectBox v-if="type.toString()==='combobox'" :model="this.comboData" :value="value"  :class="[this.isOk ? '' : 'error','tdAll combo']" v-model="value" :title="isOk?'':errorMessage"/>
      <!--TODO-->
      <!--<input v-if="type.toString()==='file'" type="file" v-model="this.value">-->

    </div>
  </div>
</template>

<script src="./tdCustom.ts">
</script>

<style src="./tdCustom.css">

</style>