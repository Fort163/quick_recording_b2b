<template>
  <div :class="'work-place'" :key="'EditUser'" v-if="info">
    <div :class="'main-edit'">
      <div :class="'h-layout'">
        <InputText :label="this.$t('label.editUser.field.lastName')" style="width: 50%" v-model="info.lastName"
                   :restrictions="[restriction.checkNotNull(this.$t('label.editUser.restriction.lastName.fieldName').toString()),
                      restriction.checkCharacterLetters(this.$t('label.editUser.restriction.lastName.checkCharacterLetters').toString()),
                      restriction.checkCharacterLength(2,80)
                   ]"/>
        <InputText :label="this.$t('label.editUser.field.firstName')" style="width: 50%" v-model="info.firstName"
                   :restrictions="[restriction.checkNotNull(this.$t('label.editUser.restriction.firstName.fieldName').toString()),
                      restriction.checkCharacterLetters(this.$t('label.editUser.restriction.firstName.checkCharacterLetters').toString()),
                      restriction.checkCharacterLength(2,80)
                   ]"/>
      </div>
      <div :class="'h-layout'">
        <InputText :label="this.$t('label.editUser.field.email')"  v-model="info.email" style="width: 50%" @keyup="emailVerified=false"
                   :restrictions="[ restriction.checkEmail(),
                       restriction.checkNotNull(this.$t('label.editUser.restriction.email.fieldName').toString())
            ]"/>
        <div :class="'position-before-absolute'">
          <p :class="['signal',emailVerified ? 'signal-success' : 'signal-error']" :title="this.$t('label.editUser.notConfirmed')"></p>
        </div>
        <div :class="'h-layout'" style="width: 50%; margin-left: 10px">
          <Button v-if="!emailVerified && !emailCodeSend" :errors="emailError" :width="'100%'" :height="50" :radius="10" :color="'inherit'"
                  style="margin-left: 20px;margin-top: 10px"
                  :text="this.$t('label.editUser.customButton.sendCode')" @click="createCodeEmail()"/>
          <InputText v-if="emailCodeSend && !emailVerified" :label="this.$t('label.editUser.field.codeFromEmail')" autofocus v-model="emailCode"/>
          <Button v-if="!emailVerified && emailCodeSendAgain" :image="'send-again.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="this.$t('label.editUser.customButton.sendAgain')" @click="createCodeEmail()"/>
          <Button v-if="emailCodeSend && !emailVerified" :image="'submit.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="this.$t('label.editUser.customButton.confirmCode')" :errors="emailError" @click="checkCodeEmail()"/>
        </div>
      </div>
      <div :class="'h-layout'">
        <InputText :label="this.$t('label.editUser.field.phone')" style="width: 50%" @keyup="phoneVerified=false"
                   v-model="info.phoneNumber"
                   :restrictions="[
                       restriction.checkNotNull(this.$t('label.editUser.restriction.phone.fieldName').toString()),
                       restriction.checkPhone()
                   ]"/>
        <div :class="'position-before-absolute'">
          <p :class="['signal',phoneVerified ? 'signal-success' : 'signal-error']" :title="this.$t('label.editUser.notConfirmed')"></p>
        </div>
        <div :class="'h-layout'" style="width: 50%; margin-left: 10px">
          <Button v-if="!phoneVerified && !phoneCodeSend" :errors="phoneError" :width="'100%'" :height="50" :radius="10" :color="'inherit'"
                  style="margin-left: 20px;margin-top: 10px"
                  :text="this.$t('label.editUser.customButton.sendCode')" @click="createCodePhone()"/>
          <InputText v-if="!phoneVerified && phoneCodeSend" autofocus :label="this.$t('label.editUser.field.codeFromCall')" v-model="phoneCode"/>
          <Button v-if="!phoneVerified && phoneCodeSendAgain" :image="'send-again.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="this.$t('label.editUser.customButton.sendAgain')" @click="createCodePhone()"/>
          <Button v-if="phoneCodeSend && !phoneVerified" :errors="phoneError" :image="'submit.png'"
                  style="margin-left: 20px;margin-top: 10px" :text="this.$t('label.editUser.customButton.confirmCode')" @click="checkCodePhone()"/>
        </div>
      </div>
      <div :class="'h-layout'">
        <InputDate :label="this.$t('label.editUser.field.birthDay')" style="width: 50%" v-model="info.birthDay"
                   :restrictions="[
                       restriction.checkNotNull(this.$t('label.editUser.restriction.birthDay.fieldName').toString()),
                       restriction.checkDate(null,dateUtil.dateMinusYear(18).toDateString(),
                                              this.$t('label.editUser.restriction.birthDay.fieldName').toString())
                   ]"/>
        <ComboBox :values="createGender()" v-model="genderCombo" :searchOn="false" style="width: 50%" :label="this.$t('label.editUser.field.gender')"
                  :restrictions="[
                      restriction.checkNotNull(this.$t('label.editUser.restriction.gender.fieldName').toString()),
                      restriction.checkArrayCount(2,4)
                  ]"/>
      </div>
      <div :class="'h-layout'" style="flex-direction: row-reverse">
        <Button  :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'" style="margin-left: 20px;margin-top: 10px"
                :text="this.$t('label.editUser.customButton.sendData')" @click="submit()"/>
      </div>
    </div>
  </div>
</template>

<script src="./editUser.ts"></script>

<style src="./editUser.css"></style>