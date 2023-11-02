<template>
  <div class="work-place">
    <transition name="placer" mode="out-in">
      <SettingsWindow v-if="!this.currentFrame && this.haveEmployee" :key="'settingsWindow'"></SettingsWindow>
      <CreatePermission v-if="this.currentFrame==='ROLE_CREATE_PERMISSION'" :key="'createPermission'"></CreatePermission>
      <CreateRole v-if="this.currentFrame==='ROLE_CREATE_ROLE'" :key="'createRole'"></CreateRole>
      <CreateCompany v-if="this.currentFrame==='ROLE_CREATE_COMPANY'" :key="'createRole'"></CreateCompany>
      <CreateActivity v-if="this.currentFrame==='ROLE_CREATE_ACTIVITY'" :key="'createActivity'"></CreateActivity>
      <ClaimCompany v-if="this.currentFrame==='ROLE_CLAIM_COMPANY'" :key="'claimCompany'"></ClaimCompany>
      <AddEmployee v-if="this.currentFrame==='ROLE_ADD_EMPLOYEE'" :key="'addEmployee'"></AddEmployee>
      <MyCompany v-if="this.currentFrame==='ROLE_MY_COMPANY'" :key="'myCompany'"></MyCompany>
      <SeeClaimService v-if="this.currentFrame==='ROLE_SEE_CLAIM_SERVICE'" :key="'seeClaimService'"></SeeClaimService>
      <FixPartTime v-if="this.currentFrame==='ROLE_FIX_PART_TIME'" :key="'fixPartTime'"></FixPartTime>
    </transition>
  </div>
</template>

<script src="./workPlace.ts"></script>

<style src="./workPlace.css"></style>