<template>
  <div :class="'work-place'" :key="'EditUser'" v-if="info">
    <div :class="'main-edit'">
      <div :class="'h-layout'">
        <InputText :label="'Фамилия'" v-model="info.lastName"/>
        <InputText :label="'Имя'" v-model="info.firstName"/>
      </div>
      <div :class="'h-layout'">
        <InputText :label="'Email'" v-model="info.email" @keyup="emailVerified=false"/>
        <div :class="'h-layout'" style="width: fit-content;">
          <p :class="['signal',emailVerified ? 'signal-success' : 'signal-error']" :title="'Не потвержден'"></p>
          <Button v-if="!emailVerified && !emailCodeSend" :image="'send.png'" style="margin-left: 20px;margin-top: 10px" :text="'Отправить код'" @click="createCodeEmail()"/>
          <Button v-if="!emailVerified && emailCodeSendAgain" :image="'send-again.png'" style="margin-left: 20px;margin-top: 10px" :text="'Отправить повторно'" @click="createCodeEmail()"/>
          <InputText v-if="emailCodeSend && !emailVerified" :label="'Код с почты'" v-model="emailCode"/>
          <Button v-if="emailCodeSend && !emailVerified" :image="'submit.png'" style="margin-left: 20px;margin-top: 10px" :text="'Подтвердить код'" @click="checkCodeEmail()"/>
        </div>
      </div>
<!--      <div :class="'h-layout'"> :backColor="'inherit'"
        <input type="text" v-model="info.phoneNumber" :class="'input-test'" placeholder="">
        <span :class="'signal'"></span>
        <input type="text" :class="'input-test'" placeholder="">
        <button>Отправить</button>
      </div>-->
    </div>

  </div>
</template>

<script src="./editUser.ts"></script>

<style src="./editUser.css"></style>