<template>
  <el-menu-item :index="generatorPath()" @click="handleClick">
    <!-- <SvgIcon :icon-class="showRoute.meta ? showRoute.meta.icon || 'el-icon-menu' : 'el-icon-menu'" /> -->
    <el-icon class="cjl-icon"  :a-ii="state.activePath" :dItem="JSON.stringify(showRoute.meta)" v-if="showRoute.meta.icon">
<!--      <img

          v-if="state.theme=='green'"
          :src="state.activePath==showRoute.name?showRoute.meta ? materialsBaseUrl+'/fileILater/'+showRoute.meta.iconActive:'':showRoute.meta ? materialsBaseUrl+'/fileILater/'+showRoute.meta.icon:''" />
     -->
      <img
          v-if="state.theme=='dark-side'"
          :src="state.activePath==showRoute.name?showRoute.meta ? materialsBaseUrl+'/fileILater/'+showRoute.meta.iconAActive:'':showRoute.meta ? materialsBaseUrl+'/fileILater/'+showRoute.meta.iconA:''" />
      <img
          v-if="state.theme=='light'"
          :src="state.activePath==showRoute.name?showRoute.meta ? materialsBaseUrl+'/fileILater/'+showRoute.meta.iconBActive:'':showRoute.meta ? materialsBaseUrl+'/fileILater/'+showRoute.meta.iconB:''" />
    </el-icon>
    <template #title>
      <span :a-ii="state.activePath" >{{ showRoute.meta ? showRoute.meta.title : showRoute.name }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import {isExternal} from "../../utils";
// @ts-ignore
import path from "path";
import {defineComponent} from "vue";
import {useRouter, useRoute} from "vue-router";
import {Operation as OperationIcon} from "@element-plus/icons";
import store from "@/layouts/store";

const {materialsBaseUrl} = require('@/api/url')
export default defineComponent({
  name: "MenuItem",
  props: {
    fullPath: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    showRoute: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const state = store.state;

    function generatorPath() {
      if (isExternal(props.fullPath)) {
        return props.fullPath;
      }
      if (isExternal(props.showRoute.path)) {
        return props.showRoute.path;
      }
      return path.resolve(props.fullPath, props.showRoute.path);
    }

    function handleClick() {
      if (isExternal(props.showRoute.path)) {
        window.open(props.showRoute.path);
      } else if (isExternal(props.fullPath)) {
        window.open(props.fullPath);
      } else if (
          route.path !== path.resolve(props.fullPath, props.showRoute.path)
      ) {
        router.push({
          path: path.resolve(props.fullPath, props.showRoute.path),
        });
      }
    }

    return {
      generatorPath,
      handleClick,
      OperationIcon,
      materialsBaseUrl,
      state
    };
  },
});
</script>
