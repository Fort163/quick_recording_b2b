<template>
  <div :style="'{width:100%;height:100%}'">
    <div v-if="this.showLoadMask || this.showErrorWindow" :class="'modalMask'">
      <div v-if="this.showLoadMask" :class="'animation'">
        <span style="--i:1;"></span>
        <span style="--i:2;"></span>
        <span style="--i:3;"></span>
        <span style="--i:4;"></span>
        <span style="--i:5;"></span>
        <span style="--i:6;"></span>
        <span style="--i:7;"></span>
        <span style="--i:8;"></span>
        <span style="--i:9;"></span>
        <span style="--i:10;"></span>
        <span style="--i:11;"></span>
        <span style="--i:12;"></span>
        <span style="--i:13;"></span>
        <span style="--i:14;"></span>
        <span style="--i:15;"></span>
        <span style="--i:16;"></span>
        <span style="--i:17;"></span>
        <span style="--i:18;"></span>
        <span style="--i:19;"></span>
        <span style="--i:20;"></span>
      </div>
      <transition name="error-window-animation">
        <div key="windowError" v-if="this.showErrorWindow" :class="'errorWindow'">
          <div :class="'errorWindowTopPanel'">
            <CustomButton :image="'close.png'" style="padding: 1%" :size="'15px'" :backgroundSize="'100%'" @click="closeErrorWindow()"/>
          </div>
          <div :class="'errorWindowBody'">
            {{ this.errorWindow.error.message }}
          </div>
          <div :class="'errorWindowBottomPanel'">

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-facing-decorator";
import {State} from "@/models/main";
import {ErrorWindow, LoadMask, MaskModel} from "@/models/modal";
import {useAppStore} from "@/store/qrAppState";
import CustomButton from "@/components/customButton/CustomButton.vue";

@Component({
  components:{
    CustomButton
  }
})
export default class ModalMask extends Vue {

  private store = useAppStore();

  updated() {
    if(this.showErrorWindow){
      setTimeout(() => {
        this.$store.commit("setErrorWindow", null)
      }, 6000);
    }
  }

  get state() : State {
    return this.store
  }

  get mask() : MaskModel {
    return this.state.mask;
  }

  get errorWindow() : ErrorWindow | null{
    return this.mask.errorWindow;
  }

  get showErrorWindow() : boolean | undefined{
    return this.errorWindow?.show;
  }

  get loadMask() : LoadMask | null{
    return this.mask.loadMask;
  }

  get showLoadMask() : boolean | undefined{
    return this.loadMask?.show;
  }

  public closeErrorWindow() : void {
    this.store.mask.errorWindow = null;
  }

}
</script>

<style src="./modalMask.css">
</style>