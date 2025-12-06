<template>
  <div :class="['input-test-main', this.errors.length > 0 ? 'errors-input' : '']" :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')">
    <div :class="'position-before-absolute'"><label v-if="label" :class="[ (currentValue && currentValue.length > 0) || focus ? 'input-test-label-top' : 'input-test-label-none' ]">{{label}}</label></div>
    <input type="text" v-model="currentValue" @keyup="keyup()" @change="input()"
           @focusin="focus=true" @focusout="focus=false" :class="['input-test']" :placeholder="focus ? '' : label">
  </div>

</template>

<script lang="ts">
import {CheckComponent} from "@/store/component";
import {Component, Emit, Prop} from "vue-facing-decorator";

@Component({
  components: {
  }
})
export default class InputText extends CheckComponent {

  @Prop() private color : String | undefined;
  @Prop() private backColor : String | undefined;
  @Prop() private image : String | undefined;
  @Prop() private size : String | undefined;
  @Prop() private width : String | undefined;
  @Prop() private height : String | undefined;
  @Prop() private radius : String | undefined;
  @Prop() private label : String | undefined;

  private focus : Boolean = false;
  @Prop({default: ''}) private value : String | undefined;

  private currentValue : String = '';

  created(){
    if(this.value) {
      this.currentValue = this.value
    }
  }

  @Emit('input')
  public input(){
    super.check()
    return this.currentValue;
  }

  @Emit('keyup')
  public keyup(){
    super.check()
    return this.currentValue;
  }


  getValue(): String {
    return this.currentValue;
  }

}
</script>
<style src="./inputText.css"></style>
