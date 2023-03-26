<template>
  <div class="icon_box_thr">
    <div class="div__icon_one div__icon_">
      <p class="p_tips_O">从左到右，分别是左侧菜单：“黑”，“白”背景下默认菜单图标</p>
      <div class="div__icon" :style="{'background':select2?select2.bcolor:'#eee'}">
        <img class="b_icon __icon" :src="materialsBaseUrl+'/fileILater/'+Icon_2" @click="selectIcon(2)"/>
      </div>
      <div class="div__icon" :style="{'background':select3?select3.bcolor:'#eee'}">
        <img class="c_icon __icon" :src="materialsBaseUrl+'/fileILater/'+Icon_3" @click="selectIcon(3)"/>
      </div>
    </div>
    <div class="div__icon_Tow div__icon_">
      <p class="p_tips_O">从左到右，分别是左侧菜单：“黑”，“白”背景下选中菜单图标</p>
      <div class="div__icon" :style="{'background':select5?select5.bcolor:'#eee'}">
        <img class="b_icon __icon" :src="materialsBaseUrl+'/fileILater/'+Icon_5" @click="selectIcon(5)"/>
      </div>
      <div class="div__icon" :style="{'background':select6?select6.bcolor:'#eee'}">
        <img class="c_icon __icon" :src="materialsBaseUrl+'/fileILater/'+Icon_6" @click="selectIcon(6)"/>
      </div>
    </div>





  </div>
  <el-dialog v-model="centerDialogVisible" title="请选择您需要的图标" width="80%" center>
    <div class="icon_select_box">
      <div class="img_box_ffo" v-for="(item,index) in fileListInfos" :key="index" :style="{'background':item.bcolor}">
        <div class="img_sub_ffo">
          <img class="file_img icon_select"
               :key="index"
               :src="materialsBaseUrl+'/fileILater/'+item.url"
               @click="selectIconSvg(item)">
        </div>

      </div>

    </div>
    <template #footer>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: "IconSvgSelect"
}
</script>
<script lang="ts" setup>
import { ref, unref, watch } from "vue";
import {onMounted} from "@vue/runtime-core";
import {post} from "@/api/http";
import {getAllMaterialsUrl} from "@/api/url";

const {materialsBaseUrl} = require('@/api/url')
const emit = defineEmits([ "SelectTow","SelectThr", "Select5f","Select6f","update:value"]);
const props = defineProps({
  iconA: {
    type: String,
    default: "",
  },
  iconB: {
    type: String,
    default: "",
  },
  iconAActive: {
    type: String,
    default: "",
  },
  iconBActive: {
    type: String,
    default: "",
  },
  enableCopy: {
    type: Boolean,
    default: false,
  },
});
let centerDialogVisible = ref(false);
const Icon_2 = ref(props.iconA);
const Icon_3 = ref(props.iconB);

const Icon_5 = ref(props.iconAActive);
const Icon_6 = ref(props.iconBActive);
watch(
    () => props.iconA,
    (newVal) => {
      Icon_2.value = newVal;
    }
);
watch(
    () => props.iconB,
    (newVal) => {
      Icon_3.value = newVal;
    }
);
watch(
    () => props.iconAActive,
    (newVal) => {
      Icon_5.value = newVal;
    }
);
watch(
    () => props.iconBActive,
    (newVal) => {
      Icon_6.value = newVal;
    }
);
const fileListInfos = ref([]);
const nowSelectWho=ref();
const selectIcon = (a) => {
  getAllMaterials();
  centerDialogVisible.value = true;
  nowSelectWho.value=a;
}
let select2=ref();
let select3=ref();
let select5=ref();
let select6=ref();
const getAllMaterials = () => {
  let params: any = {};
  params.fileOldName = "";
  post({
    url: getAllMaterialsUrl,
    data: params
  }).then((res: any) => {
    if (res.code == 200) {
      fileListInfos.value = res.result;
      res.result.forEach((item)=>{
        if(Icon_2.value){
          if(item.url==Icon_2.value){
            select2.value=item;

          }
        }
        if(Icon_3.value){
          if(item.url==Icon_3.value){
            select3.value=item;

          }
        }

        if(Icon_5.value){
          if(item.url==Icon_5.value){
            select5.value=item;

          }
        }
        if(Icon_6.value){
          if(item.url==Icon_6.value){
            select6.value=item;

          }
        }
      })
    } else {
    }
  })
}


const selectIconSvg=(item:any)=>{
  if(nowSelectWho.value==2){
    emit("SelectTow", item);
    select2.value=item
  }
  if(nowSelectWho.value==3){
    emit("SelectThr", item);
    select3.value=item
  }

  if(nowSelectWho.value==5){
    emit("Select5f", item);
    select5.value=item
  }

  if(nowSelectWho.value==6){
    emit("Select6f", item);
    select6.value=item
  }
  nowSelectWho.value=0;
  centerDialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.icon_box_thr{
 /* display: flex;
  flex-direction: column;*/
  width: 100%;
  .div__icon_{
    display: flex;
    margin-bottom: 20px;
    padding-top: 35px;
    position: relative;

    .p_tips_O{
      position: absolute;
      top: 0px;
      left: 10px;
      margin: 0px;
      color: var(--el-color-warning);
    }
  }
}
.div__icon{
  width: 80px;
  height: 80px;
  border: 1px dashed #eee;
  box-shadow: 0px 4px 6px #e7e8e8;
  border-radius: 4px;
  margin-right: 20px;
}
.__icon {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  &::after {

  }
}

.icon_select_box {
  /*display: flex;
  flex-direction: row;*/
  padding: 20px 25px;
}

.img_box_ffo {
  width: 110px;
  height: 110px;
  margin-left: 20px;
  display: inline-block;
  margin-bottom: 25px;
  .img_sub_ffo{
    width: 110px;
    height: 110px;
    background: #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    cursor: pointer;
  }
}

.icon_select {
  width: 80px;
  height: 80px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    opacity: 0.6;
  }
}
</style>