<template>
  <el-icon
    class="fold-wrapper"
    :class="[state.isCollapse ? 'fold-close-status' : 'fold-open-status']"
    @click="toggleFold"
  >
<!--  <Fold />-->
    <img :src="collapseSvg" alt="">
  </el-icon>
</template>

<script lang="ts">
import store from '../store'
import { defineComponent } from 'vue'
import { Fold } from '@element-plus/icons'

import collapseSvg from "@/assets/collapse.svg"
export default defineComponent({
  name: 'Humburger',
  components: {Fold},
  setup() {
    function toggleFold() {
      store.toggleCollapse(!store.state.isCollapse)
    }
    return {
      state: store.state,
      toggleFold,
      collapseSvg
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
.fold-open-status {
  transform: rotate(180deg);
  margin: 4px 10px 0px;
}
.fold-close-status {
  transform: rotate(0);
  margin: -2px 10px 0px;
}
.fold-wrapper {
  box-sizing: border-box;
  display: inline-block;
  text-align: center;

  font-size: 20px;
  transition: transform $transitionTime;
}
.fold-wrapper:hover {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
