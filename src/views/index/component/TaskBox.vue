<template>
  <div class="zdy-tem-box">
    <!-- tab切换样式 -->
    <div class="tab_cjl_box">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="待办审核任务" name="one">
          <TableBody>
            <template #default>
              <el-table
                  v-loading="tableLoading"
                  :data="taskData"
                  :header-cell-style="tableConfig.headerCellStyle"
                  :size="tableConfig.size"
                  :stripe="tableConfig.stripe"
                  :border="tableConfig.border"
                  row-key="id"
                  height="280"
              >

                <el-table-column
                    align="center"
                    label="批次名称"
                    prop="batchName"
                />
                <el-table-column
                    align="center"
                    label="条款范畴"
                    prop="itemArea"
                />
                <el-table-column
                    align="center"
                    label="条款代码"
                    prop="itemCode"

                />
                <el-table-column
                    align="center"
                    label="条款名称"
                    prop="itemName"

                />
                <el-table-column
                    align="center"
                    label="截止时间"
                    prop="endTime"

                />
                <el-table-column
                    align="center"
                    label="自查部门"
                    prop="department"

                />
                <el-table-column
                    align="center"
                    label="自查人"
                    prop="checkUser"

                />
                <el-table-column
                    align="center"
                    label="负责人"
                    prop="director"

                />
                <el-table-column
                    align="center"
                    label="条款状态"
                    prop="itemStatus"

                />

              </el-table>
            </template>
          </TableBody>

        </el-tab-pane>
        <el-tab-pane label="待办自查任务" name="tow">
          <TableBody>
            <template #default>
              <el-table
                  v-loading="tableLoading"
                  :data="taskData"
                  :header-cell-style="tableConfig.headerCellStyle"
                  :size="tableConfig.size"
                  :stripe="tableConfig.stripe"
                  :border="tableConfig.border"
                  row-key="id"
                  height="280"
              >

                <el-table-column
                    align="center"
                    label="批次名称"
                    prop="batchName"
                />
                <el-table-column
                    align="center"
                    label="条款范畴"
                    prop="itemArea"
                />
                <el-table-column
                    align="center"
                    label="条款代码"
                    prop="itemCode"

                />
                <el-table-column
                    align="center"
                    label="条款名称"
                    prop="itemName"

                />
                <el-table-column
                    align="center"
                    label="截止时间"
                    prop="endTime"

                />
                <el-table-column
                    align="center"
                    label="自查部门"
                    prop="department"

                />
                <el-table-column
                    align="center"
                    label="自查人"
                    prop="checkUser"

                />
                <el-table-column
                    align="center"
                    label="负责人"
                    prop="director"

                />
                <el-table-column
                    align="center"
                    label="条款状态"
                    prop="itemStatus"

                />

              </el-table>
            </template>
          </TableBody>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: "TaskBox"
}
</script>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useDataTable} from "@/hooks";

const activeName=ref("one")

const handleClick=()=>{

}
let {tableLoading, tableConfig, dataList, handleSuccess} = useDataTable();
let taskData=ref([]);
/*itemArea,itemCode,itemName,endTime,department,checkUser,director,itemStatus*/
let domeData= {
  id:1,
  batchName:"1998年第1次",
  itemArea:"临床化学",
  itemCode:"4.1.1.1",
  itemName:"法律实体",
  endTime:"2022-08-17  20:28:49",
  department:"测试部门",
  checkUser:"张三",
  director:"李四",
  itemStatus:"待审核"
};
const dataTitle = ["临床免疫学", "临床化学", "临床微生物学", "体液学"
  , "血液学", "输血医学", "分子诊断", "细胞病理学", "组织病理学", "实验室信息管理", "CT检查"]
for (let i=0;i<6;i++){
  let targ=JSON.parse(JSON.stringify(domeData));
  targ.id=targ.id+1;
  let n=Math.floor(Math.random()*10)+1;
  targ.itemArea=dataTitle[n]
  targ.batchName= targ.batchName.substring(0,6)+n+"次"
  taskData.value.push(targ);

}
tableLoading.value = false
console.log(taskData);

</script>
<style scoped lang="scss">
.tab_cjl_box{
  padding: 6px 16px 30px;

  :deep{
    .el-tabs__nav-wrap:after{
      background: transparent;
    }
    .el-tabs__item.is-top{
      color: #596A74;
      font-size: 16px;
    }
    .el-tabs__item.is-top.is-active{
      font-weight: bold;
      color: #172B34;
    }
  }
}
</style>