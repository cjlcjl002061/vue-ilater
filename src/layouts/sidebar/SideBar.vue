<template>
  <div class="vaw-side-bar-wrapper" :class="[!state.isCollapse ? 'open-status' : 'close-status']">
    <div class="sub-side-bar" :class="[state.theme]">
      <transition name="logo">
        <Logo v-if="showLogo"/>
      </transition>
      <ScrollerMenu
          class="lcr_s_d">
        <template #default>
          <SideBarItem
              v-for="item of routes"
              :key="item.path"
              :full-path="item.path"
              :item="item"
          />
        </template>
      </ScrollerMenu>

      <!-- 底部折叠区   -->
      <div class="footer_bix_vid">
<!--        <div class="flode-div-box" :class="state.theme" @click="toggleFold">
          <el-icon
              class="fold-wrapper"
              :class="[state.isCollapse ? 'fold-close-status' : 'fold-open-status']"

          >
            <Fold/>
          </el-icon>
        </div>-->
      </div>

      <div class="mobile-shadow"></div>

      <div class="b-clor">

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import store from "../store";
import useUserStore from "@/store/modules/user";
import {defineComponent, computed, ref, watch} from "vue";
import {ElMessageBox} from "element-plus";
import layoutStore from "@/layouts/store";

export default defineComponent({
  name: "SideBar",
  props: {
    showLogo: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const useStore = useUserStore();
    const state = store.state;
    const routes = computed(() => {
      return state.permissionRoutes.filter((it) => !!it.name);
    });

    const bgColor = ref(
        state.themeColor
    );
    const bColor = ref(
        state.theme === "light" ? "var(--el-menu-active-color)" : "var(--el-color-white)"
    )

    function toggleFold() {
      console.log(store.state.isCollapse);
      store.toggleCollapse(!store.state.isCollapse)
    }

    function onLogout() {
      ElMessageBox({
        title: "提示",
        message: "是否要退出登录？",
        type: "warning",
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        showCancelButton: true,
      }).then(() => {
        useStore.logout().then(() => {
          (layoutStore as any).onLogout && (layoutStore as any).onLogout();
        });
      });
    }

    watch(
        () => state.theme,
        (newVal) => {
          bgColor.value =state.themeColor;
          bColor.value =
              newVal === "light" ? "#001428" : "var(--el-color-white)"
        }
    );
    return {
      state,
      routes,
      bgColor,
      bColor,
      useStore,
      toggleFold,
      onLogout
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

.lcr_s_d {

  background-color: v-bind(bgColor);
}

.lcr_s_b {
  height: $bottomBb;
  background-color: v-bind(bgColor);
  display: flex;
  padding: 0px;
  flex-direction: column;
  /*color: var(--el-menu-text-color) !important;*/
  align-items: center;
  border-top: 1px dashed var(--el-border-color-light);
}

.line_ppo {
  height: 2px;
  background: linear-gradient(270deg, #FFFFFF 0%, #C8D6EC 52%, #FFFFFF 100%);
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  padding: 0px !important;
  margin-top: 20px;
  width: 55%;
}

.user_info_box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;

  .user_info_sub_p {
    padding-left: 10px;

    .user_name {
      font-size: 14px;
      font-weight: 600;
      color: v-bind(bColor) !important;
    }

    .user_dep {
      color: #b9b9b9;
    }
  }

  p {
    margin: 0px;
  }
}

.logout_box {
  height: 38px;
  margin-top: 16px;

  .item_box {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;

    .n_icon_b {
      color: v-bind(bColor);
      font-size: 18px;
    }

    span {
      height: 100%;
      padding-left: 10px;
      font-size: 14px;
      color: v-bind(bColor);
    }
  }

  .item_box:hover {
    cursor: pointer;
    //color: ;
    span {
      color: var(--el-color-primary-light-1) !important;
    }

    .n_icon_b {
      color: var(--el-color-primary-light-1) !important;
    }

  }

}

.user_logo_box {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px #77b9f2;

  .u_logo_b_p {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}

.u_logo_p_o {
  width: 40px;
  height: 40px;
  background: #a7d1f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;


}

.open-status {
  width: $menuWidth;
  box-shadow: 0px 1px 3px 0 rgb(0 0 0 /.1);
  transition: all $transitionTime;
}

.close-status {
  width: $minMenuWidth;
  box-shadow: none;
  transition: all $transitionTime;
}

.vaw-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  z-index: 99;
  /*border-right: 1px #eee solid;*/
  background: #FFFFFF;
  border-radius: 0px 0px 32px 0px;
  .sub-side-bar{
    height: 100%;
    overflow-x: hidden;
    box-shadow: 4px 3px 6px 1px #E1E9F0;
    border-radius: 0px 32px 32px 0px;
    width: calc(100% - 4px);
  }

  .vaw-menu-wrapper {
    overflow-x: hidden;
    color: white;
  }



  .scrollbar {
    height: calc(100% - #{$logoHeightLcr} - #{$leftMenuFooter}) !important;
    padding-top: 26px;
  }
}

.footer_bix_vid {
  height: $leftMenuFooter;
  background-color: v-bind(bgColor);
  color: v-bind(textColor);
  border-top: 1px dashed v-bind(bgColor);

  .flode-div-box {
    width: 80%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #DEEAFC;
    margin: 10px auto 0px;
    border-radius: 6px 6px 6px 6px;

    .fold-open-status {
      transform: rotate(180deg);
    }

    .fold-close-status {
      transform: rotate(0);
    }
  }

  .flode-div-box:hover {
    cursor: pointer;
  }
}
.open-status {
  box-shadow: none;
}

.is-mobile {
  .open-status {
    width: $menuWidth;
    transform: translateX(0);
    transition: transform $transitionTime;

  }

  .close-status {
    width: $menuWidth;
    transform: translateX(-$menuWidth);
    transition: transform $transitionTime;
    box-shadow: none;
  }
}
</style>
<style lang="scss">
@import "../styles/variables.scss";
/*dark-side   light  green*/
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}

.el-menu {
  --el-menu-hover-text-color: var(--el-color-primary) !important;
  --el-menu-hover-bg-color: var(--el-color-primary-light-9) !important;
  border-right: none !important;
  overflow: hidden;
}

.el-menu-item:hover {
 /* color: var(--el-menu-active-color);
  background-color: transparent;*/
}

.el-menu-item.is-active {
  /*color: var(--el-menu-active-color);
  background-color: var(--el-color-primary-light-8);*/
}
//.green .el-menu-item.is-active {
//  color: #01B786;
//  background-color:#FFFFFF;
//}

.el-sub-menu.is-active .el-sub-menu__title {
/*  color: var(--el-menu-active-color) !important;*/
}

::deep(.el-menu--collapse .el-sub-menu__title span) {
  display: none !important;
}

::deep(.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow) {
  display: none !important;
}
</style>
