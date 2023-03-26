<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader
            :can-collapsed="
            likeSearchModel.conditionItems &&
            likeSearchModel.conditionItems.length !== 0
          "
            :search-model="likeSearchModel.conditionItems"
            :default-collapsed-state="true"
            title="表格查询"
            @doSearch="doSearch"
            @resetSearch="resetSearch"
        />
      </template>
      <template #tableConfig>
        <TableConfig
            v-model:border="tableConfig.border"
            v-model:stripe="tableConfig.stripe"
            @refresh="doRefresh()"
        >
          <template #actions>
            <el-button type="primary" size="small"
                       @click="onAddItem"
                       icon="PlusIcon">新增用户</el-button>
            <!--            <el-button type="danger" size="small" icon="DeleteIcon"-->
            <!--            >删除-->
            <!--            </el-button>-->
          </template>
        </TableConfig>
      </template>
      <template #default>
        <el-table
            v-loading="tableLoading"
            :data="dataList"
            :header-cell-style="tableConfig.headerCellStyle"
            :size="tableConfig.size"
            :stripe="tableConfig.stripe"
            :border="tableConfig.border"
            :height="tableConfig.height"
        >
          <el-table-column align="center" label="序号" width="80">
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名" prop="name"/>
          <el-table-column align="center" label="工号" prop="pin"/>
          <el-table-column align="center" label="账号" prop="account"/>
          <el-table-column align="center" label="部门" prop="departmentName"/>
          <el-table-column align="center" label="角色" prop="gname"/>
          <el-table-column
              align="center"
              label="创建时间"
              prop="createTime"
              width="160px"
          />
          <el-table-column align="center" label="操作">
            <template v-slot="scope">
              <el-button type="text"
                         @click="editCharacter(scope.row)"
              >编辑</el-button>
              <el-button type="text"
                         style="color: red"
                         @click="deleteCharacter(scope.row)"
              >移除</el-button>

            </template>
          </el-table-column>


        </el-table>
      </template>
      <template #footer>
        <TableFooter
            ref="tableFooter"
            @refresh="doRefresh()"
            @pageChanged="doSearch()"
        />
      </template>
    </TableBody>
    <Dialog ref="dialog" @onConfirm="onConfirm"
            @onCancel="onCancel"
            :showCancel="activeStep!=3"
            :title="dialogTitle" :confirmBtnTxt="confirmBtnTxt">
      <template #content>
      <el-card
          :body-style="{padding: '5px'}"
          shadow="hover"
      >
        <el-steps
            :active="activeStep"
            align-center
            finish-status="success"
            class="steps-wrapper"
        >
          <el-step title="选择要添加的用户" />
          <el-step title="选择要添加的角色" />
          <el-step title="完成" />
        </el-steps>
      </el-card>
        <el-card
            :body-style="{padding: '5px'}"
            shadow="hover"
            class="margin-top-xs"
        >
          <el-form
              @submit.native.prevent
              v-if="activeStep==1"
              :inline="false" :model="dialogItem" class="demo-form-inline padding-xxl">
            <el-form-item label="用户姓名或工号：" class="flex form-item ">
              <el-input class="form-input" @keyup.enter="searchUser" focus v-model="dialogItem.search"  placeholder="请输入用户姓名或工号" />
              <el-button type="primary" :icon="Search"
                         @click="searchUser"
                         class="margin-left">搜索</el-button>
            </el-form-item>
            <el-form-item label="搜索结果：" class="flex margin-top-xxxl">
              <div class="user-item-list">
                <div v-for="item in userList" class="user-item" @click="onClickUser(item.id)">{{ item.name }} {{item.account}}</div>
              </div>
            </el-form-item>
<!--            <el-input></el-input>-->
          </el-form>

          <el-form
              v-if="activeStep==2"
          v-loading="formLoading"
              class="padding-xxl"
          >
            <div class="tip_info">
              <p>操作提示：<br>
                <el-icon><BellIcon/></el-icon>一个用户只能分配一个角色；<br>
                <el-icon><BellIcon/></el-icon> 如果是超融合新用户，系统会默认给用户分配主系统的普通用户角色<br>
                <el-icon><BellIcon/></el-icon> 鼠标移入角色，会弹出该角色下的所有已授权的菜单或按钮<br>
              </p>
            </div>

            <el-form-item label="角色修改：" class="flex margin-top-xxxl">
              <div class="user-item-list">
                <div v-for="item in roleList" :class="[isActive==item.id ? 'user-item-active' : '','user-item']"
                     @click="onClickCharacter(item.id)">{{item.gname}}</div>
              </div>
            </el-form-item>
          </el-form>
          <div v-if="activeStep==3" style="padding-left: 30px">
            <h1>成功！</h1>
            <h3>成功添加用户，请点击确认按钮或点击右上角关闭按钮</h3>
          </div>
        </el-card>
      </template>
      <template #footer-button>
        <el-button
            type="primary"

            @click="preStep"
            v-if="activeStep==2"
        >上一步</el-button>
      </template>
    </Dialog>
    <Dialog ref="editDialog" @onConfirm="editConfirm()"
            @onCancel="editCancel"
            title="修改用户角色" confirmBtnTxt="提交">
      <template #content>
      <el-form
          v-loading="formLoading"
      >
        <div class="tip_info">
          <p>操作提示：<br>
            <el-icon><BellIcon/></el-icon>一个用户只能分配一个角色；<br>
            <el-icon><BellIcon/></el-icon> 如果是超融合新用户，系统会默认给用户分配主系统的普通用户角色<br>
            <el-icon><BellIcon/></el-icon> 鼠标移入角色，会弹出该角色下的所有已授权的菜单或按钮<br>
          </p>
        </div>
        <el-form-item label="角色修改：" class="flex margin-top-xxxl">
          <div class="user-item-list">
            <div v-for="item in roleList" :class="[isActive==item.id ? 'user-item-active' : '','user-item']"
                 @click="onClickCharacter(item.id)">
              <el-popover
                  placement="top-start"
                  :width="200"
                  trigger="hover"
                  :show-arrow="false"
              >
                <el-scrollbar height="200px">
                <el-tree :data="computedDataTree(item.id)"
                         :props="defaultProps"
                         class=""
                >
                </el-tree>
                </el-scrollbar>
                <template #reference>
                  {{item.gname}}
                </template>
              </el-popover>


            </div>
          </div>
        </el-form-item>
      </el-form>
      </template>
<!--      <template #footer-button>-->
<!--        <el-button-->
<!--            size="small"-->
<!--            @click="resetPW"-->
<!--            class="margin-right"-->
<!--        >重置密码</el-button>-->
<!--      </template>-->
    </Dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: 'User'
}
</script>
<script lang="ts" setup>
import {
  addUserGroup, deleteReagent, deleteUserUrl,
  findAllUsers,
  getGroupAllListByCsysId,
  getGroupTreeByCsysId,
  getTableList,
  getUserByCsysId,
  getUserList, selectAllGroupAndMenu,
  selectMenuIdByGroupId
} from "@/api/url";
import {useDataTable, useLikeSearch, usePost} from "@/hooks";
import {computed, onBeforeMount, onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import type {TableFooter} from "@/components/types";
import {DialogType} from "@/components/types";
import {Search} from '@element-plus/icons-vue'
import Dialog from "@/components/common/Dialog.vue";
import {getSysId} from "@/utils";

const formConfig=reactive({
  size: "default",
  labelWidth: "150",
  labelPosition: "left",
})
//***start****  dialog
//角色列表
const formLoading=ref(false)
const roleList=ref([])
const confirmBtnTxt=ref('')
const activeStep = ref(1);
const isActive=ref<Number>(-1)
const dialogItem=reactive({
  search:''
})
const currentUserId=ref<number>()
const currentCharacterId=ref<number>()
// const baseForm = ref();
const dialog = ref<DialogType>();
const editDialog=ref<DialogType>();
const dialogTitle = ref("新增用户");
let userList=ref<any>([])
// 打开弹窗
const onAddItem = () => {
  dialogTitle.value = "新增用户";
  dialog.value?.show(() => { });
};
const roleAndMenu=ref<any>([])
const defaultProps={
  id: 'id',
  children: 'children',
  label: 'title',
  key: 'id',
  value: 'title',
  icon:'icon'
}
function computedDataTree(id:number){
  let list=null
  roleAndMenu.value.forEach((item:any)=>{
    if (item.id==id){
      list=item.listMenu
    }
  })
  return list
}
function searchUser() {
  post({
    url:findAllUsers,
    data:{
      inputSearch:dialogItem.search
    }
  }).then((res:any)=>{

    userList.value=[]
    res.result.forEach((item:any)=>{
      userList.value.push(item)
      // console.log("this is userList: ",userList)
    })

  })
}
function onClickUser(id:number){
  isActive.value=roleList.value[0].id
  activeStep.value+=1;
  confirmBtnTxt.value='提交'
  currentUserId.value=id
}
function preStep(){
  activeStep.value-=1;
  confirmBtnTxt.value=''
}
function onClickCharacter(key:number){
  currentCharacterId.value=key
  isActive.value=key
}
function onConfirm() {
  if (confirmBtnTxt.value=='确认'){
    dialog.value?.close()
  }else {

    formLoading.value=true
    post({
      url: addUserGroup,
      data: {
        userId:currentUserId.value,
        csysId:getSysId(),
        groupId:currentCharacterId.value,
      },
    }).then((res: any) => {
      formLoading.value=false
      ElMessage({
        message: res.message,
        grouping: true,
        type: res.success ? 'success' : 'error',
      })
      if (res.success) {
        doRefresh()
        activeStep.value=3;
        confirmBtnTxt.value='确认'
      }
    }).catch(console.log);

  }

}
function onCancel(){
  activeStep.value=1
  confirmBtnTxt.value=''
  dialogItem.search=''
  userList.value=[]
  formLoading.value=false
  isActive.value=-1
}
// const onConfirm=()=>{
//   dialog.value?.onConfirm(()=>{
//     formLoading.value=true
//   })
// }
//**end***  dialog

/**start tableFooter**/
const tableFooter = ref<TableFooter>();

/** end tableFooter */


const {likeSearchModel, getSearchParams, resetSearch} = useLikeSearch();
const {
  handleSuccess,
  dataList,
  tableConfig,
  tableLoading,
  useHeight,
  offTableCollapseTransition,
} = useDataTable();
// tableConfig.height=800;
const post = usePost();

likeSearchModel.extraParams = () => ({
  ...tableFooter.value?.withPageInfoData(),
});
likeSearchModel.conditionItems = reactive([
  {
    name: "inputSearch",
    label: "工号或姓名：",
    value: "",
    type: "input",
    placeholder: "请输入用户的工号或姓名",
    span: 8,
  },
  {
    name: "character",
    label: "角色",
    value: "",
    type: "select",
    placeholder: "请选择角色：",
    selectOptions: [],
    span: 8,
  }
]);
function getRoleList(){
  post({
    url: getGroupAllListByCsysId,
    data: {
      csysId: getSysId(),
    },
  }).then((res: any) => {
    roleList.value=res
    let list: any[];
    list = [];
    res.forEach((item:any)=>{
      list.push({
        key:item.id,
        value:item.gname,
        label:item.gname
      })
    })
    likeSearchModel.conditionItems.pop()
    likeSearchModel.conditionItems.push({
      name: "character",
      label: "角色",
      value: "",
      type: "select",
      placeholder: "请选择角色：",
      selectOptions: list,
      span: 8,
    })
  })
}
const doSearch = () => {
  const params = getSearchParams();
  // console.log("this is params: ",params)
  doRefresh(params?.inputSearch,params?.character)
  // ElMessageBox.alert(`模拟模糊搜索成功，搜索参数为：${JSON.stringify(params)}`);
};
function doRefresh(inputSearch?:string,gname?:any) {

  tableLoading.value=true
  let footInfo = tableFooter.value?.withPageInfoData()
  post({
    url: getUserByCsysId,
    data: {
      'cPage':footInfo?.page,
      'pSize':footInfo?.pageSize,
      inputSearch:inputSearch==''?null:inputSearch,
      rank:1,
      gname:gname==""?null:gname,
      pid:1,
      csysId:getSysId(),
      // csysId:59
      // ...tableFooter.value?.withPageInfoData(),
      // ...getSearchParams(),
    },
  }).then((res: any)=>{

        const data:any=res.result
    // console.log("userList:",data);
    dataList.value=data.list
        tableFooter.value?.setTotalSize(data.total);
        tableLoading.value=false
      }).catch(console.log);

}
function editCharacter(row:any){
  getAllGroupAndMenu()
  isActive.value=row.groupId
  currentUserId.value=row.id
  currentCharacterId.value=row.groupId
  editDialog.value?.show(()=>{})
}
function deleteCharacter(row:any) {
  ElMessageBox.confirm(
      '确认移除该用户?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    let params= new FormData()
    params.append("groupId",row.uid)
      post({
        url:deleteUserUrl,
        data:params
      }).then((res:any)=>{
        // console.log("this is deleteCharacter: ",  res)
        doRefresh()
      })
  })
}
function editConfirm(){
tableLoading.value=true
  postEditUserGroup()
}
function editCancel() {
  formLoading.value=false
  isActive.value=-1
}
function resetPW() {
  ElMessageBox.confirm(
      '确定恢复该用户的初始密码吗？(test)',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then()
}
function getAllGroupAndMenu() {
  let param=new FormData()
  const id:any=getSysId()
  param.append("csysId",id)
  post({
    url:selectAllGroupAndMenu,
    data:param
  }).then((res:any)=>{
    // console.log("this is getAllGroupAndMenu: ",res)
    roleAndMenu.value=res
  })
}
function postEditUserGroup(){

  post({
    url: addUserGroup,
    data: {
      userId:currentUserId.value,
      csysId:getSysId(),
      groupId:currentCharacterId.value,
    },
  }).then((res: any) => {
    formLoading.value=false
    ElMessage({
      message: res.message,
      grouping: true,
      type: res.success ? 'success' : 'error',
    })
    if (res.success) {
      doRefresh()
      editDialog.value?.close()
    }
  }).catch(console.log);
}
onMounted(() => {
  doRefresh();
  useHeight();
  getRoleList()
  getAllGroupAndMenu()
});
onBeforeMount(offTableCollapseTransition);
</script>

<style lang="scss" scoped>
.el_popover_c{
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.tip_info{
  border-left: 5px solid var(--el-color-primary-light-5);
  padding-left: 15px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing:2px;
}
.form-item{
  width: 600px;
}
.form-input{
  width: 250px;
}
.user-item-list{
  width: 100%;
  //background: #5a5a5a;
}
//.user-item-list :hover{
//  color:rgba(59, 133, 242, 0.8) ;
//}
.user-item{
  cursor: pointer;
  display: inline-block;
  line-height: 40px;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 15px;
  margin-right: 10px;
  padding: 0 20px;
  height: 40px;
  //border: 1px solid var(--el-color-primary);
  color: var(--el-color-primary);
  border-radius: 5px;
  background: var(--el-color-primary-light-9);
  text-align: center;
}

.user-item-active{
  border-color: var(--el-color-primary-light-1);
  background: var(--el-color-primary-light-3);
  color: white ;
}
.avatar-container {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  vertical-align: middle;

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .avatar-vip {
    border: 2px solid #cece1e;
  }

  .vip {
    position: absolute;
    top: 0;
    right: -9px;
    width: 15px;
    transform: rotate(60deg);
  }
}

.gender-container {
  .gender-icon {
    width: 20px;

  }
}
</style>
