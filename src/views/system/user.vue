<template>
  <div class="main-container" id="userMp" style="height:100%">
    <div v-show="isHome" style="height:100%;" class="top_box_home">
      <!--顶部按钮区和搜索区    -->
      <div class="top_box_cjl">
        <!--      筛选条件  -->
        <div class="cjl_top_ad_box">
          <el-input
              v-model="inputSearch"
              placeholder="请输入用户姓名或工号"
              :prefix-icon="Search"
              class="cjl-g-input"
              :clearable="true"
              input-style="height:40px"
              @keyup.enter.native="doRefresh"
              @clear="doRefresh"
          />
          <n-button secondary strong class="add_menu_btn n-btn-secondary zdy_btn_main" @click="doRefresh">
            <template #icon>
              <n-icon size="18">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                  <circle cx="10" cy="8" r="4" fill="currentColor"></circle>
                  <path
                      d="M10.35 14.01C7.62 13.91 2 15.27 2 18v1c0 .55.45 1 1 1h8.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.47-.8.7-1.77.48-2.82c-.34-1.64-1.72-2.95-3.38-3.16c-2.63-.34-4.85 1.87-4.5 4.5c.22 1.66 1.52 3.04 3.16 3.38c1.05.22 2.02-.01 2.82-.48l1.86 1.86a.996.996 0 1 0 1.41-1.41l-1.85-1.87zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"
                      fill="currentColor"></path>
                </svg>
              </n-icon>
            </template>
            搜索
          </n-button>
        </div>

      </div>
      <div class="table_box_cjl">
        <TableBody>
<!--          <template #tableConfig>
            <TableConfig
                v-model:border="tableConfig.border"
                v-model:stripe="tableConfig.stripe"
                @refresh="doRefresh"
            >
            </TableConfig>
          </template>-->
          <template #default>
            <el-table
                ref="tableRef"
                v-loading="tableLoading"
                :data="dataList"
                :header-cell-style="tableConfig.headerCellStyle"
                :size="tableConfig.size"
                :stripe="tableConfig.stripe"
                :border="tableConfig.border"
                :height="tableHeight"
                @selection-change="handleSelectionChange"
            >
<!--              <el-table-column type="selection" width="45" fixed="left"/>-->
              <el-table-column
                  align="center"
                  label="姓名"
                  prop="name"
                  width="100"
              />
              <el-table-column
                  align="center"
                  label="账号"
                  prop="account"
                  width="130px"
              />

              <el-table-column
                  align="center"
                  label="所属部门"
                  prop="departmentName"
              />
              <el-table-column align="center" label="所属角色" prop="roleName"/>


              <el-table-column align="center" label="状态">
                <template #default="scope">
                  <el-tag
                      size="small"
                      :type="scope.row.disable === 1 ? 'success' : 'danger'"
                  >
                    {{ scope.row.disable === 1 ? "正常" : "禁用" }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  label="操作"
                  fixed="right"
                  width="220"
              >
                <template #default="scope">
                  <AddSnibeUserRole :row="scope.row" @refreshTable="doRefresh"></AddSnibeUserRole>
                  <el-button
                      class="margin-left"
                      :type="scope.row.disable === 1 ? 'warning' : 'success'"
                      size="small"
                      plain
                      @click="onEnableItem(scope.row)">{{ scope.row.disable === 1 ? "禁用" : "启用" }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template #footer>
            <div class="table--footer">
              <el-pagination
                  :currentPage="currentPage"
                  :page-size="pageSize"
                  :page-sizes="[10, 20, 50, 100]"
                  :small="false"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
              />
            </div>
          </template>
        </TableBody>
      </div>

    </div>



  </div>
</template>

<script setup lang="ts">
import {useDataTable, usePost} from "@/hooks";
import {computed, reactive, ref} from "vue";
import {getWorkH} from "@/utils";
import {disableUserUrl, getAllUserUrl} from "@/api/url";
import {onMounted} from "@vue/runtime-core";
import {ElMessage, ElMessageBox} from "element-plus";

const post = usePost();
const tableRef = ref();
const {
  dataList,
  tableLoading,
  tableConfig,
  handleSelectionChange,
  selectRows,
  useHeight,
} = useDataTable<UserModelType>();

const inputSearch = ref("");

const isHome = ref(true);
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0);

const borderA = ref(350)
const tableHeight = computed(() => {
  return getWorkH(borderA.value, 5);
});


const userModel = reactive<UserModelType>({
  id: 0,
  nickName: "",
  mobile: "",
  email: "",
  gender: 1,
  departmentId: "",
  roleId: "",
  password: "",
  status: 1,
});
tableLoading.value=false
const doRefresh = () => {
  let info = {
    page: currentPage.value,
    limit: pageSize.value,
    inputSearch: inputSearch.value
  }
  post({
    url: getAllUserUrl,
    data: info
  }).then((res: any) => {
    dataList.value=res.result.list;
    total.value = res.result.total;
    tableLoading.value = false;
  })
}
function onEnableItem(item: any) {
  ElMessageBox.confirm(
      "确定要" + (item.disable === 1 ? "禁用" : "启用") + "此用户吗？",
      "提示"
  )
      .then(() => {
        if (item.disable == 1) {
          item.disable = 2
        } else if (item.disable == 2) {
          item.disable = 1
        }
        post({
          url: disableUserUrl,
          data: item
        }).then((res: any) => {
          if (res.code == 200) {
            ElMessage.success(res.message)
          } else {
            ElMessage.error(res.message)
          }
        })
      })
      .catch(console.log);
}
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  doRefresh()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  doRefresh()
}
onMounted(() => {
  doRefresh();
});
</script>

<style lang="scss" scoped>
.main-container{
  padding: 10px 11px 5px;
}
.top_box_home{
  background: var(--el-color-white);
  border-radius: 8px;
}
.top_box_cjl {
  background: transparent;
  padding: 24px 0px;
  display: flex;
  justify-content: flex-end;
  .cjl_top_ad_box {
    padding: 0px 25px;
    width: 30%;
    min-width: 300px;
    display: flex;


    .cjl-g-input {
      margin-right: 10px;
      height: 40px;
    }

  }

}

.table--footer {
  padding: 0.53rem 0px 0.23rem;
  text-align: right;

  .el-pagination {
    justify-content: center;
  }
}

.table_box_cjl {
  background: #fff;
  padding: 0px 15px 20px;
}

.gender-container {
  .gender-icon {
    width: 20px;
  }

}

.add_menu_btn {
  background-color: var(--el-color-primary-light-2);
  color: var(--el-color-white);
}
.zdy_btn_main{
  height: 40px;
  border-radius: 8px 8px 8px 8px;
}

.add_menu_btn:hover {
  opacity: 0.8;
  background-color: var(--el-color-primary-light-2);
  color: var(--el-color-white);
}

.add_menu_btn:active {
  opacity: 1;
  background-color: var(--el-color-primary-light-2);
  color: var(--el-color-white);
}
</style>
