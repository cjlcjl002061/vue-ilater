<template>
  <div class="main_contain">
    <div class="sys_icon_box">
      <img class="sys_icon" :style="{
        'top':topSet,
        'left':leftSet
      }"
           :src="baseUrl+'snibe/hyperfusion/parent/childSysImage/20_'+sysName+'.png?1650506973418'" >
    </div>
    <slot name="default">

    </slot>
    <div class="sys_text" :style="{'color': textColor}">
      {{sysName}}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SystemTitle"
}
</script>
<script lang="ts" setup>
import {baseUrl} from "@/api/url";
import {ref} from "vue";
import {onMounted} from "@vue/runtime-core";
const sysName=ref<string>('')
function  getSysName(){
  //通过网址获取
  let href:string=location.href
  let idIndex = location.href.indexOf('sname=')
  let sysName=href.substring(idIndex+6,href.indexOf('#'))
  return decodeURI(sysName)
}
onMounted(()=>{
    // sysName.value=getSysName()
    sysName.value='ISO-15189'
})
const props=defineProps({
  textColor: {
    type: String,
    default: "",
  },
  topSet:{
    type:String,
    default:'0'
  },
  leftSet:{
    type:String,
    default:'0'
  }
})
</script>
<style scoped>
.main_contain{
  height: 38px;
  display: flex;
  text-align: center;
}
.sys_icon_box{
  height:50px ;
  width: 80px;
}
.sys_icon{
  width: 50px;
  height: 50px;
  position: absolute;

}
.sys_text{
  height: 100%;
  font-size: 22px;
  color: #333;
  font-weight: 500;
  line-height: 38px;
  margin-left: 11px;
}

</style>