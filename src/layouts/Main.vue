<template>
  <div class="router_box" :style="{'height':bodyH+'px'}">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component
            :is="Component"
            :key="$route.fullPath"
            v-if="state.isRouterAlive"
            class="ttr"
        />
      </keep-alive>
    </router-view>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, onUpdated, ref, watch} from "vue";
import { useRoute } from "vue-router";
import store from "./store";
import $ from 'jquery'
import {onMounted} from "@vue/runtime-core";
export default defineComponent({
  name: "Main",
  setup() {
    const state = store.state;
    const route = useRoute();
    const routeKey = ref(route.fullPath);
    const cachedViews = computed(() => {
      // console.log("this is state.cachedView: ",state.cachedView)
      return state.cachedView.map((it) => it);
    });

    const bcH=ref();
    const bodyHe:any=ref(
        $("body #app .main-section").height()
    )
    const bodyH=ref();
    onMounted(()=>{
      let domeBody:any=document.querySelector("body #app .main-base-style");
      console.log(domeBody);
      console.log(domeBody.clientHeight)
      bodyH.value=domeBody.clientHeight-15
      console.log(bodyH.value);
    })

    watch(
      () => route.fullPath,
      () => {
        routeKey.value = route.fullPath;
      }
    );
    return {
      state,
      cachedViews,
      routeKey,
      bodyH
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep{
  .main-section .router_box {
    height: 100% !important;
  }
}

</style>
