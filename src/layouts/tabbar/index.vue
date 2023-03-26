<template>
  <div class="vaw-tab-bar-container">
    <!-- 自定义左右箭头   -->
    <div class="is_left_i">
      <el-icon class="is_left_i_icon" @click="isLeftC">
        <img :src="toLeft"/>
      </el-icon>
    </div>
    <div class="is_right_i">
      <el-icon class="is_right_i_icon" @click="isRightC">
        <img :src="toRight"/>
      </el-icon>
    </div>
    <el-tabs
        id="tagViewTab"
        class="tagViewTabClass"
        ref="domRef"
        v-model="currentTab"
        type="card"
        @tab-click="clickTab"
        @tab-remove="removeTab"
        @contextmenu.prevent="onContextMenu(currentTab, $event)"
    >
      <el-tab-pane
          v-for="item of state.visitedView"
          :key="item.path"
          :label="item.meta ? item.meta.title : item.name"
          :name="item.fullPath"
          :closable="!isAffix(item)"
      >
        <template #label>
          <span style="display: inline-block;height: 100%">
            <div style="display: flex;align-items: center;flex-direction: row">
<!--               <el-icon style="font-size: 16px">
                 <img :src="item.meta.icon ? materialsBaseUrl+'/fileILater/'+item.meta.icon:''">
              </el-icon>-->
               <span class="tabbar_span"
                     style="font-size: 15px;margin-left: 5px">{{ item.meta ? item.meta.title : item.name }}</span>
            </div>
          </span>

        </template>
      </el-tab-pane>
    </el-tabs>
    <ul
        v-show="showContextMenu"
        class="contex-menu-wrapper"
        :style="contextMenuStyle"
    >
      <li>
        <el-button
            icon="RefreshIcon"
            :underline="false"
            link
            @click="refreshRoute"
        >刷新页面
        </el-button>
      </li>
      <li :disabled="showLeftMenu">
        <el-button
            :disabled="showLeftMenu"
            icon="BackIcon"
            link
            @click="closeLeft"
        >关闭左侧
        </el-button>
      </li>
      <li :disabled="showRightMenu">
        <el-button
            :disabled="showRightMenu"
            icon="RightIcon"
            link
            @click="closeRight"
        >关闭右侧
        </el-button>
      </li>
      <li>
        <el-button
            icon="CircleCloseIcon"
            link
            @click="closeAll"
        >关闭所有
        </el-button>
      </li>
    </ul>
    <!--更多按钮-->
    <!--    <el-dropdown @command="handleCommand" class="cjl-el-d">
                <span class="el-dropdown-link">
                  <SvgIcon icon-class="menu"></SvgIcon>
                </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a" @click="refreshRoute">
                <SvgIcon icon-class="sync" style="margin-right: 5px;font-size: 16px"></SvgIcon>
                刷新页面
              </el-dropdown-item>
              <el-dropdown-item command="b" @click="closeAll">
                <SvgIcon icon-class="close-circle" style="margin-right: 5px;font-size: 16px"></SvgIcon>
                关闭所有
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>-->
  </div>
</template>

<script>
import store from "../store";
import path from "path";
import qs from "qs";
import {onMounted, ref} from "vue";
import  toLeft from "@/assets/l-to.svg";
import  toRight from "@/assets/r-to.svg";
import {nextTick} from "@vue/runtime-core";
const {materialsBaseUrl} = require('@/api/url')
export default {
  name: "TabBar",
  data() {
    return {
      currentTab: this.$route.fullPath,
      contextMenuStyle: {
        left: 0,
        top: 0
      },
      showContextMenu: false,
      selectRoute: null,
      showLeftMenu: true,
      showRightMenu: true,
      state: store.state,
      materialsBaseUrl: materialsBaseUrl,
      toLeft:toLeft,
      toRight:toRight
    };
  },
  watch: {
    $route(newVal) {

      if (["404", "500", "403", "not-found", "Login"].includes(newVal.name) || newVal.path === "/404") {
        this.currentTab = "";
        return;
      }
      if (newVal.path.startsWith("/redirect")) {
        return;
      }
      if (newVal.meta.noShowTabbar) {
        this.currentTab = "";
        return;
      }
      store.addVisitedView(newVal).then((route) => {
        this.currentTab = route.fullPath;
      });
    },
    showContextMenu(val) {
      if (val) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.initRoute();
    // console.log(this.$refs.domRef);
  },
  methods: {
    initRoute() {
      const affixedRoutes = this.findAffixedRoutes(
          this.state.permissionRoutes,
          "/"
      );
      affixedRoutes.forEach((it) => {
        store.addVisitedView(it);
      });
      if (
          ["404", "500", "403", "not-found", "Login"].includes(this.$route.name)
      ) {
        this.currentTab = "";
        return;
      }
      if (this.$route.meta.noShowTabbar) {
        this.currentTab = "";
        return;
      }
      store.addVisitedView(this.$route).then((route) => {
        this.currentTab = route.fullPath;
      });
    },
    findAffixedRoutes(routes, basePath) {
      const temp = [];
      routes.forEach((it) => {
        if (!it.hidden && it.meta && it.meta.affix) {
          temp.push({
            name: it.name,
            fullPath: path.resolve(basePath, it.path),
            path: it.path,
            meta: it.meta
          });
        }
        if (it.children && it.children.length > 0) {
          temp.push(
              ...this.findAffixedRoutes(
                  it.children,
                  path.resolve(basePath, it.path)
              )
          );
        }
      });
      return temp;
    },
    isAffix(route) {
      return route.meta && route.meta.affix;
    },
    onContextMenu(item, ctx) {
      console.log(3333);
      const {clientX} = ctx;
      const {x} = this.$el.getBoundingClientRect();
      const parentElementRect = document
          .getElementById("tagViewTab")
          .getElementsByClassName("el-tabs__nav is-top")[0]
          .getBoundingClientRect();
      if (clientX < parentElementRect.x) {
        return;
      }
      if (clientX > parentElementRect.x + parentElementRect.width) {
        return;
      }
      this.selectRoute = null;
      this.selectRoute = this.state.visitedView.find((it) => {
        const {x, width} = document
            .getElementById("tab-" + it.fullPath)
            .getBoundingClientRect();
        if (x < clientX && clientX < x + width) {
          return it;
        }
      });
      if (this.selectRoute) {
        this.showLeftMenu = this.isLeftLast(this.selectRoute);
        this.showRightMenu = this.isRightLast(this.selectRoute);
        const screenWidth = document.body.clientWidth;
        this.contextMenuStyle.left =
            (clientX + 130 > screenWidth
                ? clientX - 130 - x - 15
                : clientX - x + 15) + "px";
        this.contextMenuStyle.top = "15px";
        this.showContextMenu = true;
      }
    },
    clickTab(route) {
      const query = route.props.name.split("?")[1];
      this.$router.push({path: route.props.name, query: qs.parse(query)});
    },
    removeTab(name) {
      const findItem = this.state.visitedView.find(
          (it) => it.fullPath === name
      );
      if (findItem) {
        store.removeVisitedView(findItem).then((_) => {
          if (this.currentTab === name) {
            this.currentTab =
                this.state.visitedView[
                this.state.visitedView.length - 1
                    ].fullPath;
            this.$router.push(this.currentTab);
          }
        });
      }
    },
    // context menu actions
    isLeftLast(tempRoute) {
      console.log(1);
      return this.state.visitedView.indexOf(tempRoute) === 0;
    },
    isRightLast(tempRoute) {
      console.log(2);
      return (
          this.state.visitedView.indexOf(tempRoute) ===
          this.state.visitedView.length - 1
      );
    },
    refreshRoute() {
      // this.$router.replace({path: "/redirect" + this.$route.path});
      store.removeCachedView(this.$route);
      store.hidden();
      nextTick(() => {
        store.addCachedView(this.$route)
        store.display()
      })
    },
    closeLeft() {
      store.closeLeftVisitedView(this.selectRoute).then((_) => {
        if (this.$route.fullPath !== this.selectRoute.fullPath) {
          this.$router.push(
              this.state.visitedView[this.state.visitedView.length - 1].fullPath
          );
        }
      });
    },
    closeRight() {
      store.closeRightVisitedView(this.selectRoute).then((_) => {
        if (this.$route.fullPath !== this.selectRoute.fullPath) {
          this.$router.push(
              this.state.visitedView[this.state.visitedView.length - 1].fullPath
          );
        }
      });
    },
    closeAll() {
      store.closeAllVisitedView(this.selectRoute).then((_) => {
        this.$router.push(
            this.state.visitedView[this.state.visitedView.length - 1].fullPath
        );
      });
    },
    closeMenu() {
      this.showContextMenu = false;
    },
    handleCommand(command) {
      console.log(command);
      /*const sc = ref(null);
      console.log(sc);*/
      // console.log(this.$refs.domRef);
    },
    isLeftC() {
      let that = this;
      const btn = document.querySelector('.is-scrollable.is-top .el-tabs__nav-prev');
      if (btn) {
        btn.addEventListener("click", function (e) {
          /* console.log("simulate event");*/
        }, false);
        let event = document.createEvent("MouseEvents");
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        btn.dispatchEvent(event)
      }

    },
    isRightC() {
      let that = this;
      const btn = document.querySelector('.is-scrollable.is-top .el-tabs__nav-next');

      if (btn) {
        let fn = function () {
          console.log(0);
        };
        btn.removeEventListener('click', function (e) {
          console.log(e);
        }, false);
        btn.addEventListener("click", function (e) {
          /* console.log(e);
           console.log(e.target.className);

           if(e.target.className.indexOf("is-disabled")>0){
             ElMessage.error('已滑动到最后一个菜单！')
           }*/

        }, false);
        let event = document.createEvent("MouseEvents");
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        btn.dispatchEvent(event)
      }


    }
  },
  /* setup() {

     const domRef = ref(null)
     onMounted(() => {
       console.log(domRef)
     })
     return {
       domRef
     }
   }*/

};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.tagViewTabClass {
  /* border-top: 1px solid #F1F5FA;
   border-bottom: 1px solid #F1F5FA;*/
}

.vaw-tab-bar-container {
  /*  position: relative;*/
  height: $tabHeight;
  line-height: $tabHeight;
  box-sizing: border-box;
  white-space: nowrap;
  background-color: transparent;
  /* box-shadow: 0px 2px 10px #DDDDDD3B;*/

  #tagViewTab {
    padding-right: 40px;
    padding-left: 20px;
  }

  .is_left_i {
    position: absolute;
    left: 40px;
    top: 13px;

    .el-icon {
      width: 18px;
      height: 18px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .is_left_i_icon:hover {
    cursor: pointer;
  }

  .is_right_i {
    position: absolute;
    right: 265px;
    top: 13px;

    .el-icon {
      width: 18px;
      height: 18px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .is_right_i_icon{
    margin-top: 8px;
  }
  .is_right_i_icon:hover {
    cursor: pointer;
  }

  .contex-menu-wrapper {
    position: absolute;
    width: 130px;
    z-index: 999;
    list-style: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: white;
    padding-left: 0;

    & > li {
      width: 100%;
      line-height: 40px;
      padding-left: 15px;
      box-sizing: border-box;
    }

    & > li:hover {
      background-color: #f5f5f5;
    }
  }

  .humburger-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    :deep {
      .fold-wrapper {
        margin-top: calc(50% - 10px);
      }
    }
  }

  .tab-humburger-wrapper {
    margin-left: 40px;
    transition: margin-left $transitionTime;
  }

  .tab-no-humburger-wrapper {
    margin-left: 0;
    transition: margin-left $transitionTime;
  }
}

:deep {
  .el-tabs--card > .el-tabs__header {
    border: none;
    margin: 0;
    padding: 0 6px 0px 10px;

    .el-tabs__nav-next, .el-tabs__nav-prev {
      line-height: 44px;
      font-size: 24px;
      color: #000;
      font-weight: 800;
      display: none;
    }

    .is-scrollable {
      padding: 0px 8px;
    }

    .el-tabs__nav {
      border: none !important;
    }

    .el-tabs__item {
      height: calc(#{$tabHeight} - 0px);
      line-height: calc(#{$tabHeight} - 0px);
      border-radius: 8px;
      font-size: 12px;
      border: 0px solid var(--el-border-color-light);
      /*background-color: var(--el-color-white);*/
      font-weight: normal;
      background-color: #F2F2F2;
      color: #596A74;
      //color: var(--el-color-primary-light-1);
    }

    .el-tabs__item:hover {
      border: 0px solid var(--el-color-primary-light-8);
      background-color: var(--el-color-primary-light-8);
    }

    .el-tabs__item.is-active {
      /*color: var(--el-color-white);
      border: 1px solid var(--el-color-primary) !important;
      background-color: var(--el-color-primary);*/

      color: var(--el-color-white);
      border: 0px solid var(--el-color-primary) !important;
      background-color: var(--el-color-primary);
    }

    // .el-tabs__item.is-active::before {
    //   content: "";
    //   width: 7px;
    //   height: 7px;
    //   display: inline-block;
    //   background-color: var(--el-color-white);
    //   border: 1px solid var(--el-color-primary-light-6);
    //   border-radius: 50%;
    //   margin-right: 5px;
    // }
    .el-tabs__item:hover {
      border: 0px solid var(--el-color-primary) !important;
    }
  }

  .el-tabs__item + .el-tabs__item {
    margin-left: 10px;

  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable .is-icon-close {
    width: 14px;
    top: -4px;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

.cjl-el-d {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 20px;
  font-weight: 600;
}

.cjl-el-d:hover {
  cursor: pointer;
}
</style>
