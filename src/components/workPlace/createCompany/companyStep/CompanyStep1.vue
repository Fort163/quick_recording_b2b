<template>
  <div :class="'company-step'" :key="'CompanyStep_1'">
    <div :class="'v-layout'" style="margin: auto">
      <InputText ref="companyName" :label="this.$t('label.createCompany.companyStep.field.companyName')"
                 :restrictions="[
                           restriction.checkNotNull(this.$t('label.createCompany.companyStep.restriction.companyName.fieldName').toString()),
                           restriction.checkCharacterLength(3)
                         ]"
                 v-model:value="company.name" style="width: 100%"/>
      <ComboBox ref="activityList" :searchOn="true" v-model:value="company.activities" :restrictions="[
                  restriction.checkNotNull($t('label.createCompany.companyStep.restriction.activity.fieldName').toString())
                ]"
                :label="$t('label.createCompany.companyStep.field.activityPlaceholder')" :request="activityRequest"
                style="width: 100%; height: 50px"/>
      <div :class="'h-layout'" style="flex-direction: row-reverse">
        <CustomButton :errors="this.pageError" :height="50" :width="200" :radius="15" :color="'#a4fdc0'"
                      style="margin-left: 20px;margin-top: 10px"
                      :text="this.$t('label.createCompany.button.next')" @click="submit()"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-facing-decorator";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import {companyApi} from "@/api/apiUtil";
import {useAppStore} from "@/store/qrAppState";
import {RequestCombo} from "@/components/comboBox/ComboBox.vue";
import CustomButton from "@/components/customButton/CustomButton.vue";

@Component({
  components: {
    CustomButton
    /*
    CustomButton*/
  }

})
export default class CompanyStepOne extends Vue {

  private pageError: Array<string> = new Array<string>()
  private appStore = useAppStore();
  private restrictionFactory: RestrictionFactory = new RestrictionFactory();

  get store() {
    return this.appStore;
  }

  get company() {
    return this.store.createCompany?.company
  }

  get restriction() {
    return this.restrictionFactory;
  }

  get activityRequest(): RequestCombo {
    return new RequestCombo(companyApi('/activity'),
        'GET', null, 'name', 'uuid', true, 'name')
  }

  public submit() {
    this.pageError = new Array<string>();
    const error: Errors = this.restriction.checkError(this)
    if (error.hasError) {
      error.messages.forEach(item => {
        this.pageError.push(item)
      })
    }
    if (this.pageError.length === 0) {
      this.$router.push('step_2')
    }
  }

}
</script>

<style src="./companyStep1.css"></style>