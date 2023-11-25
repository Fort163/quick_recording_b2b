<template>
  <div :class="'work-place'" :key="'EditUser'" v-if="info">
    <div :class="'main-edit'">
      <div :class="'h-layout'">
        <InputText :label="'Фамилия'" :restrictions="[restriction.checkNotNull(),restriction.checkCharacterRus(),restriction.checkCharacterLength(2,80)]"
                   style="width: 50%"  v-model="info.lastName"/>
        <InputText :label="'Имя'" :restrictions="[restriction.checkNotNull(),restriction.checkCharacterRus(),restriction.checkCharacterLength(2,80)]"
                   style="width: 50%"  v-model="info.firstName"/>
      </div>
      <div :class="'h-layout'">
        <InputText :label="'Email'" :restrictions="[restriction.checkNotNull(),restriction.checkEmail()]" v-model="info.email" style="width: 50%" @keyup="emailVerified=false"/>
        <div :class="'h-layout'" style="width: 50%; margin-left: 10px">
          <p :class="['signal',emailVerified ? 'signal-success' : 'signal-error']" :title="'Не потвержден'"></p>
          <Button v-if="!emailVerified && !emailCodeSend" :image="'send.png'" style="margin-left: 20px;margin-top: 10px" :text="'Отправить код'" @click="createCodeEmail()"/>
          <InputText v-if="emailCodeSend && !emailVerified"  :label="'Код с почты'" v-model="emailCode"/>
          <Button v-if="!emailVerified && emailCodeSendAgain" :image="'send-again.png'" style="margin-left: 20px;margin-top: 10px" :text="'Отправить повторно'" @click="createCodeEmail()"/>
          <Button v-if="emailCodeSend && !emailVerified" :image="'submit.png'" style="margin-left: 20px;margin-top: 10px" :text="'Подтвердить код'" @click="checkCodeEmail()"/>
        </div>
      </div>
      <div :class="'h-layout'">
        <InputText :label="'Телефон'" :restrictions="[restriction.checkNotNull(),restriction.checkPhone()]" v-model="info.phoneNumber" style="width: 50%" @keyup="phoneVerified=false"/>
        <div :class="'h-layout'" style="width: 50%; margin-left: 10px">
          <p :class="['signal',phoneVerified ? 'signal-success' : 'signal-error']" :title="'Не потвержден'"></p>
          <Button v-if="!phoneVerified && !phoneCodeSend" :image="'send.png'" style="margin-left: 20px;margin-top: 10px" :text="'Отправить код'" @click="createCodePhone()"/>
          <InputText v-if="!phoneVerified && phoneCodeSend" :label="'Код из звонка'" v-model="phoneCode"/>
          <Button v-if="!phoneVerified && phoneCodeSendAgain" :image="'send-again.png'" style="margin-left: 20px;margin-top: 10px" :text="'Отправить повторно'" @click="createCodePhone()"/>
          <Button v-if="phoneCodeSend && !phoneVerified" :image="'submit.png'" style="margin-left: 20px;margin-top: 10px" :text="'Подтвердить код'" @click="checkCodePhone()"/>
        </div>
      </div>
      <div :class="'h-layout'">
        <InputDate :label="'Дата рождения'" :restrictions="[restriction.checkNotNull(),restriction.checkDate(null,dateUtil.dateMinusYear(18).toDateString())]" style="width: 50%" v-model="info.birthDay"/>
        <ComboBox :values="createGender()" :restrictions="[restriction.checkNotNull(),restriction.checkArrayCount(2,4)]" v-model="info.genderItem" :searchOn="false" style="width: 50%"/>
      </div>
      <ComboBox :request="getRequest()" :restrictions="[restriction.checkNotNull()]" v-model="info.test" :searchOn="true" style="width: 100%"/>
      <ComboBox :request="getRequest1()"  v-model="info.test1" :searchOn="true" style="width: 30%"/>
      <ComboBox :request="getRequest2()" :disabled="!getRequest2()"  v-model="info.test2" :searchOn="true" style="width: 100%"/>
      <ComboBox :request="getRequest2()" :disabled="!getRequest2()" v-model="info.test2" :searchOn="true" style="width: 100%"/>
      <Button :image="'submit.png'" style="margin-left: 20px;margin-top: 10px" :text="'Подтвердить код'" @click="submit()"/>
      {{info}}
    </div>

  </div>
</template>

<script src="./editUser.ts"></script>

<style src="./editUser.css"></style>