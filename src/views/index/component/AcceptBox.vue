<template>
  <div class="zdy-tem-box">
    <!-- 标题样式 -->
    <div class="top_title_box">
      <p class="title_cjl_p">
        认可准则
      </p>
    </div>
    <!-- 内容区，左右结构   -->
    <div class="col-cjl-box">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="el-col-box">
          <div class="col-content_box content_box_l">
            <!--右上角刘海提示 -->
            <div class="bangs-r">
              <p>
                管理要求
              </p>
            </div>
            <div class="item_box_cjl_content">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item,index) in treeList" :key="index">
                  <div class="item_sub_cjl" >
                    <p style="margin: 0px">
                      {{item.itemCode}}&nbsp  {{item.itemName}}
                    </p>
                  </div>
                </el-col>

              </el-row>

            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="el-col-box">
          <div class="col-content_box content_box_r">
            <!--右上角刘海提示 -->
            <div class="bangs-r bangs-r_r">
              <p>
                技术要求
              </p>
            </div>

            <div class="item_box_cjl_content item_box_cjl_content_2">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="(item,index) in treeList2" :key="index">
                  <div class="item_sub_cjl" >
                    <p style="margin: 0px">
                      {{item.itemCode}}&nbsp  {{item.itemName}}
                    </p>
                  </div>
                </el-col>

              </el-row>

            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AcceptBox"
}
</script>
<script lang="ts" setup>


/*获取条款*/
//获取条款总览树
import {post} from "@/api/http";
import {getItemTreeUrl} from "@/api/url";
import {ElMessage} from "element-plus";
import {onMounted} from "@vue/runtime-core";
import {ref} from "vue";

let treeList=ref([]);
let treeList2=ref([]);

</script>

<style scoped lang="scss">
.zdy-tem-box {
  .top_title_box {
    padding-top: 16px;
    padding-bottom: 16px;

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

  .col-cjl-box {
    padding: 12px 20px 0px;
  }

  .el-col-box {
    margin-bottom: 20px;
  }

  .col-content_box {
    position: relative;
    //height: 250px;
    width: 100%;
    background: linear-gradient(180deg, #EDFCF9 0%, #F9FEFD 100%);
    border-radius: 12px 12px 12px 12px;
    opacity: 1;

    .bangs-r{
      position: absolute;
      right: 0px;
      top: 0px;
      width: 160px;
      height: 44px;
      background: linear-gradient(180deg, #02BE94 0%, #40CAA8 100%);
      border-radius: 0px 10px 0px 40px;
      padding-left: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      p{
        margin: 0px;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 16px;
      }
    }
    .bangs-r_r{
      background: linear-gradient(180deg, #1996D4 0%, #47ABDD 100%);
    }
  }

  .content_box_l {


    &:before {
      width: 80%;
      height:  80%;
      position: absolute;
      left: 0px;
      top: 0px;
      content: "";
      background: url("../../../assets/home/left-b.svg") no-repeat center;
      background-size: 100% 100%;
    }
  }

  .content_box_r {
    position: relative;
    height: 250px;
    width: 100%;
    background: linear-gradient(180deg, #EDF7FC 0%, #F9FDFE 100%);
    border-radius: 12px 12px 12px 12px;
    opacity: 1;

    &:before {
      width: 80%;
      height:  80%;
      position: absolute;
      left: 17px;
      top: 0px;
      content: "";
      background: url("../../../assets/home/right-b.svg") no-repeat center;
      background-size: 100% 100%;
    }
  }
}

.item_box_cjl_content{
  padding:75px 35px 7px 45px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .item_sub_cjl{
    width: 100%;
    &:hover{
      cursor: pointer;
    }
    &:active{
      cursor: pointer;
      opacity: 0.6;
    }
    p{
      position: relative;
      padding: 10px 0px;
      padding-left: 10px;
      font-size: 15px;
      width: 99.6%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover{
        cursor: pointer;
      }
      &:active{
        cursor: pointer;
        opacity: 0.6;
      }
      &:before{
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #02C792;
        position: absolute;
        top: 20px;
        left: 0px;
      }
    }
  }
}

.item_box_cjl_content_2{
  padding:75px 35px 7px 65px;
  .item_sub_cjl{
    p{
      &:before{
        background: #4DAFE4;
      }
    }
  }
}
</style>