<template>
  <div :class="['main-button']" @mouseenter="show=true" @mouseleave="show=false">
  <label v-if="image && show" :class="'button-label'">{{text}}</label>
    <button  :class="['button-image',this.errors && this.errors.length > 0 ? 'errors-input' : '']" :errors="errors" :style="this.createStyle"
            @click="callback()">
      <label v-if="!image" style="cursor: pointer; font-size: medium; padding: 5px">{{text}}</label>
    </button>
  </div>

</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-facing-decorator";
import * as events from "node:events";

@Component({
  components: {
  }
})
export default class CustomButton extends Vue {

  @Prop() private color : String | undefined;
  @Prop() private backColor : String | undefined;
  @Prop() private image : String | undefined;
  @Prop() private size : String | undefined;
  @Prop() private width : String | undefined;
  @Prop() private height : String | undefined;
  @Prop() private radius : String | undefined;
  @Prop() private text : String | undefined;
  @Prop() private backgroundSize : String | undefined;
  @Prop() private select : Boolean | undefined;
  @Prop() private errors : Array<string> | undefined;
  private show : boolean = false;

  created(){
  }

  mounted(){

  }

  @Emit("click")
  callback(e : events) {
    return e
  }

  get url() : URL | undefined{
    return this.image? new URL(import.meta.env.VITE_BASE_URL + "/assets/"+this.image) : undefined
  }

  get radiusCalc() : String{
    if(this.radius){
      return this.fixParam(this.radius)
    }
    return '50%'
  }

  get widthCalc() : String  {
    if(this.width){
      return this.fixParam(this.width)
    }
    else {
      if(this.size){
        return this.fixParam(this.size)
      }
      return '50px'
    }
  }

  get heightCalc() : String  {
    if(this.height){
      return this.fixParam(this.height)
    }
    else {
      if(this.size){
        return this.fixParam(this.size)
      }
      return '50px'
    }
  }

  protected backGroundColor() : String{
    if(this.backColor){
      return this.fixColor(this.backColor);
    }
    else {
      return this.fixColor(this.color);
    }
  }

  protected fixParam(param : String | undefined) : String{
    if(param){
      if(param.toString().includes('px') ||  param.toString().includes('%')){
        return param
      }
      else {
        return param + 'px'
      }
    }
    return ''
  }

  protected fixColor(param : String | undefined) : String{
    if(param){
      return param
    }
    return '#e3e9ea'
  }

  protected changeColor(color : String, percent : number) : String{
    if(color != 'inherit') {
      let R: number = parseInt(color.substring(1, 3), 16);
      let G: number = parseInt(color.substring(3, 5), 16);
      let B: number = parseInt(color.substring(5, 7), 16);

      R = parseInt(String(R * (100 + percent) / 100));
      G = parseInt(String(G * (100 + percent) / 100));
      B = parseInt(String(B * (100 + percent) / 100));

      R = (R < 255) ? R : 255;
      G = (G < 255) ? G : 255;
      B = (B < 255) ? B : 255;

      R = Math.round(R)
      G = Math.round(G)
      B = Math.round(B)

      const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
      const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
      const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

      return "#" + RR + GG + BB;
    }
    else {
      return '#57b4ee';
    }
  }

  protected createBackgroundSize(){
    if(this.backgroundSize && this.backgroundSize.includes('%')){
      return this.backgroundSize + ' ' + this.backgroundSize
    }
    else {
      return '60% 60%'
    }
  }

  get createStyle() : Object {
    return {
      '--button-background-color': this.select ? this.changeColor(this.backGroundColor(),35) : this.backGroundColor(),
      '--button-width': this.widthCalc,
      '--button-min-width': this.url ? this.widthCalc : undefined,
      '--button-min-height': this.heightCalc,
      '--button-height': this.heightCalc,
      '--button-background-image' : 'url(' + this.url + ')',
      '--button-border-radius': this.radiusCalc,
      '--button-background-color--hover': this.changeColor(this.fixColor(this.color),25),
      '--button-background-size': this.createBackgroundSize()
    }
  }

}

</script>
<style src="./customButton.css"></style>
