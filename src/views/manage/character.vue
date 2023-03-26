                                                    -<template>
  <div class="main-container">

    <div class="left-box">
      <div class="table_title">角色关系</div>
      <!--      <el-tree class="file_tree" node-key="id"-->
      <!--               highlight-current :data="dataTree"-->
      <!--               :default-expand-all="true"-->
      <!--               :expand-on-click-node="false"-->
      <!--               :current-node-key="currentCId"-->
      <!--               :props="defaultProps" @node-click="handleNodeClick"/>-->
      <el-tree
          class="cjl_tree_box"
          :data="dataTree"
          node-key="id"
          default-expand-all
          icon="ArrowRightBold"
          :expand-on-click-node="true"
          :props="defaultProps"
          @node-click="handleNodeClick"
          @node-contextmenu="treeNodeContent"
      >
        <template #default="{ node,data }">
          <div class="el-tree-node__label">
            <!--图标-->

            <i v-if="data.rank==1" class="ok-icon ok-icon-crownfill" style=""></i>
            <i v-else class="ok-icon ok-icon-favorfill"></i>
            <span class="custom-tree-node" :data-btn="node.data.isBtn">
                    <span :data-btn="node.label">{{ node.label }}</span>
                  </span>
          </div>

        </template>
      </el-tree>
    </div>
    <div class="right-box">
      <TableBody>
        <template #tableConfig>
          <TableConfig
              v-model:border="tableConfig.border"
              v-model:stripe="tableConfig.stripe"
              @refresh="doRefresh()"
          >
            <template #actions>
              <div class="table_title2">角色列表</div>
              <el-button type="primary" size="small" icon="PlusIcon" @click="onAddItem" id="abcde">新增角色</el-button>
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
              :height="tableConfig.height-30"
          >
            <el-table-column align="center" label="序号" width="80">
              <template v-slot="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="角色名称" prop="gname"/>
            <el-table-column align="center" label="角色描述" prop="profile"/>
            <el-table-column align="center" label="权限" prop="rank">
              <template v-slot="scope">
                {{ scope.row.rank == 1 ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="创建时间"
                prop="createTime"
                width="160px"
            />
            <el-table-column align="center" label="操作">
              <template v-slot="scope">
                <el-button link @click="editCharacter(scope.row)">编辑</el-button>
                <el-button link @click="editGroup(scope.row)">分配菜单</el-button>
                <el-button style="color: red" link @click="deleteCharacter(scope.row)">删除</el-button>
              </template>
            </el-table-column>


          </el-table>
        </template>
        <template #footer>
          <TableFooter
              ref="tableFooter"
              @refresh="doRefresh()"
              @pageChanged="doRefresh()"
          />
        </template>
      </TableBody>
      <!--   新增角色、修改角色   -->
      <Dialog ref="dialog"
              @onConfirm="onConfirm(ruleFormRef)"
              @onCancel="onCancel(ruleFormRef)"
              :showCancel="true"
              :title="dialogTitle" :confirmBtnTxt="confirmBtnTxt">
        <template #content>
          <el-form :inline="false"
                   :rules="rules"
                   ref="ruleFormRef"
                   :model="dialogItem" class="demo-form-inline">
            <el-form-item label="角色名称" class="flex form-item padding" prop="gname">
              <el-input class="form-input" maxlength="10" show-word-limit v-model="dialogItem.gname"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" class="flex form-item padding" prop="profile">
              <el-input class="form-input" maxlength="20" show-word-limit v-model="dialogItem.profile"></el-input>
            </el-form-item>
            <el-form-item label="是否是管理员" class="flex form-item padding">
              <el-radio-group v-model="dialogItem.rank">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="上级角色" class="flex form-item padding" prop="treeSelect">
              <el-tree-select v-model="dialogItem.treeSelect" :data="dataTree"
                              :props="defaultProps"
                              @node-click="nodeClick"
                              :render-after-expand="false">
              </el-tree-select>

            </el-form-item>
          </el-form>
        </template>
      </Dialog>
      <!--   修改角色的菜单   -->
      <Dialog ref="dialogGroup" @onConfirm="confirmPostMenu"
              @onCancel=""
              :showCancel="true"
              title="分配菜单" confirmBtnTxt="确认">
        <template #content>
          <div class="tip_info">
            操作提示：<br>
            <el-icon>
              <BellIcon/>
            </el-icon>
            分配时菜单和按钮可以多选；<br/>
            <el-icon>
              <BellIcon/>
            </el-icon>
            <el-icon>
              <Operation/>
            </el-icon>
            ：代表菜单；
            <el-icon>
              <Mouse/>
            </el-icon>
            ：代表页面的按钮；<br/>
            <el-icon>
              <BellIcon/>
            </el-icon>
            全选下一级：点击后只会选中下一级菜单或按钮,其他层级不会选中；<br/>
            <el-icon>
              <BellIcon/>
            </el-icon>
            取消全选：按照正常逻辑，取消当前节点下的所有子节点的选中状态；<br/>
          </div>
          <el-tree class="file_tree menu_tree " node-key="id"
                   ref="menuTreeRef"
                   :data="menuList"
                   show-checkbox
                   :default-expand-all="true"
                   :expand-on-click-node="true"
                   :props="menuProps" >
            <template #default="{ node, data }">
              <span class="menu_tree_item " :class="data.children!=null?'menu_tree_item_tree':''">
                <span style="margin-right: 50px">
                  <el-icon v-if="data.icon"><Operation/></el-icon> <el-icon v-if="!data.icon"><Mouse/></el-icon>
                  {{ node.label }}</span>
                <span v-if="data.children!=null">
                  <a class="menu_tree_item_a" @click.stop="setCurrentNode(data)"> 全选下一级   </a>
                  <a class="menu_tree_item_a" @click.stop="reSetNode(data,true)"> 取消全选 </a>
                </span>
              </span>
            </template>
          </el-tree>
        </template>
      </Dialog>

    </div>

  </div>
</template>
<script lang="ts">
export default {
  name: 'Character'
}
</script>
<script lang="ts" setup>
import {useDataTable, useLikeSearch, usePost} from "@/hooks";
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {} from '@element-plus/icons'
import {ElMessageBox, ElMessage, FormRules, FormInstance, ElTree} from "element-plus";
import type {TableFooter} from "@/components/types";
import {
  addGroup, addGroupMenu,
  deleteGroup,
  getGroupListByCsysId,
  getGroupTreeByCsysId, getMenuListByCsysId, getMenuListByCsysIdAndPid, selectMenuIdByGroupId, updateGroup,
} from "@/api/url";
import {DialogType} from "@/components/types";
import {getSysId} from "@/utils";
function  getSysName(){
  let href:string=location.href
  let idIndex = location.href.indexOf('sname=')
  let sysName=href.substring(idIndex+6,href.indexOf('#')==-1?href.length:href.indexOf('#'))
  return decodeURI(sysName)
}
//当前选中角色id
let currentCId = ref<number>(0)
let currentCTitle = ref<any>(getSysName())
const tableFooter = ref<TableFooter>();
const {likeSearchModel, getSearchParams, resetSearch} = useLikeSearch();
const {
  handleSuccess,
  dataList,
  tableConfig,
  tableLoading,
  useHeight,
  offTableCollapseTransition,
} = useDataTable();
tableConfig.height = 800;
const post = usePost();

interface Tree {
  label: string,
  id: number,
  gname: any,
  children?: Tree[],
}

/*** start dialog  ***/
const dialog = ref<DialogType>();
const dialogTitle = ref("新增角色");
const confirmBtnTxt = ref('确认')

const rules = reactive<FormRules>({
  gname: [
    {required: true, message: '角色名称不能为空', trigger: 'blur'},
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  profile: [{required: true, message: '角色描述不能为空', trigger: 'blur'},],
  treeSelect: [{required: true, message: '上级角色不能为空', trigger: 'blur'}]

})
/** addform **/
// 打开弹窗
const onAddItem = () => {
  dialogTitle.value = "新增角色";
  dialog.value?.show(() => {
  });
  dialogItem.treeSelect = currentCTitle.value
  if (currentCId.value != null) {
    dialogItem.pid = currentCId.value
  }
};
const ruleFormRef = ref<FormInstance>()

let dialogItem =
    reactive({
      id: null,
      gname: null,
      profile: null,
      rank: '0',
      treeSelect: null,
      pid: 0,
      url: '',
      csysId: getSysId(),
    })

//点击form表单内树节点
function nodeClick(val: any) {
  dialogItem.treeSelect = val.gname
  dialogItem.pid = val.id
}
function formNodeClick(){
  // console.log("this is click: ",)
}
/** update form**/
//打开弹窗
function editCharacter(row: any) {
  // console.log("this is editCharacter row: ", row)
  // console.log("this is datalist: ",dataList.value)
  // const list=dataList.value
  // list?.forEach((value:any, index, array)=>{
  //   console.log("this is value: ",value.pid)
  // })
  //go to
  dialogTitle.value = "修改角色";
  dialog.value?.show(() => {
  });
  dialogItem.treeSelect = currentCTitle.value
  if (currentCId.value != null) {
    dialogItem.pid = currentCId.value
  }
  dialogItem.id = row.id
  dialogItem.profile = row.profile
  dialogItem.gname = row.gname
}

/** update Group **/
/*** start dialogGroup  ***/
const dialogGroup = ref<DialogType>();
const menuList = ref<any>()
const menuTreeRef = ref<InstanceType<typeof ElTree>>()
const menuProps = {
  id: 'id',
  children: 'children',
  label: 'title',
  key: 'id',
  value: 'title',
  icon: 'icon'
}
const currentGroupId = ref<number>()

//分配菜单
function editGroup(row: any) {
  // console.log("this is row: ", row.id)
  currentGroupId.value = row.id
  //获取系统菜单列表
  post({
    url: getMenuListByCsysId,
    data: {
      // pid: 0,
      root: true,
      csysId: getSysId()
    },
  }).then((res: any) => {
    // console.log("this is getMenuListByCsysId  res: ", res)
    menuList.value = res
    dialogGroup.value?.show(() => {
    })
    //发送请求获取已经选中的菜单
    post({
      url: selectMenuIdByGroupId,
      data: {
        groupId: row.id
      },
    }).then((res: any) => {
      res.forEach((item: number) => {
        // console.log(item);
        menuTreeRef.value?.setChecked(item, true, false)
      })
    })
    // dialogGroup.value?.show(() => {})
  }).catch(console.log);
}

function setCurrentNode(data: any) {

  if (data.length > 1) {
    data.forEach((i: any) => {
      menuTreeRef.value?.setChecked(i.id, true, true)
      i.children?.forEach((item: any) => {
        menuTreeRef.value?.setChecked(item.id, true, true)
        if (item.children) {
          setCurrentNode(item.children)
        }
      })
    })
  } else {
    menuTreeRef.value?.setChecked(data.id, true, true)
    data.children?.forEach((item: any) => {
      menuTreeRef.value?.setChecked(item.id, true, true)
      if (item.children) {
        setCurrentNode(item.children)
      }
    })
  }
}

function reSetNode(data: any, isRoot: boolean) {
  if (isRoot) {
    reSetNode(data.children, false)
  }
  if (data.length > 1) {
    data.forEach((i: any) => {
      menuTreeRef.value?.setChecked(i.id, false, true)
      if (i.children) {
        reSetNode(i.children, false)
      }
    })
  } else {
    menuTreeRef.value?.setChecked(data.id, false, true)
    if (data.children) {
      reSetNode(data.children, false)
    }
  }

}

function confirmPostMenu() {

  post({
    url: addGroupMenu,
    data: {
      groupId: currentGroupId.value,
      menuIdList: menuTreeRef.value?.getCheckedKeys()
    },
  }).then((res: any) => {
    // console.log(res);
    ElMessage({
      message: res.message,
      grouping: true,
      type: res.success ? 'success' : 'error',
    })
    if (res.success) {
      dialogGroup.value?.close();
    }
  }).catch(console.log);
}

//确认新增或者更新（编辑）
function onConfirm(formEl: FormInstance) {
  formEl.validate((isValid, invalidFields) => {
    if (isValid) {
      // console.log("this is url: ",)
      if (dialogTitle.value == '新增角色') {
        postGroupFun(addGroup)
      }
      //go there
      if (dialogTitle.value == '修改角色') {
        postGroupFun(updateGroup)
        // console.log("this is updateCharacter: ",)
      }
    }
  })
}

function postGroupFun(url: string) {
  post({
    url: url,
    data: dialogItem,
  }).then((res: any) => {
    ElMessage({
      message: res.message,
      grouping: true,
      type: res.success ? 'success' : 'error',
    })
    if (res.success) {
      dialog.value?.close();
      doRefresh()
      getFileListTree()
    }
  }).catch(console.log);
}

function onCancel(formEl: FormInstance) {
  formEl.resetFields()
  // dialogItem.gname=null
  // dialogItem.treeSelect=null
  // dialogItem.profile=null
  // console.log("this is onCancel: ", dialogItem)
}

/** deleteTableItem**/

function deleteCharacter(row: any) {
  ElMessageBox.confirm(
      '确认删除该角色?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    post({
      url: deleteGroup,
      data: {
        id: row.id,
        csysId: getSysId()
      }
    }).then((res: any) => {
      // console.log("this is deleteCharacter res: ", res)
      ElMessage({
        message: res.message,
        grouping: true,
        type: res.success ? 'success' : 'error',
      })
      if (res.success) {
        dialog.value?.close();
        doRefresh()
        getFileListTree()
      }
    })
        .catch(console.log);
  })


}

/**end***  dialog*/
//左上角树点击节点事件
const handleNodeClick = (data: Tree) => {
  currentCTitle.value = data.gname
  currentCId.value = data.id
  getFileList(data.id)
}
const defaultProps = {
  id: 'id',
  children: 'children',
  label: 'gname',
  key: 'id',
  value: 'gname',
  rank:'rank',
  isBtn:'isBtn'
}
const dataTree = ref<any>([])

//刷新
function doRefresh() {
  // dataList.value=[
  //   {
  //     nickName:'test',
  //     description:'普普通通'
  //   }
  // ]
  let id = 0
  if (currentCId.value) {
    // console.log("this is : currentCId", currentCId)
    id = currentCId.value
  }
  getFileList(id)
  // getFileListTree()
}

//获取树
function getFileListTree() {
  post({
    url: getGroupTreeByCsysId,
    data: {
      csysId: getSysId(),
    },
  }).then((res: any) => {
    dataTree.value = [{
      id: 0,
      gname: getSysName(),
      children: res,
      rank:1
    }]
  })
      .catch(console.log);
}

// 获取列表
function getFileList(id: number) {
  tableLoading.value = true
  let footInfo = tableFooter.value?.withPageInfoData()
  post({
    url: getGroupListByCsysId,
    data: {
      csysId: getSysId(),
      pid: id,
      cPage: footInfo?.page,
      pSize: footInfo?.pageSize
    },
  }).then((res: any) => {
    // console.log("this is getGroupListByCsysId: ", res)
    const data: any = res.result
    dataList.value = data.list
    // dataList.value = data.list
    // tableFooter.value?.setTotalSize(data.total);
    tableFooter.value?.setTotalSize(data.total);
    tableLoading.value = false
  })
      .catch(console.log);
}

onMounted(() => {
  doRefresh();
  getFileListTree()
});

</script>

<style scoped>
/*.container{*/
/*  !*display: flex;*!*/
/*  !*justify-content:space-between;*!*/
/*  !*overflow: hidden;*!*/
/*}*/
.demo-form-inline {
  padding: 5px 40px;
}

.form-input {
  width: 70%;
}
.main-container {
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}

.left-box {
  width: 500px;
  background: white;
  display: inline-block;
  margin-right: 2px;
}

.table_title {
  font-size: 18px;
  color: var(--el-color-primary);
  padding: 25px 0 0 20px;
  background: white;
}

.table_title2 {
  font-size: 18px;
  color: var(--el-color-primary);
  margin-right: 30px;
}

.file_tree {
  padding: 10px;
}

.menu_tree {
  padding-left: 100px;
}
:deep(.el-card){
  border-radius: 0 !important;
}
.menu_tree :deep(.el-tree-node__content) {
  margin: 5px;
  height: 50px;

  /*color: #8dc63f;*/
}

.menu_tree :deep(.el-checkbox__inner) {
  /*background-color: darkolivegreen;*/
  height: 25px;
  width: 25px;
  border-radius: 5px;
}

.menu_tree :deep(.el-checkbox__inner::after) {
  height: 14px;
  width: 10px;
  position: absolute;
  left: 6px;
  top: 1px;
}

.menu_tree :deep(.el-checkbox__inner::before) {
  top: 9px;
}

.menu_tree :deep(.el-tree-node__expand-icon) {
  cursor: pointer;
  color: var(--el-color-primary);
  font-size: 22px;
}

.menu_tree :deep(.el-tree-node__expand-icon.is-leaf) {
  color: transparent;
  cursor: default;
}

.menu_tree_item {
  /*font-size: 30px;*/
  /*width: 20px;*/
  padding: 0 6px;
  height: 45px;
  line-height: 45px;
  margin: 10px;
  font-weight: 400;
  font-size: 18px;

}

.menu_tree_item_tree {
  border: 1px solid var(--el-color-primary);
  border-radius: 6px;
}

.menu_tree_item_a {
  font-size: 14px;
  color: var(--el-color-primary);
  margin: 0 5px;
}

.right-box {
  width: 100%;
  /*background: rosybrown;*/
  display: inline-block;
}

.tip_info {
  border-left: 5px solid var(--el-color-primary-light-5);
  padding-left: 15px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing:2px;
  margin-left: 30px;
}
</style>
<style lang="scss" scoped>
.tree-box {
  background: #fff;
  padding: 20px 0px 20px 25px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.top-title--btn {
  padding: 0px 0px 10px;
  border-bottom: 1px dashed #eeeeee;
}
:deep(.el-tree-node__content){
  //background: none;
}
:deep {
  .cjl_tree_box {
    padding: 1.06rem 0px;
    padding-left: 11px;
  }

  .cjl_tree_box .el-tree-node__content {
  }

  .cjl_tree_box .el-tree-node__expand-icon {
    font-size: 18px !important;
    font-weight: 600 !important;
  }

  .cjl_tree_box .n-icon {
    font-size: 18px !important;
  }

  .cjl_tree_box .custom-tree-node {
    margin-left: 8px;
    font-size: 16px;
  }


  .cjl_tree_box .el-tree-node .el-tree-node__content {
    height: 38px !important;
  }

  .cjl_tree_box .el-tree-node .el-tree-node__content:hover {
    background-color: transparent;
  }

  .cjl_tree_box .el-tree-node .el-tree-node__content:hover .el-tree-node__label {
    background: #EBEBEB;
    border: none;
    border-radius: 6px;
    font-weight: 400;
    line-height: 25px;
    color: #333333;
  }

  .cjl_tree_box .el-tree-node .el-tree-node__children {
    padding: 3px 0px;
  }

  .cjl_tree_box .el-tree-node .el-tree-node__content .el-tree-node__label {
    padding: 2px 25px 2px 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 25px;
    color: #333;
    display: flex;
    align-items: center;
  }

  .cjl_tree_box .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent !important;
  }

  .cjl_tree_box .el-tree-node.is-current .el-tree-node__content .el-tree-node__label {
    background-color: var(--el-color-primary-light-2);
    border: none !important;
    border-radius: 6px;
    font-weight: 400;
    line-height: 25px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }

  .cjl_tree_box .el-tree-node.is-current .el-tree-node__children .el-tree-node__label {
    background: transparent;
    border: none;
    border-radius: 6px;
    font-weight: 400;
    line-height: 25px;
    color: #333333;
  }

  .add_menu_btn {
    background-color: var(--el-color-primary-light-2);
    color: var(--el-color-white);
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

  .contex-menu-wrapper {
    position: absolute;
    width: 130px;
    z-index: 999;
    list-style: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.51), 0 0 6px rgba(0, 0, 0, 0.47);
    background-color: white;
    padding-left: 0;

    & > li {
      width: 100%;
      line-height: 40px;
      padding-left: 15px;
      box-sizing: border-box;
    }

    & > li:hover {
      background-color: #f5f5f5;
    }
  }

  .n-base-selection--active, .n-base-selection--focus {
    border: 1px solid var(--el-color-primaryt) !important;
    box-shadow: none !important;
    --n-border: 1px solid var(--el-color-primary) !important;
    --n-border-active: 1px solid var(--el-color-primary) !important;
    --n-border-focus: 1px solid var(--el-color-primary) !important;
    --n-border-hover: 1px solid var(--el-color-primary) !important;
    /*    --n-box-shadow-active:*/
    --n-box-shadow-active: 0 0 0 1px var(--el-color-primary-light-5) !important;
    --n-box-shadow-focus: 0 0 0 1px var(--el-color-primary-light-5) !important;
  }

  .n-base-selection:hover {
    border: 1px solid var(--el-color-primaryt) !important;
    box-shadow: none !important;
    --n-border: 1px solid var(--el-color-primary) !important;
    --n-border-active: 1px solid var(--el-color-primary) !important;
    --n-border-focus: 1px solid var(--el-color-primary) !important;
    --n-border-hover: 1px solid var(--el-color-primary) !important;
  }

  .table--footer {
    padding: 0.53rem 0px 0.23rem;
    text-align: right;

    .el-pagination {
      justify-content: center;
    }
  }

  .add__menu {
    padding-right: 45px;
  }

  .add__menu, .add__menu_btn {
    padding-bottom: 1.23rem;
  }

  .el-alert__content p {
    margin: 0px !important;
  }

  .zdy_el_f_item {
    margin-bottom: 8px !important;
  }

  .el-form-item {
    margin-bottom: 22px;
  }
}
</style>
