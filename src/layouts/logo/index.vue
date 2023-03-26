<template>
  <div
      class="logo-wrapper"
      :style="{
      'height':state.layoutMode === 'ttb'?'':'$logoHeight',
      // 'border-bottom':
      //   state.layoutMode === 'ttb'
      //     ? 'none'
      //     : '1px dashed var(--el-border-color-light)',
    }"
  >

    <div class="logo-title" >
      <div class="logo_box">
        <img src="http://192.168.123.175:9854/fileILater/37ce5c403ff747e6a0d26cb382f217a5.svg" alt="">
      </div>
      <div class="character_title">
        <div v-show="!state.isCollapse || alwaysShow" >iLater</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "../store";
import {defineComponent, ref, watch} from "vue";
import {useSetting} from "@/hooks";
import useUserStore from "@/store/modules/user";
import pinia from "@/store/pinia";

export default defineComponent({
  name: "Logo",
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const setting = useSetting();
    const state = store.state;
    const userStore=useUserStore(pinia)
    const bgColor = ref(
        state.themeColor
    );
    const textColor = ref(
        state.theme === "light" ? "#001428" : "var(--el-color-white)"
    );
    watch(
        () => state.theme,
        (newVal) => {
          bgColor.value =state.themeColor
          textColor.value =
              state.theme === "light" ? "#001428" : "var(--el-color-white)";
        }
    );
    return {
      state,
      setting,
      bgColor,
      textColor,
      userStore
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind(bgColor);
  color: v-bind(textColor);
  height: $logoHeightLcr;
  .logo-img {
    width: 30px;
  }

  .logo_box{
    margin-bottom: 0px;
    img{
      width:40px;
      height: 40px;
    }
  }
  .logo-title {
    text-align: center;
    width: 80%;
    font-weight: bold;
    border-radius: 15px;
  }

  .character_title {
    position: relative;
    color: v-bind(textColor);
    font-size: 18px;
    font-weight: 600;
    z-index: 3;
    letter-spacing: 2px;
  }
  .character_bg{
    position: absolute;
    fill: var(--el-color-primary-light-1);
    top: 10px;
    left: 35px;
    z-index: 1;
  }
}

</style>
