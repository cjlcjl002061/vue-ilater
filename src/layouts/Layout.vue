<template>
  <div
    class="vaw-layout-container"
    :class="[state.device === 'mobile' && 'is-mobile', state.theme]"
  ><n-watermark
      :content="userStore.userName+userStore.account"
      :cross="true"
      fullscreen
      :z-index="999999"
      font-color="rgba(188, 188, 188, 0.2)"
      :font-size="16"
      :line-height="16"
      :width="300"
      :height="250"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
  />
    <n-watermark
      :content="localTime"
      :cross="true"
      fullscreen
      :z-index="999999"
      font-color="rgba(188, 188, 188, 0.2)"
      :font-size="14"
      :line-height="16"
      :width="300"
      :height="250"
      :x-offset="25"
      :y-offset="80"
      :rotate="-15"
  />
    <template v-if="state.device === 'mobile'">
      <SideBar ref="sideBar" />
      <MainLayout />
    </template>
    <template v-else>
      <template v-if="state.layoutMode === 'ttb'">
        <VAWHeader />
      </template>
      <template v-else-if="state.layoutMode === 'lcr'">
        <TabSplitSideBar />
      </template>
      <template v-else>
        <SideBar ref="sideBar" />
      </template>
      <MainLayout :show-nav-bar="state.layoutMode !== 'ttb'" />
    </template>
    <div
      v-if="state.device === 'mobile'"
      class="mobile-shadow"
      :class="[state.isCollapse ? 'close-shadow' : 'show-shadow']"
      @click="closeMenu"
    ></div>
    <Setting ref="appSettingRef" />
  </div>
</template>

<script lang="ts">

import { useEmit } from "@/hooks";
import {NWatermark} from "naive-ui"
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import store from "./store";
import useUserStore from "@/store/modules/user";
import pinia from "@/store/pinia";
export default defineComponent({
  name: "Layout",
  components:{
    NWatermark
  },
  setup() {
    const emit = useEmit();
    const appSettingRef = ref();
    const localTime=ref()
    emit?.on("show_setting", () => {
      appSettingRef.value.openDrawer();
    });
    function handleScreenResize() {
      const width = document.body.clientWidth;
      if (width <= 768) {
        store.changeDevice("mobile");
        store.toggleCollapse(true);
      } else if (width < 992 && width > 768) {
        store.changeDevice("pad");
        store.toggleCollapse(true);
      } else if (width < 1200 && width >= 992) {
        store.changeDevice("pc");
        store.toggleCollapse(false);
      } else {
        store.changeDevice("pc");
        store.toggleCollapse(false);
      }
    }
    function closeMenu() {
      store.toggleCollapse(true);
    }
    function getTime(){
      let date=new Date()
      localTime.value=date.toLocaleDateString()
    }
    onMounted(() => {
      handleScreenResize();
      getTime()
      window.addEventListener("resize", handleScreenResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleScreenResize);
    });
    return {
      localTime,
      appSettingRef,
      state: store.state,
      userStore:useUserStore(pinia),
      closeMenu,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./styles/variables.scss";
.vaw-layout-container {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  .mobile-shadow {
    display: none;
  }
  .layout-mode-ttb {
    margin-top: $logoHeight;
    transition: all $transitionTime;
  }
}
.is-mobile {
  .mobile-shadow {
    background-color: #000000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 98;
  }
  .close-shadow {
    display: none;
  }
  .show-shadow {
    display: block;
    opacity: 0.5;
    transition: all $transitionTime;
  }
}
</style>
