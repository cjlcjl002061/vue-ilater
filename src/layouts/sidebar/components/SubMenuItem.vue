<template>
  <el-sub-menu
    :index="generatorPath(item.path)"
  >
    <template #title>
<!--      <el-icon >-->
<!--        <img :src="item.meta ? materialsBaseUrl+'/fileILater/'+item.meta.icon :''" class="cjl-icon">-->
<!--      </el-icon>-->

      <el-icon class="cjl-icon" :a-ii="state.activeFullPath" :dItem="JSON.stringify(item)" >
<!--        <img
            v-if="state.theme=='green'"
            :src="state.activeFullPath.toLowerCase().indexOf(item.name.toLowerCase())>0?item.meta ? materialsBaseUrl+'/fileILater/'+item.meta.iconActive:'':item.meta ? materialsBaseUrl+'/fileILater/'+item.meta.icon:''" />
        -->
        <img
            v-if="state.theme=='dark-side'"
            :src="state.activeFullPath.toLowerCase().indexOf(item.name.toLowerCase())>0?item.meta ? materialsBaseUrl+'/fileILater/'+item.meta.iconAActive:'':item.meta ? materialsBaseUrl+'/fileILater/'+item.meta.iconA:''" />
        <img
            v-if="state.theme=='light'"
            :src="state.activeFullPath.toLowerCase().indexOf(item.name.toLowerCase())>0?item.meta ? materialsBaseUrl+'/fileILater/'+item.meta.iconBActive:'':item.meta ? materialsBaseUrl+'/fileILater/'+item.meta.iconB:''" />
      </el-icon>
      <span>{{ item.meta ? item.meta.title : item.name }}</span>
    </template>
    <slot></slot>
  </el-sub-menu>
</template>

<script lang="ts">
import { isExternal } from "../../utils";
// @ts-ignore
import path from "path";
import store from "../../store";
import { defineComponent } from "vue";
import { Operation as MenuIcon } from "@element-plus/icons";
const {materialsBaseUrl} = require('@/api/url')
export default defineComponent({
  name: "SubMenuItem",
  components: { MenuIcon },
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
  },
  setup(props) {
    function generatorPath(childPath: string) {
      if (isExternal(props.fullPath)) {
        return props.fullPath;
      }
      if (isExternal(childPath)) {
        return childPath;
      }
      return path.resolve(props.fullPath, props.item.path);
    }
    return {
      state: store.state,
      generatorPath,
      MenuIcon,
      materialsBaseUrl
    };
  },
});
</script>