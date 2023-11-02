<template>
  <div :class="'mainWarnings'">
    <div v-if="!noPhone && !ownerWithoutService" :class="'errorMessage'">Не указан телефон!<br>
      Если хотите получать уведомления по SMS укажите телефон, во вкладке редактировать пользователя.</div>

    <div v-if="ownerWithoutService" :class="'warningMessage'">На данный момент вы не получаете заявки на онлайн запись<br>
      Если хотите получать заявки, укажите время онлайн записи и типы услуг, в меню "Моя компания" -> "Добавить сотрудника".</div>

    <div v-if="count < 2 && isOwner" :class="'warningMessage'">На данный момент ваша компания оказывает один тип услуг, по умолчанию продолжительностью один час<br>
      Если ваша компания оказывает разные услуги за разное время, добавте новые типы услуг в меню <br>"Моя компания" -> "Моя компания" -> "Типы услуг".</div>
  </div>
</template>

<script src="./warningWindow.ts"></script>

<style src="./warningWindow.css"></style>