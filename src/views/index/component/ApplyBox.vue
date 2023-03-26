<template>
  <div class="zdy-tem-box">
    <!-- 标题样式 -->
    <div class="top_title_box">
      <p class="title_cjl_p">
        应用说明
      </p>
    </div>

    <!--  内容区  -->
    <div class="content_box_cjl">
      <div class="item_box_cjl" v-for="(item,index) in  dataList" :key="index">
        <!-- 图标 -->
        <img :src="item.img">
        <!-- 标题  -->
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ApplyBox"
}
</script>

<script lang="ts" setup>

/*interface*/
import {ref} from "vue";
import {onMounted} from "@vue/runtime-core";

interface ApplyD {
  name: string,
  id: number,
  img: string
}

const dataTitle = ["临床免疫学", "临床化学", "临床微生物学", "体液学"
  , "血液学", "输血医学", "分子诊断", "细胞病理学", "组织病理学", "实验室信息管理", "CT检查"]
const dataList = ref<ApplyD>([])
console.log(dataList);
onMounted(() => {
  dataTitle.forEach((item: string, index: number) => {
    const applyd: ApplyD = {}
    applyd.id = index + 1;
    applyd.name = item;
    applyd.img = require("@/assets/home/a-" + (index + 1) + ".svg")
    dataList.value.push(applyd);
  })
})


</script>

<style scoped lang="scss">
.top_title_box {
  padding-top: 16px;
  padding-bottom: 16px;
  border: 1px #F2F2F2 solid;

  .title_cjl_p {
    margin: 0px;
    position: relative;
    padding-left: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #172B34;
    line-height: 16px;

    &:before {
      content: "";
      width: 4px;
      position: absolute;
      top: -4px;
      height: 24px;
      left: 0px;
      background: var(--el-color-primary);
      border-radius: 0px 4px 4px 0px;

    }
  }
}

.content_box_cjl {
  padding: 10px 72px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .item_box_cjl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover{
      cursor: pointer;
    }
    &:active{
      opacity: 0.6;
    }

    img {
      width: 56px;
      height: 56px;
    }

  }
}
</style>