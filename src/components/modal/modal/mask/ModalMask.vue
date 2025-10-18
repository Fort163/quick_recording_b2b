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
            <Button :image="'close.png'" style="padding: 1%" :size="'15px'" :backgroundSize="'100%'" @click="closeErrorWindow()"/>
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

<script src="./modalMask.ts">
</script>

<style src="./modalMask.css">
</style>