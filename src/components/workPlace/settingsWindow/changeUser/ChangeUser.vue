<template>
  <div :class="'mainChangeUser'">
    <input :class="'text-field'" type="text" v-model="first"  :placeholder="'Укажите имя'" />
    <input :class="'text-field'" type="text" v-model="last"  :placeholder="'Укажите фамилию'" />
    <div :class="'phoneBlock'">
      <input :class="['text-field','phoneField']" type="number" v-model="phone"  :placeholder="'Укажите телефон'" />
      <div :class="'phoneButtons'">
        <button :class="'button-default check-phone'" v-if="this.showPhoneButton" @click="checkPhone()">
          Подтверить телефон
        </button>
        <button :class="'okButton'" v-if="this.verified"/>
      </div>
    </div>
    <h1 v-if="this.showCodeBloc" :class="'code-label'" :style="{fontSize : '20px'}">{{this.messagePlaceholder}}</h1>
    <div :class="'codeBlock'" v-if="this.showCodeBloc">
      <div :class="'phoneBlock'">
        <input :class="'text-field code-text'" :style="{width : '150px'}" v-model="code" />
        <button :class="'button-default check-phone'" :style="{fontSize : '20px'}" @click="checkPhoneWithCode()">
          Отправить
        </button>
      </div>
    </div>
    <div :class="'block-save'">
      <button :class="'button-default change-save'" @click="save()">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script src="./changeUser.ts"></script>

<style src="./changeUser.css"></style>