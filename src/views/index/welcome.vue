<template>
  <div class="welcome_div" style="height: 100%">
     <div class="top_box_cjl">
       <!-- 认可准则   -->
       <div class="accept-box">
         <accept-box></accept-box>
       </div>
       <!-- 应用说明   -->
       <div class="apply-box">
        <ApplyBox></ApplyBox>
       </div>
       <!-- 任务区   -->
       <div class="task-box">
         <task-box></task-box>
       </div>
     </div>

  </div>
</template>

<script lang="ts">
export default {
  name:"Home",
}
</script>

<script lang="ts" setup>
import AcceptBox from "@/views/index/component/AcceptBox.vue";
import ApplyBox from "@/views/index/component/ApplyBox.vue";
import TaskBox from "@/views/index/component/TaskBox.vue";
</script>

<style scoped lang="scss">
.top_box_cjl{
  height: 100%;
  padding: 10px 11px 5px;
  .accept-box{
    background: var(--el-color-white);
    border-radius: 8px;
    margin-bottom: 16px;
  }
  .apply-box{
    background: var(--el-color-white);
    border-radius: 8px;
    margin-bottom:16px;
  }
  .task-box{
    background: var(--el-color-white);
    border-radius: 8px;
  }
}
</style>