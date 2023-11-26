<template>
  <div :class="'work-place'" :key="'EditUser'" v-if="info">
    <div :class="'main-edit'">
      <div :class="'h-layout'">
        <InputText :label="'Фамилия'" style="width: 50%" v-model="info.lastName"
                   :restrictions="[restriction.checkNotNull('фамилия'),
                   restriction.checkCharacterRus('Фамилия может содержать только русские символы'),
                   restriction.checkCharacterLength(2,80)]"
        />
        <InputText :label="'Имя'" style="width: 50%" v-model="info.firstName"
                   :restrictions="[restriction.checkNotNull('имя'),
                   restriction.checkCharacterRus('Имя может содержать только русские символы'),
                   restriction.checkCharacterLength(2,80)]"
        />
      </div>
      <div :class="'h-layout'">
        <InputText :label="'Email'" :restrictions="[restriction.checkNotNull('Email'),restriction.checkEmail()]"
                   v-model="info.email" style="width: 50%" @keyup="emailVerified=false"/>
        <div :class="'h-layout'" style="width: 50%; margin-left: 10px">
          <p :class="['signal',emailVerified ? 'signal-success' : 'signal-error']" :title="'Не потвержден'"></p>
          <Button v-if="!emailVerified && !emailCodeSend" :errors="emailError" :width="'100%'" :height="50" :radius="10" :color="'inherit'"
                  style="margin-left: 20px;margin-top: 10px"
                  :text="'Отправить код'" @click="createCodeEmail()"/>
          <InputText v-if="emailCodeSend && !emailVerified" :label="'Код с почты'" autofocus v-model="emailCode"/>
          <Button v-if="!emailVerified && emailCodeSendAgain" :image="'send-again.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="'Отправить повторно'" @click="createCodeEmail()"/>
          <Button v-if="emailCodeSend && !emailVerified" :image="'send.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="'Подтвердить код'" :errors="emailError" @click="checkCodeEmail()"/>
        </div>
      </div>
      <div :class="'h-layout'">
        <InputText :label="'Мобильный телефон'" style="width: 50%" @keyup="phoneVerified=false"
                   v-model="info.phoneNumber"
                   :restrictions="[restriction.checkNotNull('мобильный телефон'),restriction.checkPhone()]"/>
        <div :class="'h-layout'" style="width: 50%; margin-left: 10px">
          <p :class="['signal',phoneVerified ? 'signal-success' : 'signal-error']" :title="'Не потвержден'"></p>
          <Button v-if="!phoneVerified && !phoneCodeSend" :errors="phoneError" :width="'100%'" :height="50" :radius="10" :color="'inherit'"
                  style="margin-left: 20px;margin-top: 10px"
                  :text="'Отправить код'" @click="createCodePhone()"/>
          <InputText v-if="!phoneVerified && phoneCodeSend" autofocus :label="'Код из звонка'" v-model="phoneCode"/>
          <Button v-if="!phoneVerified && phoneCodeSendAgain" :image="'send-again.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="'Отправить повторно'" @click="createCodePhone()"/>
          <Button v-if="phoneCodeSend && !phoneVerified" :errors="phoneError" :image="'send.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="'Подтвердить код'" @click="checkCodePhone()"/>
        </div>
      </div>
      <div :class="'h-layout'">
        <InputDate :label="'Дата рождения'" style="width: 50%" v-model="info.birthDay"
                   :restrictions="[restriction.checkNotNull('Дата рождения'),
                   restriction.checkDate(null,dateUtil.dateMinusYear(18).toDateString(),'Дата рождения')]"/>
        <ComboBox :values="createGender()" v-model="genderCombo" :searchOn="false" style="width: 50%" :label="'Выберите пол'"
                  :restrictions="[restriction.checkNotNull('пол'),restriction.checkArrayCount(2,4)]"
                  />
      </div>
      <div :class="'h-layout'" style="flex-direction: row-reverse">
        <Button  :errors="this.pageError" :height="50" :width="100" :radius="15" :color="'inherit'" style="margin-left: 20px;margin-top: 10px"
                :text="'Отправить данные'" @click="submit()"/>
      </div>
    </div>
  </div>
</template>

<script src="./editUser.ts"></script>

<style src="./editUser.css"></style>