<template>
  <div :class="'work-place-overflow-y'">
    <transition name="work-place">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts" >
import {Component, Vue} from "vue-facing-decorator";

@Component({
  components: {
  }

})
export default class WorkPlace extends Vue {

}

</script>

<style src="./workPlace.css"></style>