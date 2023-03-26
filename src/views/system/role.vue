<template>
  <div class="main-container" id="roleMP" style="height: 100%">
    <el-row :gutter="10"
            style="height: 100%;padding-left: 16px;padding-right:16px;padding-top:10px;padding-bottom:5px;border-radius: 8px 8px 8px 8px;">
      <!-- 左边     -->
      <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="6" style="height: 100% ;padding: 20px" class="r_col_box l_col_box">
        <div class="tree-box">
          <!-- top-title&btn-->
          <div class="top-title--btn">
            <p style="margin: 0px;font-size: 16px;font-weight: 600;" class="top-tilte_p">角色组织架构</p>
            <!--            右键菜单有操作功能-->
            <!--             <n-button type="info" dashed size="small" @click="delChoose">
                           取消选中
                         </n-button>-->
          </div>
          <!--树结构区域 @node-contextmenu="treeNodeContent"-->
          <n-scrollbar style="max-height: 770px">
            <el-tree
                ref="treeRef"
                class="cjl_tree_box"
                :data="dataSource"
                node-key="id"
                default-expand-all
                icon="ArrowRightBold"
                :expand-on-click-node="false"
                :props="defaultProps"
                @node-click="nodeClick"

            >
              <template #default="{ node }">
                <div class="el-tree-node__label">
                  <!--图标-->
                  <el-icon>
                    <UserFilled/>
                  </el-icon>
                  <span class="custom-tree-node" :data-btn="node.data.isBtn">
                    <span :data-btn="node.label">{{ node.label }}</span>
                  </span>
                </div>

              </template>
            </el-tree>
          </n-scrollbar>
          <ul
              v-show="showContextMenu"
              class="contex-menu-wrapper"
              :style="contextMenuStyle"
          >
            <li @click="onClickContextMenu">
              <el-button
                  :underline="false"
                  link
              >新增角色
              </el-button>
            </li>

          </ul>
        </div>
      </el-col>

      <!-- 右边     -->
      <el-col :xs="24" :sm="12" :md="16" :lg="17" :xl="18"
              style="height: 100% ;padding: 0px;"
              class="r_col_box">
        <TableBody>
          <template #tableConfig>
            <TableConfig
                v-model:border="tableConfig.border"
                v-model:stripe="tableConfig.stripe"
                @refresh="doRefresh"
            >
              <template #actions>
                <n-button secondary strong @click="onAddItem" class="add_menu_btn zdy_btn_main">
                  <template #icon>
                    <n-icon size="18">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                           viewBox="0 0 32 32">
                        <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" fill="currentColor"></path>
                      </svg>
                    </n-icon>
                  </template>
                  新增角色
                </n-button>
              </template>
            </TableConfig>
          </template>
          <template #default>
            <el-table
                v-loading="tableLoading"
                :data="roleTable"
                :header-cell-style="tableConfig.headerCellStyle"
                :size="tableConfig.size"
                :stripe="tableConfig.stripe"
                :border="tableConfig.border"
                row-key="id"
                :height="tableHeight"
            >
              <!--              <el-table-column-->
              <!--                  align="center"-->
              <!--                  label="序号"-->
              <!--                  fixed="left"-->
              <!--                  width="150"-->
              <!--              >-->
              <!--                <template v-slot="scope">-->
              <!--                  {{ scope.$index + 1 }}-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <el-table-column
                  align="center"
                  label="角色名称"
                  prop="roleName"
              />
              <el-table-column
                  align="center"
                  label="角色描述"
                  prop="roleDescription"
              />
              <el-table-column
                  align="center"
                  label="是否是管理"
                  prop="icon"
              >
                <template #default="scope">
                  <div v-if="scope.row.rank==1">是</div>
                  <div v-else>否</div>
                </template>
              </el-table-column>

              <el-table-column
                  align="center"
                  label="操作"
                  fixed="right"
              >
                <template v-slot="scope">
                  <el-button
                      plain
                      type="primary"
                      size="small"
                      @click="onUpdateItem(scope.row)"
                  >编辑
                  </el-button>
                  <RoleMenu :row="scope.row"></RoleMenu>
                  <el-button
                      plain
                      style="margin-left: 12px"
                      type="danger"
                      size="small"
                      v-if="scope.row.id!= userStore.roleId"
                      @click="onDeleteItem(scope.row)"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template #footer>
            <div class="table--footer">

            </div>

          </template>
        </TableBody>
      </el-col>

    </el-row>

    <vue-final-modal v-model="showModal"
                     class="kll"
                     classes="modal-container"
                     content-class="modal-content"
                     overlay-class="kkk"
                     :z-index-auto="true"
                     :z-index-base="2000"
                     :drag="true"
                     :esc-to-close="false"
                     :click-to-close="false"
                     :resize="true"
                     attach="#roleMP"
                     :max-width="Infinity"
                     :max-height="Infinity"
                     :min-width="500"
                     :min-height="500"
                     drag-selector=".modal__title"
    >
      <a class="modal__close" @click="showModal = false">
        <n-icon size="28">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
            <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                fill="currentColor"></path>
          </svg>
        </n-icon>
      </a>
      <span class="modal__title">{{ modelTitle }}</span>
      <div class="modal__content">

        <div v-if="modelType">
          <div class="add__menu" v-if="showModal">
            <el-form
                ref="roleAdd"
                class="base-form-container"
                :model="roleAddModel"
                label-width="130px"
                label-position="right"
            >
              <!--              roleAddModel.rolePid{{roleAddModel.rolePid}}-->
              <el-form-item label="上级角色" class="zdy_el_f_item">
                <n-tree-select
                    :options="dataSource"
                    key-field="id"
                    :default-value="roleAddModel.rolePid"
                    label-field="roleName"
                    :default-expand-all="true"
                    @update:value="changeRole"
                    :clearable="true"
                />
              </el-form-item>
              <el-form-item label="">
                <el-alert
                    type="warning"
                    show-icon
                    :closable="false"
                    style="padding:3px 15px"
                >
                  <p>如果不选择上级菜单，默认创建一级菜单 !</p>
                </el-alert>

              </el-form-item>
              <el-form-item
                  label="角色名称"
                  prop="roleName"
                  :rules="[
                              { required: true, message: '角色名称是必填项！' },
                            ]"
              >
                <el-input
                    v-model.trim="roleAddModel.roleName"
                    placeholder="请输入角色名称"
                />
              </el-form-item>
              <el-form-item
                  label="角色描述"
                  prop="roleDescription"
                  :rules="[
                              { required: true, message: '角色描述是必填项！' },
                            ]"
              >
                <el-input
                    v-model.trim="roleAddModel.roleDescription"
                    placeholder="请输入角色描述"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="是否管理员">
                <el-radio-group v-model="roleAddModel.rank">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              <el-form-item label="角色类型">-->
              <!--                <el-radio-group v-model="roleAddModel.roleType">-->
              <!--                  <el-radio label="1">企业</el-radio>-->
              <!--                  <el-radio label="0">客户</el-radio>-->
              <!--                </el-radio-group>-->
              <!--              </el-form-item>-->

            </el-form>
            <div style="text-align: center">
              <n-button secondary strong class="add_menu_btn" @click="addRoleUp(roleAdd)">
                <!--                <template #icon>-->
                <!--                  <n-icon size="18">-->
                <!--                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"-->
                <!--                         x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M368.5,240H272v-96.5c0-8.8-7.2-16-16-16c-8.8,0-16,7.2-16,16V240h-96.5c-8.8,0-16,7.2-16,16c0,4.4,1.8,8.4,4.7,11.3-->
                <!--		c2.9,2.9,6.9,4.7,11.3,4.7H240v96.5c0,4.4,1.8,8.4,4.7,11.3c2.9,2.9,6.9,4.7,11.3,4.7c8.8,0,16-7.2,16-16V272h96.5-->
                <!--		c8.8,0,16-7.2,16-16C384.5,247.2,377.3,240,368.5,240z"></path></g></svg>-->
                <!--                  </n-icon>-->
                <!--                </template>-->
                确认
              </n-button>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="add__menu" v-if="showModal">
            <el-form
                ref="roleAdd"
                class="base-form-container"
                :model="roleAddModel"
                label-width="130px"
                label-position="right"
            >
              <!--              roleAddModel.rolePid{{roleAddModel.rolePid}}-->
              <el-form-item label="上级角色" class="zdy_el_f_item">
                <n-tree-select
                    :options="dataSource"
                    key-field="id"
                    :default-value="roleAddModel.rolePid"
                    label-field="roleName"
                    :default-expand-all="true"
                    :clearable="true"
                    @update:value="changeRole"
                />
              </el-form-item>
              <el-form-item label="">
                <el-alert
                    type="warning"
                    show-icon
                    :closable="false"
                    style="padding:3px 15px"
                >
                  <p>如果不选择上级菜单，默认创建一级菜单 !</p>
                </el-alert>

              </el-form-item>
              <el-form-item
                  label="角色名称"
                  prop="roleName"
                  :rules="[
                  { required: true, message: '角色名称是必填项！' },
                ]"
              >
                <el-input
                    v-model.trim="roleAddModel.roleName"
                    placeholder="请输入角色名称"
                />
              </el-form-item>
              <el-form-item
                  label="角色描述"
                  prop="roleDescription"
                  :rules="[
                  { required: true, message: '角色描述是必填项！' },
                ]"
              >
                <el-input
                    v-model.trim="roleAddModel.roleDescription"
                    placeholder="请输入角色描述"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="是否管理员">
                <el-radio-group v-model="roleAddModel.rank">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              <el-form-item label="角色类型">-->
              <!--                <el-radio-group v-model="roleAddModel.roleType">-->
              <!--                  <el-radio label="1">企业</el-radio>-->
              <!--                  <el-radio label="0">客户</el-radio>-->
              <!--                </el-radio-group>-->
              <!--              </el-form-item>-->

            </el-form>
            <div style="text-align: center">
              <n-button secondary strong class="add_menu_btn" @click="editRoleUp(roleAdd)">
                <!--                <template #icon>-->
                <!--                  <n-icon size="18">-->
                <!--                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"-->
                <!--                         x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M368.5,240H272v-96.5c0-8.8-7.2-16-16-16c-8.8,0-16,7.2-16,16V240h-96.5c-8.8,0-16,7.2-16,16c0,4.4,1.8,8.4,4.7,11.3-->
                <!--		c2.9,2.9,6.9,4.7,11.3,4.7H240v96.5c0,4.4,1.8,8.4,4.7,11.3c2.9,2.9,6.9,4.7,11.3,4.7c8.8,0,16-7.2,16-16V272h96.5-->
                <!--		c8.8,0,16-7.2,16-16C384.5,247.2,377.3,240,368.5,240z"></path></g></svg>-->
                <!--                  </n-icon>-->
                <!--                </template>-->
                确认
              </n-button>
            </div>
          </div>
        </div>

      </div>

      <div class="modal__action">
        <!--        <v-button @click="showModal = false">confirm</v-button>
                <v-button @click="showModal = false">cancel</v-button>-->
      </div>
    </vue-final-modal>


  </div>
</template>

<script lang="ts">
import $ from "jquery";
import {computed, h, onMounted, reactive, ref, shallowReactive, watch} from "vue";
import {defineComponent} from "@vue/runtime-core";
import store from "@/layouts/store/index";
import {
  deleteMenuUrl, deleteRoleUrl,

  editRoleUrl,
  getRoleAllListUrl,
  uploadRoleUrl
} from "@/api/url";
import {usePost, useDataTable} from "@/hooks";
import {USER_INFO_KEY} from "@/store/keys";
import {$vfm, VueFinalModal, ModalsContainer} from '@/utils/vueFinalModal/VueFinalModal.esm.js'
import {ElLoading, ElMessage, ElMessageBox, ElTree, FormInstance} from "element-plus";
import {getWorkH} from "@/utils";
import useUserStore from "@/store/modules/user";

export default defineComponent({
  name: "Role",
  components: {
    VueFinalModal,
  },
  setup() {
    const userStore = useUserStore()
    const post = usePost();
    /*表格高度*/
    const borderA = ref(263)
    const tableHeight = computed(() => {
      return getWorkH(borderA.value);
    });
    /*用户信息*/
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    const userId = ref(null);
    const showModal = ref(false);
    const defaultProps = {
      children: 'children',
      label: 'roleName'
    }
    const treeRef = ref<InstanceType<typeof ElTree>>()
    let dataSource = ref<any>([]);
    /*当前页面选中的菜单*/
    const currentMenuSelect = ref(0)
    let showContextMenu = ref(false);
    let contextMenuStyle = reactive({
      left: 0 + "px",
      top: 0 + "px",
    })

    /*表格参数*/
    let {tableLoading, tableConfig, dataList, handleSuccess} = useDataTable();
    let roleTable = ref<any>([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    /*获取角色树的方法*/
    const getRoleTree = () => {
      let Role = reactive({
        rolePid: null,
      })
      /*左边的菜单请求*/
      post({
        url: getRoleAllListUrl,
        data: Role,
      })
          .then((res: any) => {
            if (res.success) {
              dataSource.value = res.data;
            }
          })
          .catch(console.log);
    }
    /*树节点被点击方法*/
    const nodeClick = (data: any) => {
      console.log("this is data: ", data)
      roleTable.value = [data]
      currentMenuSelect.value = data.id;
      // getTableList();
    }
    /*右键树结构*/
    const treeNodeContent = (event: any, data: any, Node: any, nodes: any) => {
      let elContent = nodes.ctx.$el.getBoundingClientRect()
      let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      let y = elContent.y + scrollY
      let nSs = $(".n-scrollbar")[0];
      let nss = nSs.getBoundingClientRect();
      let labelFirst = $(nodes.ctx.$el).find(".el-tree-node__content .el-tree-node__label")[0];
      let labelConten = labelFirst.getBoundingClientRect();
      /*找到文字节点对应的宽度*/
      contextMenuStyle.left = (labelConten.x - elContent.x + 60) + "px";
      contextMenuStyle.top = (y - nss.y + 80) + "px";
      showContextMenu.value = true;
    }
    /**新增按钮监听|**/
    const onClickContextMenu = () => {
      onAddItem()
    }
    /*页面刷新数据*/
    const doRefresh = (id?: any) => {
      // getRoleTree();
      // getTableList();
      let Role = {
        id: userStore.roleId,
      }
      if (id) {
        Role.id = id
      }
      /*左边的菜单请求*/
      post({
        url: getRoleAllListUrl,
        data: Role,
      })
          .then((res: any) => {
            if (res.success) {
              dataSource.value = res.data;
              if (currentMenuSelect.value != 0) {
                setTimeout(() => {
                  treeRef.value?.setCurrentKey(currentMenuSelect.value, true)
                  roleTable.value = [treeRef.value?.getCurrentNode()]
                }, 10)
              } else {
                currentMenuSelect.value = res.data[0].id
                setTimeout(() => {
                  treeRef.value?.setCurrentKey(currentMenuSelect.value, true)
                  roleTable.value = [treeRef.value?.getCurrentNode()]
                  tableLoading.value = false
                }, 10)
                // nodeClick(res.data[0])
                // getTableList();
              }
            }
          })
          .catch(console.log);
    }
    const closeMenu = () => {
      showContextMenu.value = false;
    }

    /*新增角色*/
    let modelTitle = ref("新增角色")
    /*1代表：新增，2：代表编辑*/
    let modelType = ref(true)
    const roleAdd = ref<FormInstance>()
    let roleAddModel = reactive({
      id: null,
      roleName: "",
      roleDescription: "",
      rolePid: 0,
      rank: "0",
      createUser: null,
      roleType: "0"
    })
    /*打开新增角色的弹窗*/
    const onAddItem = () => {
      modelType.value = true
      modelTitle.value = '新增角色'
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0,0,0,0.62)',
      })

      $(".kll").find(".vfm__content.modal-content").css({
        "width": "45%"
      })
      //setPrimaryColor(store.state.primaryColor)
      roleAddModel.id = null;
      roleAddModel.roleName = "";
      roleAddModel.roleDescription = "";
      roleAddModel.rolePid = currentMenuSelect.value;
      roleAddModel.rank = "0";
      roleAddModel.roleType = "0"
      roleAdd.value?.resetFields()
      showModal.value = true;
      /*重置表单样式*/
      setTimeout(() => {
        loading.close()
      }, 100)
    }
    /*新增角色树下拉选择事件*/
    const changeRole = (value: any, option: any) => {
      roleAddModel.rolePid = value;
    }
    //检查角色名称
    const checkSameName = (tree: any, value: any, id: any) => {
      let stark: any = [];
      stark = stark.concat(tree);
      while (stark.length) {
        const temp = stark.shift();
        if (temp.children) {
          stark = stark.concat(temp.children);
        }
        if (temp.roleName == value) {
          if (temp.id != id) {
            return true;
          }
        }
      }
      return false;
    }
    /*提交新增菜单*/
    /*上传添加菜单请求*/
    const addRoleUp = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          //查看名称是否重复
          if (checkSameName(dataSource.value, roleAddModel.roleName, null)) {
            ElMessage.warning('角色名称重复')
            return 0
          }

          roleAddModel.createUser = userId.value;
          /*左边的菜单请求*/
          post({
            url: uploadRoleUrl,
            data: roleAddModel,
          })
              .then((res: any) => {
                if (res.success) {
                  ElMessage.success(res.message)
                } else {
                  ElMessage.error(res.message)
                }
                showModal.value = false
                doRefresh()
              })
              .catch(console.log);


          /*发送添加请求到后端*/
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    /*编辑角色*/
    const onUpdateItem = (item: any) => {
      modelType.value = false;
      modelTitle.value = "编辑角色"

      roleAddModel.id = item.id;
      roleAddModel.rolePid = item.rolePid;
      roleAddModel.roleName = item.roleName;
      roleAddModel.roleDescription = item.roleDescription;
      roleAddModel.roleType = item.roleType + "";
      roleAddModel.rank = item.rank + "";
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0,0,0,0.62)',
      })

      $(".kll").find(".vfm__content.modal-content").css({
        "width": "45%"
      })
      roleAdd.value?.resetFields()
      showModal.value = true;
      /*重置表单样式*/
      setTimeout(() => {
        loading.close()
      }, 100)
    }
    /*上传编辑菜单请求*/
    const editRoleUp = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          roleAddModel.createUser = userId.value;
          if (checkSameName(dataSource.value, roleAddModel.roleName, roleAddModel.id)) {
            ElMessage.warning('角色名称重复')
            return 0
          }
          /*左边的菜单请求*/
          post({
            url: editRoleUrl,
            data: roleAddModel,
          })
              .then((res: any) => {
                if (res.code == 200) {
                  ElMessage.success('编辑角色成功！')
                  showModal.value = false;
                  doRefresh();
                } else {
                  ElMessage.error(res.message)
                }
              })
              .catch(console.log);


          /*发送添加请求到后端*/
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    //删除
    function onDeleteItem(item: any) {
      const pid = item.rolePid
      ElMessageBox.confirm("是否要删除此角色？").then(() => {
        post({
          url: deleteRoleUrl,
          data: item
        }).then((res: any) => {
          if (res.code == 200) {
            ElMessage.success(res.message)
            currentMenuSelect.value = pid
            doRefresh();
          } else {
            ElMessage.error(res.message)
          }
        })
      }).catch(() => {
      });
    }


    watch(showContextMenu, (newValue) => {
      if (newValue) {
        $(".el-tree-node__content").on("click", function () {
          closeMenu()
        })
        document.body.addEventListener("click", closeMenu);
      } else {
        $(".el-tree-node__content").on("click", function () {
          closeMenu()
        })
        document.body.removeEventListener("click", closeMenu);
      }
    })
    onMounted(() => {
      doRefresh();
      // getTableList();
      if (typeof userInfo === "string") {
        userId.value = JSON.parse(userInfo).id
      }
      console.log("userId= " + userId.value);

    })

    return {
      doRefresh, userStore,
      defaultProps,
      tableHeight,
      borderA,
      dataSource,
      getRoleTree,
      nodeClick,
      currentMenuSelect,
      treeNodeContent,
      tableLoading,
      tableConfig,
      dataList,
      handleSuccess,
      roleTable,
      currentPage,
      pageSize,
      total,
      showContextMenu,
      contextMenuStyle,
      closeMenu,
      onAddItem,
      modelTitle,
      showModal,
      modelType,
      roleAddModel,
      changeRole,
      addRoleUp,
      roleAdd,
      onUpdateItem,
      editRoleUp,
      onClickContextMenu,
      treeRef, onDeleteItem


    }
  }
})
</script>

<style lang="scss" scoped>
.tree-box {
  background: #FAFAFA;
  padding: 20px 16px;
  border: 1px solid #DCE1E6;
  height: 100%;
  border-radius: 8px 8px 8px 8px;

  :deep {
    .el-tree {
      background: transparent;
    }
  }
}

.top-title--btn {
  padding: 0px 0px 10px 16px;
  border-bottom: 1px dashed #eeeeee;
}

:deep {
  .cjl_tree_box {
    padding: 1.06rem 0px;
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
    height: 53px;

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
.top-tilte_p {
  position: relative;

  &:before {
    content: "";
    width: 4px;
    height: 16px;
    background: var(--el-color-primary);
    position: absolute;
    top: 4px;
    left: -10px;
  }
}
.r_col_box {
  background: var(--el-color-white);

  :deep {
    .el-table__inner-wrapper {
      &:before {
        background: transparent;
      }
    }
  }

  border-radius: 0px 8px 8px 0px;
}

.l_col_box {
  border-right: 1px solid #E2E7EB;
  border-radius: 8px 0px 0px 8px;
}
</style>

<style lang="scss" scoped>
::v-deep .main-section {
  position: relative !important;
}

.main-section .kll {
  width: 100% !important;
  height: 100% !important;
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem 0rem 1rem 0rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0px 1rem;

}

.modal__title:hover {
  cursor: move;
}

.modal__content {
  flex-grow: 1;
  overflow-y: auto;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  padding: 1.25rem 1.35rem 1.25px;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 1rem 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.modal__close:hover {
  cursor: pointer;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>