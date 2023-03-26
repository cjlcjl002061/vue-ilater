<template>
  <el-scrollbar
      :class="[mMode === 'vertical' ? 'scrollbar' : '',state.layoutMode === 'ttb'?'isTtb':'']"
      wrap-class="scrollbar-wrap-class"
  >
    <!--    -->
    <el-menu
        :default-active="activePath"
        :mode="mMode"
        :collapse="state.isCollapse"
        active-text-color="var(--el-color-primary)"
        :text-color="state.theme === 'light' ? '#807e7e' : '#FFFFFF'"
        :background-color="bgColor"
        :class="[state.theme]"
        :style="{ height: mMode === 'vertical' ? '100%' : '48px' }"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
  watchEffect,
} from "vue";
import {useRoute} from "vue-router";
import store from "../../store";

export default defineComponent({
  name: "ScrollerMenu",
  props: {
    routes: {
      type: Array,
      require: true,
      default: () => {
        return [];
      },
    },
    fullPath: {
      type: String,
      default: null,
    },
    mode: {
      type: String,
      default: "vertical",
    },
  },
  setup: function (props) {
    const state = store.state;
    const route = useRoute();
    const bgColor = ref(
        state.themeColor
        /*state.theme === "light" ? "var(--el-color-white)" : "#001428"*/
    );
    const activePath = ref(route.fullPath);
    console.log(route);
    console.log(route.name);
    let rName:any=route.name;
    state.activePath = rName;
    state.activeFullPath = route.fullPath;
    const mMode = computed(() => {
      return props.mode;
    });
    watch(
        () => route.fullPath,
        () => {
          nextTick(() => {
            activePath.value = route.fullPath;
            let rName:any=route.name;
            state.activePath = rName;
            state.activeFullPath = route.fullPath;
          });
        }
    );
    watch(
        () => state.theme,
        (newVal) => {
          bgColor.value = state.themeColor
          /*   newVal === "light" ? "var(--el-color-white)" : "#001428";*/
        }
    );
    return {
      mMode,
      activePath,
      state,
      bgColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

:deep(.el-menu-item) {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2px;
}

:deep(.el-menu-item:hover) {
  background-color: transparent;
  color: var(--el-menu-hover-text-color) !important;
}

:deep(.el-sub-menu__title:hover) {
  background-color: transparent;
  color: var(--el-menu-hover-text-color) !important;
}

:deep {
  .el-menu {
    padding: 0px 4px;
  }

  .el-menu.el-menu--collapse {
    padding: 0px;
  }

  .el-menu--collapse .el-sub-menu.is-active {
    position: relative;
    z-index: 111;
  }

  .el-menu--collapse .el-sub-menu.is-active:before, .el-menu--collapse .el-menu-item.is-active:before{
    /*background-color: var(--el-menu-hover-bg-color);*/
    z-index: auto;
    content: "";
    position: absolute;
    left: 8px;
    right: 8px;
    top: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: 10px 10px 10px 10px;
    width: auto;
  }
  .el-menu--collapse .el-menu-item.is-active:before{
    top: 6px;
  }
  .el-menu--collapse.dark-side .el-sub-menu.is-active:before,.el-menu--collapse.dark-side .el-menu-item.is-active:before{
    background-color: #E1F5F2;
  }
  .el-menu--collapse.light .el-sub-menu.is-active:before,.el-menu--collapse.light .el-menu-item.is-active:before {
    background-color:#E1F5F2;
  }
  .el-menu--collapse.green .el-sub-menu.is-active:before,.el-menu--collapse.green .el-menu-item.is-active:before {
    background-color: #FFFFFF;
  }
  .el-menu--collapse .el-sub-menu.is-active {
    .el-sub-menu__title {
      background: transparent !important;
    }
  }

  .el-menu--collapse .el-sub-menu.is-active:hover {
    .el-sub-menu__title {
      background: transparent !important;
    }
  }

  //.el-menu--collapse .el-sub-menu.is-active:after {
  //  background-color: var(--el-color-primary);
  //  z-index: auto;
  //  content: "";
  //  position: absolute;
  //  height: 100%;
  //  width: 4px;
  //  left: 8px;
  //  top: 0;
  //  bottom: 0;
  //  pointer-events: none;
  //  border-radius: 8px 8px 8px 8px;
  //}
}

:deep(.el-menu .el-menu-item) {
  height: $menuItemHeight;
  line-height: $menuItemHeight;
  font-size: 15px;
  letter-spacing: 1.2px;
  display: flex;
  align-items: center;
}

:deep(.el-sub-menu .el-menu-item) {
  height: 45px;
  line-height: 0;
}

:deep {
  .el-sub-menu {
    margin-bottom: 2px;
  }

  .el-sub-menu .el-sub-menu__title {
    height: $menuItemHeight;
    line-height: $menuItemHeight;
  }

  .el-sub-menu .el-sub-menu__title span {
    font-size: 15px;
    letter-spacing: 1.2px;
  }

  //.el-menu-item.is-active {
  //  font-weight: 600;
  //}

  .el-menu-item.is-active {
    background-color: transparent !important;
  }

  .el-menu-item.is-active:before {
    //background-color: #FFFFFF;
    z-index: auto;
    content: "";
    position: absolute;
    height: $menuHeight;
    left: 4px;
    right: 8px;
    top: 8px;
    bottom: 0;
    pointer-events: none;
    border-radius:10px;
    width: 96%;
    /*    transition: background-color .3s var(--n-bezier);*/
  }
  .el-sub-menu.is-active .el-menu .el-menu-item.is-active:before{
     top: 0px;
  }

  .green .el-menu-item  span{
    color: #FFFFFF;
    z-index: 2;
    height: $menuHeight;
    line-height: $menuHeight;
  }

  .green .el-menu-item:hover {
    color: #FFFFFF;
    & span {
      color: #FFFFFF;
      z-index: 2;
      height: $menuHeight;
      /*line-height: $menuHeight - 6;*/
    }
  }

  .green .el-menu-item i.cjl-icon{
    height: $menuHeight;
    display: flex;
    align-items: center;
  }
  .green .el-menu-item.is-active:before {
    background-color: #FFFFFF;
  }

  .green .el-menu-item.is-active:hover {
    background-color: #FFFFFF;

    & span {
      color: #01B786 !important;
      z-index: 2;
      height: $menuHeight;
      line-height: $menuHeight;
    }
  }

  .green .el-menu-item.is-active span {
    color: #01B786 !important;
    z-index: 2;
    height: $menuHeight;
    line-height: $menuHeight;
  }

  .green .el-menu-item.is-active i {
    color: #01B786 !important;
    z-index: 2;
  }
  //二级菜单

  .green .el-sub-menu .el-sub-menu__title span ,
  .green .el-sub-menu .el-sub-menu__title .el-sub-menu__icon-arrow{
    color: #FFFFFF;
  }

  //白色菜单样式
  .light .el-menu-item  span{
    color: #596A74;
    z-index: 2;
    height: $menuHeight;
    line-height: $menuHeight;
  }

  .light .el-menu-item:hover {
    color: #596A74;
    & span {
      color: #596A74;
      z-index: 2;
      height: $menuHeight;
      /*line-height: $menuHeight - 6;*/
    }
  }

  .light .el-menu-item i.cjl-icon{
    height: $menuHeight;
    display: flex;
    align-items: center;
  }
  .light .el-menu-item.is-active:before {
    background-color: #E1F5F2;
  }

  .light .el-menu-item.is-active:hover {
    background-color: #E1F5F2;

    & span {
      color: #01B786 !important;
      z-index: 2;
      height: $menuHeight;
      line-height: $menuHeight;
    }
  }

  .light .el-menu-item.is-active span {
    color: #01B786 !important;
    z-index: 2;
    height: $menuHeight;
    line-height: $menuHeight;
  }

  .light .el-menu-item.is-active i {
    color: #01B786 !important;
    z-index: 2;
  }


  .light .el-sub-menu .el-sub-menu__title span ,
  .light .el-sub-menu .el-sub-menu__title .el-sub-menu__icon-arrow{
    color: #596A74;
  }

  //黑色菜单样式
  .dark-side .el-menu-item  span{
    color: #F7FAFA;
    z-index: 2;
    height: $menuHeight;
    line-height: $menuHeight;
  }

  .dark-side .el-menu-item:hover {
    color: #F7FAFA;
    & span {
      color: #F7FAFA;
      z-index: 2;
      height: $menuHeight;
      /*line-height: $menuHeight - 6;*/
    }
  }

  .dark-side .el-menu-item i.cjl-icon{
    height: $menuHeight;
    display: flex;
    align-items: center;
  }
  .dark-side .el-menu-item.is-active:before {
    background-color:#01B786;
  }

  .dark-side .el-menu-item.is-active:hover {
    background-color: #01B786;

    & span {
      color: #FFFFFF !important;
      z-index: 2;
      height: $menuHeight;
      line-height: $menuHeight;
    }
  }

  .dark-side .el-menu-item.is-active span {
    color: #FFFFFF !important;
    z-index: 2;
    height: $menuHeight;
    line-height: $menuHeight;
  }

  .dark-side .el-menu-item.is-active i {
    color: #FFFFFF !important;
    z-index: 2;
  }
  .dark-side .el-sub-menu .el-sub-menu__title span ,
  .dark-side .el-sub-menu .el-sub-menu__title .el-sub-menu__icon-arrow{
    color: #F7FAFA;
  }

  .el-menu-item.is-active:after {
    /*background-color: var(--el-color-primary);
    z-index: auto;
    content: "";
    position: absolute;
    height: $menuHeight;
    width: 4px;
    left: 4px;
    top: 4px;
    bottom: 0;
    pointer-events: none;
    border-radius: 8px 8px 8px 8px;*/
  }

  .el-menu-item [class^="el-icon"] {
    margin-right: 12px;
    font-size: 20px;
  }

  .el-sub-menu .el-icon {
    margin-right: 12px;
    font-size: 20px;
  }

  .el-sub-menu .el-sub-menu__icon-arrow {
    margin-right: 0px;
    font-size: 18px;
    margin-top: -9px;
  }

  //水平菜单的样式
  .el-menu--horizontal .el-menu-item.is-active:before {
    background-color: transparent !important;
    z-index: auto;
    content: "";
    position: absolute;
    left: 8px;
    right: 8px;
    top: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: 0px 4px 4px 0px;
    /*    transition: background-color .3s var(--n-bezier);*/
  }

  .el-menu--horizontal .el-sub-menu .el-sub-menu__icon-arrow {
    margin-right: 0px;
    font-size: 16px;
    margin-top: 2px;
  }

  .el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
    border-bottom: 0px solid var(--el-menu-active-color);
    position: relative;

    span {
      font-size: 16px;
    }

  }


  .el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title:after {
    background-color: var(--el-menu-active-color) !important;
    z-index: auto;
    content: "";
    position: absolute;
    height: 2px;
    width: calc(100% - var(--el-menu-base-level-padding) - var(--el-menu-base-level-padding));
    left: var(--el-menu-base-level-padding);
    bottom: 0;
    top: unset;
    pointer-events: none;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 0px solid var(--el-menu-active-color);
    position: relative;
    font-size: 16px;
  }

  .el-menu--horizontal > .el-menu-item.is-active:after {
    background-color: var(--el-menu-active-color) !important;
    z-index: auto;
    content: "";
    position: absolute;
    height: 2px;
    width: calc(100% - var(--el-menu-base-level-padding) - var(--el-menu-base-level-padding));
    left: var(--el-menu-base-level-padding);
    bottom: 0;
    top: unset;
    pointer-events: none;
  }

  .el-menu--horizontal .el-menu-item {
    font-size: 16px;
    font-weight: 600;
  }

  .el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
    span {
      font-size: 16px;
      font-weight: 600;
    }

  }

  .el-menu--collapse .el-menu-item {
    padding: 0px 20px;
    margin-bottom: 10px;
  }

  .el-menu--collapse .el-menu-item .el-tooltip__trigger {
    padding: 0px;
    left: 30%;
    width: auto;

    .el-icon {
      font-size: 28px;
    }
  }

  .el-menu--collapse .el-sub-menu {
    height: $menuHeight;
    margin-bottom: 10px;
    position: relative;
  }

  .el-menu--collapse .el-sub-menu .el-tooltip__trigger {
    padding: 0px 20px 0px 0px;
    left: 30%;
    position: absolute;
    top: 0;
    height: $menuHeight;
    width: auto;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;

    .el-icon {
      font-size: 28px;
    }
  }

}

.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
  background-color: v-bind(bgColor);
  padding-top: 26px;
}

.scrollbar-wrap-class {
  overflow-x: hidden !important;
}


</style>
