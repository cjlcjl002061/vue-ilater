<template>
  <div class="pc_menu" id="mp" style="height: 100%">
    <el-row :gutter="10" style="height: 100%;padding-left: 16px;padding-right:16px;padding-top:10px;padding-bottom:5px;border-radius: 8px 8px 8px 8px;">
      <!-- 左边     -->
      <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="6" style="height: 100% ;padding: 20px" class="r_col_box l_col_box">
        <div class="tree-box">
          <!-- top-title&btn-->
          <div class="top-title--btn">
            <!--            <el-button
                            type="primary"
                            size="small"
                            icon="PlusIcon"
                            @click="onAddItem"
                        >添加
                        </el-button>-->
            <!--            <span style="color:red">右键菜单没有操作功能</span>-->
            <!--            <n-button type="info" dashed size="small" @click="delChoose">-->
            <!--              取消选中-->
            <!--            </n-button>-->

            <p style="margin: 0px;font-size: 16px;font-weight: 600;" class="top-tilte_p">菜单组织架构</p>
          </div>
          <!--树结构区域-->
          <n-scrollbar :style="{maxHeight: tableHeight+'px'}">
            <el-tree
                ref="treeRef"
                class="cjl_tree_box"
                :data="dataSource"
                node-key="id"
                icon="ArrowRightBold"
                :expand-on-click-node="false"
                :props="defaultProps"
                @node-click="nodeClick"
            >
              <template #default="{ node }">
                <div class="el-tree-node__label">
                  <!--图标-->
                  <span class="custom-tree-node" :data-btn="node.data.isBtn">

                    <span :data-btn="node.label">{{ node.label }}</span>
                  </span>
                </div>

              </template>
            </el-tree>

          </n-scrollbar>
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
                @refresh="fresh"
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
                  添加菜单
                </n-button>
              </template>
            </TableConfig>
          </template>
          <template #default>
            <el-table
                v-loading="tableLoading"
                :data="fMenuTable"
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
                  label="菜单名称"
                  prop="menuName"
              />
              <el-table-column
                  align="center"
                  label="菜单地址"
                  prop="menuHref"
              />
              <el-table-column
                  align="center"
                  label="图标"
                  prop="icon"
              >
                <template #default="scope">
                  <el-icon
                      v-if="scope.row.icon"
                      size="20"
                      style="font-size: 16px"
                      color="var(--el-color-primary)"
                  >
                    <!--                    <component :is="scope.row.icon"/>-->
                  </el-icon>
                  <div v-else>--</div>
                </template>
              </el-table-column>
              <!--              <el-table-column
                                align="center"
                                label="是否缓存"
                            >
                              <template #default="scope">
                                <el-tag
                                    :type="scope.row.cacheable ? '' : 'danger'"
                                    size="small"
                                >{{ scope.row.cacheable ? "是" : "否" }}
                                </el-tag>
                              </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="是否固定"
                            >
                              <template #default="scope">
                                <el-tag
                                    :type="scope.row.affix ? '' : 'danger'"
                                    size="small"
                                >{{ scope.row.affix ? "是" : "否" }}
                                </el-tag>
                              </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="badge提示"
                            >
                              <template #default="scope">
                                <div class="menu-badge__wrapper">
                                  <el-badge
                                      :value="
                                  parseInt(scope.row.tip)
                                    ? parseInt(scope.row.tip)
                                    : scope.row.tip
                                "
                                      :is-dot="scope.row.tip === 'dot'"
                                  >
                                  </el-badge>
                                </div>
                              </template>
                            </el-table-column>-->
              <el-table-column
                  align="center"
                  :width="200"
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
                  <el-button
                      plain
                      type="danger"
                      size="small"
                      @click="onDeleteItem(scope.row)"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
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
                     :z-index-base="1000"
                     :drag="true"
                     :esc-to-close="false"
                     :click-to-close="false"
                     :resize="true"
                     attach="#main-section"
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
        <!--      新增  -->
        <div v-if="modelType">
          <el-form class="base-form-container"
                   label-width="80px"
                   label-position="right">
            <el-form-item label="菜单类型" class="zdy_el_f_item">
              <el-radio-group v-model="radioType">
                <el-radio label="1" border>菜单</el-radio>
                <el-radio label="2" border>按钮</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="">
              <el-alert
                  type="warning"
                  show-icon
                  :closable="false"
                  style="padding:3px 15px"
              >
                <p>用户可以选择新增页面菜单或页面的按钮 !</p>
              </el-alert>

            </el-form-item>

          </el-form>
          <!-- 添加菜单页面-->
          <div class="add__menu" v-if="showModal&&radioType==1">
            <el-form
                ref="menuForm"
                class="base-form-container"
                :model="menuModel"
                label-width="80px"
                label-position="right"
            >

              <el-form-item label="上级菜单" class="zdy_el_f_item">
                <n-tree-select
                    :options="dataList"
                    key-field="id"
                    :default-value="menuModel.pid"
                    label-field="menuName"
                    :default-expand-all="true"
                    @update:value="handleUpdateValue"
                    clearable
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
                  label="菜单名称"
                  prop="menuName"
                  :rules="[
                  { required: true, message: '按钮名称是必填项！' },
                ]"
              >
                <el-input
                    v-model="menuModel.menuName"
                    placeholder="请输入菜单名称"
                />
              </el-form-item>
              <el-form-item
                  label="url地址"
                  prop="menuHref"
                  :rules="[
                  { required: true, message: 'url地址是必填项！' },
                ]"
              >
                <el-input
                    v-model="menuModel.menuHref"
                    placeholder="请输入url地址"

                >
                </el-input>
              </el-form-item>
              <el-form-item label="图标选择" prop="icon" :rules="[
                  { required: false, message: '图标是必填项！' },
                ]">
                <!--                <IconSelector v-model:value="menuModel.icon"/>-->
                <!--    三个框            -->

<!--                :icon="menuModel.icon"
                :iconActive="menuModel.iconActive"-->
                <IconSvgSelect

                    :iconA="menuModel.iconA"
                    :iconB="menuModel.iconB"

                    :iconAActive="menuModel.iconAActive"
                    :iconBActive="menuModel.iconBActive"
                    @SelectTow="SelectTow"
                    @SelectThr="SelectThr"
                    @Select4f="Select4f"
                    @Select5f="Select5f"
                    @Select6f="Select6f"
                ></IconSvgSelect>
              </el-form-item>

            </el-form>
            <div style="text-align: center">
              <n-button secondary strong class="add_menu_btn" @click="upMenu(menuForm)">
                <template #icon>
                  <n-icon size="18">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M368.5,240H272v-96.5c0-8.8-7.2-16-16-16c-8.8,0-16,7.2-16,16V240h-96.5c-8.8,0-16,7.2-16,16c0,4.4,1.8,8.4,4.7,11.3
		c2.9,2.9,6.9,4.7,11.3,4.7H240v96.5c0,4.4,1.8,8.4,4.7,11.3c2.9,2.9,6.9,4.7,11.3,4.7c8.8,0,16-7.2,16-16V272h96.5
		c8.8,0,16-7.2,16-16C384.5,247.2,377.3,240,368.5,240z"></path></g></svg>
                  </n-icon>
                </template>
                确定提交
              </n-button>
            </div>
          </div>
          <!-- 添加按钮页面-->
          <div class="add__menu_btn" v-if="showModal&&radioType==2">
            <el-form
                ref="btnMenuForm"
                class="base-form-container"
                :model="btnMenuBean"
                label-width="80px"
                label-position="right"

            >
              <el-form-item label="上级菜单" prop="pid" :rules="[
                  { required: true, message: '按钮名称是必填项！' },
                ]">
                <n-tree-select
                    :options="dataList"
                    key-field="id"
                    label-field="menuName"
                    :clearable="true"
                    :default-expand-all="true"
                    :default-value="btnMenuBean.pid"
                    @update:value="btnMenuPid"
                />
              </el-form-item>
              <el-form-item
                  label="按钮名称"
                  prop="menuName"
                  :rules="[
                  { required: true, message: '按钮名称 is required' },
                ]"
              >
                <el-input
                    v-model="btnMenuBean.menuName"
                    placeholder="请输入按钮名称"
                />
              </el-form-item>
              <el-form-item
                  label="英文ID"
                  prop="menuHref"
                  :rules="[
                  { required: true, message: '英文ID是必填项！' },
                ]"
              >
                <el-input
                    v-model="btnMenuBean.menuHref"
                    placeholder="英文ID"
                >
                </el-input>
              </el-form-item>

            </el-form>
            <div style="text-align: center">
              <n-button secondary strong class="add_menu_btn" @click="upBtnMenu(btnMenuForm)">
                <template #icon>
                  <n-icon size="18">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M368.5,240H272v-96.5c0-8.8-7.2-16-16-16c-8.8,0-16,7.2-16,16V240h-96.5c-8.8,0-16,7.2-16,16c0,4.4,1.8,8.4,4.7,11.3
		c2.9,2.9,6.9,4.7,11.3,4.7H240v96.5c0,4.4,1.8,8.4,4.7,11.3c2.9,2.9,6.9,4.7,11.3,4.7c8.8,0,16-7.2,16-16V272h96.5
		c8.8,0,16-7.2,16-16C384.5,247.2,377.3,240,368.5,240z"></path></g></svg>
                  </n-icon>
                </template>
                确定提交
              </n-button>
            </div>
          </div>
        </div>

        <!--       编辑 -->
        <div v-else>
          <!--编辑单页面-->
          <div class="add__menu" v-if="showModal&&radioType==1">

            <el-form
                ref="menuFormEdit"
                class="base-form-container"
                :model="menuModel"
                label-width="80px"
                label-position="right"
            >

              <el-form-item label="上级菜单" class="zdy_el_f_item">
                <n-tree-select
                    :options="dataList"
                    key-field="id"
                    :default-value="menuModel.pid"
                    label-field="menuName"
                    :default-expand-all="true"
                    :clearable="true"
                    @update:value="handleUpdateValue"
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
                  label="菜单名称"
                  prop="menuName"
                  :rules="[
                  { required: true, message: '按钮名称是必填项！' },
                ]"
              >
                <el-input
                    v-model="menuModel.menuName"
                    placeholder="请输入菜单名称"
                />
              </el-form-item>
              <el-form-item
                  label="url地址"
                  prop="menuHref"
                  :rules="[
                  { required: true, message: 'url地址是必填项！' },
                ]"
              >
                <el-input
                    v-model="menuModel.menuHref"
                    placeholder="请输入url地址"

                >
                </el-input>
              </el-form-item>
              <el-form-item label="图标选择" prop="icon" :rules="[
                  { required: false, message: '图标是必填项！' },
                ]">
                <!--                <IconSelector v-model:value="menuModel.icon"/>-->
                :icon="menuModel.icon"
                :iconActive="menuModel.iconActive"
                <IconSvgSelect
                    :iconA="menuModel.iconA"
                    :iconB="menuModel.iconB"
                    :iconAActive="menuModel.iconAActive"
                    :iconBActive="menuModel.iconBActive"
                    @SelectTow="SelectTow"
                    @SelectThr="SelectThr"
                    @Select4f="Select4f"
                    @Select5f="Select5f"
                    @Select6f="Select6f"
                ></IconSvgSelect>
              </el-form-item>

            </el-form>
            <div style="text-align: center">
              <n-button secondary strong class="add_menu_btn" @click="editMenu(menuFormEdit)">
                <template #icon>
                  <n-icon size="18">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M368.5,240H272v-96.5c0-8.8-7.2-16-16-16c-8.8,0-16,7.2-16,16V240h-96.5c-8.8,0-16,7.2-16,16c0,4.4,1.8,8.4,4.7,11.3
		c2.9,2.9,6.9,4.7,11.3,4.7H240v96.5c0,4.4,1.8,8.4,4.7,11.3c2.9,2.9,6.9,4.7,11.3,4.7c8.8,0,16-7.2,16-16V272h96.5
		c8.8,0,16-7.2,16-16C384.5,247.2,377.3,240,368.5,240z"></path></g></svg>
                  </n-icon>
                </template>
                确定编辑
              </n-button>
            </div>
          </div>
          <div class="add__menu_btn" v-if="showModal&&radioType==2">
            <el-form
                ref="btnMenuForm"
                class="base-form-container"
                :model="btnMenuBean"
                label-width="80px"
                label-position="right"

            >
              <el-form-item label="上级菜单" prop="pid" :rules="[
                  { required: true, message: '按钮名称是必填项！' },
                ]">
                <n-tree-select
                    :options="dataList"
                    key-field="id"
                    label-field="menuName"
                    :clearable="true"
                    :default-expand-all="true"
                    :default-value="btnMenuBean.pid"
                    @update:value="btnMenuPid"
                />
              </el-form-item>
              <el-form-item
                  label="按钮名称"
                  prop="menuName"
                  :rules="[
                  { required: true, message: '按钮名称 is required' },
                ]"
              >
                <el-input
                    v-model="btnMenuBean.menuName"
                    placeholder="请输入按钮名称"
                />
              </el-form-item>
              <el-form-item
                  label="英文ID"
                  prop="menuHref"
                  :rules="[
                  { required: true, message: '英文ID是必填项！' },
                ]"
              >
                <el-input
                    v-model="btnMenuBean.menuHref"
                    placeholder="英文ID"
                >
                </el-input>
              </el-form-item>

            </el-form>
            <div style="text-align: center">
              <n-button secondary strong class="add_menu_btn" @click="editBtnMenu(btnMenuForm)">
                <template #icon>
                  <n-icon size="18">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M368.5,240H272v-96.5c0-8.8-7.2-16-16-16c-8.8,0-16,7.2-16,16V240h-96.5c-8.8,0-16,7.2-16,16c0,4.4,1.8,8.4,4.7,11.3
		c2.9,2.9,6.9,4.7,11.3,4.7H240v96.5c0,4.4,1.8,8.4,4.7,11.3c2.9,2.9,6.9,4.7,11.3,4.7c8.8,0,16-7.2,16-16V272h96.5
		c8.8,0,16-7.2,16-16C384.5,247.2,377.3,240,368.5,240z"></path></g></svg>
                  </n-icon>
                </template>
                确定编辑
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
import type {DialogType} from "@/components/types";
import {getWorkH, uuid} from "@/utils";
import {computed, h, onMounted, reactive, ref, shallowReactive, unref} from "vue";
import {ElMessage, ElMessageBox, ElTree} from "element-plus";
import {usePost, useDataTable} from "@/hooks";
import {addMenuUrl, deleteMenuUrl, editMenuUrl, getMenuListUrl, getMenuListToTableUrl} from "@/api/url";
import {Plus} from "@element-plus/icons";
// import VueFinalModal from '@/lib/VueFinalModal.vue'
import {$vfm, VueFinalModal, ModalsContainer} from '@/utils/vueFinalModal/VueFinalModal.esm.js'
import {defineComponent} from "@vue/runtime-core";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import {repeat} from 'seemly'
import {NIcon, TreeOption} from 'naive-ui'
import {ChevronForward} from '@vicons/ionicons5'
import {usePrimaryColor} from "@/layouts/hooks";
import store from '@/layouts/store/index'
import {setPrimaryColor} from "@/hooks/naviveUiStyle";
import {ElLoading} from 'element-plus'
import type {FormInstance, FormRules,} from 'element-plus'
import {USER_INFO_KEY} from "@/store/keys";

export default defineComponent({
  name: "App",
  components: {
    VueFinalModal,
  },
  setup: function () {
    /*表格高度*/
    const borderA = ref(300)
    const tableHeight = computed(() => {
      return getWorkH(borderA.value);
    });
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    const userId = ref(null);
    const menuModel = reactive<any>({
      id: null,
      pid: 0,
      menuHref: "",
      menuName: "",
      icon: "",
      menuType: 1,
      platform: 1,
      createUser: null,
      iconA: "",
      iconB: "",
      iconActive: "",
      iconAActive: "",
      iconBActive: "",
    });

    const btnMenuBean = reactive<any>({
      id: null,
      pid: 0,
      menuHref: "",
      menuName: "",
      icon: "",
      menuType: 2,
      platform: 1,
      createUser: null,
      iconA: "",
      iconB: "",
    })
    let {tableLoading, tableConfig, dataList, handleSuccess} = useDataTable();
    const disableLoad = ref(false);
    const dialogRef = ref<DialogType>();
    const menuList = ref([]);
    const post = usePost();
    const defaultProps = {
      children: 'children',
      label: 'menuName'
    }
    //树对象
    const treeRef = ref<InstanceType<typeof ElTree>>()
    //树内容
    let dataSource = ref<any>([]);
    const showModal = ref(false);
    const modelType = ref(false);
    const menuModelPid = ref(null)
    //fMenuTable父菜单内容
    const fMenuTable = ref<any>()
    let menuTable = ref<any>([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    /*弹窗页面*/
    const radioType = ref<any>("1");
    /*当前页面选中的菜单*/
    const currentMenuSelect = ref(0)

    const modelTitle = ref("新增菜单");

    const menuForm = ref<FormInstance>()
    const btnMenuForm = ref<FormInstance>()
    const menuFormEdit = ref<FormInstance>()

    function doRefresh() {

      let Menu = reactive({
        // pid: 0,
        // platform: 1,
        isNotBtn: 2
      })
      /*左边的菜单请求*/
      post({
        url: getMenuListUrl,
        data: Menu,
      })
          .then((res: any) => {
            if (res.success) {
              dataSource.value = res.data;
              dataList.value = res.data
              setTimeout(() => {
                treeRef.value?.setCurrentKey(currentMenuSelect.value, true)
                setTimeout(() => {
                  if (currentMenuSelect.value == 0) {
                    fMenuTable.value = []
                  } else {
                    fMenuTable.value = [treeRef.value?.getCurrentNode()]
                  }
                  tableLoading.value = false
                }, 10)
              }, 10)
            }

          })
          .catch(console.log);
      /*右边菜单表格数据*/
      // getTableList();
    }

    /*右边菜单表格数据*/
    const getTableList = () => {
      // let MenuTable = reactive({
      //   pid: currentMenuSelect.value,
      //   platform: 1,
      //   page: currentPage.value,
      //   limit: pageSize.value
      // })
      // post({
      //   url: getMenuListToTable,
      //   data: MenuTable,
      // })
      //     .then((res: any) => {
      //       if (res.success) {
      //         menuTable.value = res.data.list;
      //         // tableFooter.value!.res.data.total
      //         total.value = res.data.total
      //         console.log(res.data.total);
      //       }
      //       tableLoading.value = false
      //     })
      //     .catch(console.log);
    }

    const delChoose = () => {
      currentMenuSelect.value = 0
      doRefresh();
    }

    /*点击添加菜单按钮*/
    function onAddItem() {
      modelType.value = true;
      modelTitle.value = "新增菜单"
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0,0,0,0.62)',
      })
      restFromData()

      $(".kll").find(".vfm__content.modal-content").css({
        "width": "45%"
      })
      //setPrimaryColor(store.state.primaryColor)
      showModal.value = true;
      /*重置表单样式*/
      menuForm.value?.resetFields()
      btnMenuForm.value?.resetFields();
      setTimeout(() => {
        loading.close()
      }, 500)
    }

    /*重置表单的数据信息*/
    function restFromData() {

      /*菜单的*/
      menuModel.pid = currentMenuSelect.value;
      menuModel.id = null;
      menuModel.menuHref = "";
      menuModel.menuName = "";

      menuModel.platform = 1;
      menuModel.icon = "";
      menuModel.iconA = "";
      menuModel.iconB = "";
      menuModel.iconActive = "";
      menuModel.iconAActive = "";
      menuModel.iconBActive = "";
      btnMenuBean.pid = currentMenuSelect.value;
      btnMenuBean.id = null;
      btnMenuBean.menuHref = "";
      btnMenuBean.menuName = "";
      btnMenuBean.icon = "";
      btnMenuBean.platform = 1;


    }

    /*树节点被点击*/
    const nodeClick = (data: any) => {
      fMenuTable.value = [data]
      console.log("this is nodeClick data: ", fMenuTable.value[0])
      /*
      * 选中菜单，发送请求到都断获取，菜单下面的子菜单或按钮。
      * */
      if (currentMenuSelect.value != data.id) {
        currentMenuSelect.value = data.id;
        console.log("this is currentMenuSelect: ", currentMenuSelect.value)
        // getTableList();
      }
    }

    /*上传添加菜单请求*/
    const upMenu = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          menuModel.createUser = userId.value;
          /*发送添加请求到后端*/
          post({
            url: addMenuUrl,
            data: menuModel,
          })
              .then((res: any) => {
                if (res.success) {
                  ElMessage.success("新增成功")
                } else {
                  ElMessage.error(res.message)
                }
                showModal.value = false
                doRefresh()
              })
              .catch(console.log);
        } else {
          console.log('error submit!')
          return false
        }
      })
    }


    /*上传按钮菜单请求*/
    const upBtnMenu = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          btnMenuBean.createUser = userId.value;
          /*发送添加请求到后端*/
          post({
            url: addMenuUrl,
            data: btnMenuBean,
          })
              .then((res: any) => {
                if (res.success) {
                  ElMessage.success('新增按钮成功！')
                }
                showModal.value = false
                doRefresh()
              })
              .catch(console.log);
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    /*分页插件函数*/
    const handleSizeChange = (val: number) => {
      pageSize.value = val;
      getTableList();
    }
    const handleCurrentChange = (val: number) => {
      currentPage.value = val;
      getTableList();
    }


    function onDeleteItem(item: any) {
      const pid = item.pid
      ElMessageBox.confirm("是否要删除此数据？").then(() => {
        post({
          url: deleteMenuUrl,
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

    function handleUpdateValue(value: any, option: any) {
      console.log(value, option)
      menuModel.pid = value;
    }

    function btnMenuPid(value: any, option: any) {
      console.log(value, option)
      btnMenuBean.pid = value;
    }

    onMounted(() => {
      doRefresh();

      if (typeof userInfo === "string") {
        userId.value = JSON.parse(userInfo).id
      }
      console.log("userId= " + userId.value);

    });

    function confirmUp() {
      console.log(1);
    }

    /*自组建回传选中的icon*/
  /*  const SelectOne = (item: any) => {
      console.log(item);
      if (modelType.value) {
        /!*新增*!/
        menuModel.icon = item.url;
      } else {
        menuModel.icon = item.url;
      }

    }*/

    const SelectTow = (item: any) => {
      console.log(item);

      if (modelType.value) {
        /*新增*/
        menuModel.iconA = item.url
      } else {
        menuModel.iconA = item.url;
      }
    }

    const SelectThr = (item: any) => {
      console.log(item);
      if (modelType.value) {
        /*新增*/
        menuModel.iconB = item.url
      } else {
        menuModel.iconB = item.url
      }
    }

    const Select4f = (item: any) => {
      console.log(item);
      if (modelType.value) {
        /*新增*/
        menuModel.iconActive = item.url
      } else {
        menuModel.iconActive = item.url
      }
    }
    const Select5f = (item: any) => {
      console.log(item);
      if (modelType.value) {
        /*新增*/
        menuModel.iconAActive = item.url
      } else {
        menuModel.iconAActive = item.url
      }
    }
    const Select6f = (item: any) => {
      console.log(item);
      if (modelType.value) {
        /*新增*/
        menuModel.iconBActive = item.url
      } else {
        menuModel.iconBActive = item.url
      }
    }

    /**********************编辑函数模块*****************************************/

    /*点击弹窗*/
    function onUpdateItem(item: any) {
      modelType.value = false;

      if (item.menuType == 1) {
        modelTitle.value = "编辑菜单"
        radioType.value = 1
        menuFormEdit.value?.resetFields();
        /*是菜单*/
        menuModel.id = item.id;
        menuModel.pid = item.pid;
        menuModel.menuName = item.menuName;
        menuModel.menuHref = item.menuHref;
        menuModel.icon = item.icon;
        menuModel.iconA = item.iconA;
        menuModel.iconB = item.iconB;

        menuModel.iconActive = item.iconActive;
        menuModel.iconAActive = item.iconAActive;
        menuModel.iconBActive = item.iconBActive;
        menuModel.menuType = item.menuType
      } else {
        modelTitle.value = "编辑按钮"
        radioType.value = 2
        btnMenuBean.id = item.id;
        btnMenuBean.pid = item.pid;
        btnMenuBean.menuName = item.menuName;
        btnMenuBean.menuHref = item.menuHref;
        btnMenuBean.menuType = item.menuType
      }

      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0,0,0,0.62)',
      })

      $(".kll").find(".vfm__content.modal-content").css({
        "width": "45%"
      })
      //setPrimaryColor(store.state.primaryColor)
      showModal.value = true;
      /*重置表单样式*/
      /*menuForm.value?.resetFields()
      btnMenuForm.value?.resetFields();*/
      setTimeout(() => {
        loading.close()
      }, 500)


    }

    /*上传添加菜单请求*/
    const editMenu = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          menuModel.createUser = userId.value;
          console.log("this is menuModel: ", menuModel)
          /*发送添加请求到后端*/
          post({
            url: editMenuUrl,
            data: menuModel,
          })
              .then((res: any) => {
                if (res.success) {
                  ElMessage.success('编辑菜单成功！');
                  showModal.value = false;
                  doRefresh();
                }
              })
              .catch(console.log);
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    /*上传添加按钮请求*/
    const editBtnMenu = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          btnMenuBean.createUser = userId.value;
          /*发送添加请求到后端*/
          post({
            url: editMenuUrl,
            data: btnMenuBean,
          })
              .then((res: any) => {
                if (res.success) {
                  ElMessage.success('编辑按钮成功！');
                  showModal.value = false;
                  doRefresh();
                }
              })
              .catch(console.log);
        } else {
          console.log('error submit!')
          return false
        }
      })
    }


    return {
      tableLoading, tableConfig, dataList, handleSuccess, menuModel, doRefresh, delChoose, editBtnMenu,
      disableLoad, dialogRef, menuList, fMenuTable, onAddItem, onUpdateItem, onDeleteItem,
      showModal, modelType, modelTitle,
      dataSource, defaultProps, tableHeight, borderA, treeRef,
      confirmUp, menuModelPid,
      handleUpdateValue,
      nodeClick, menuTable,
      currentPage, pageSize, total, handleSizeChange, handleCurrentChange,
      radioType, btnMenuBean, upMenu, upBtnMenu, menuForm, btnMenuForm, btnMenuPid,
      editMenu, menuFormEdit,SelectTow, SelectThr, Select5f, Select6f
    };
  }
})
</script>

<style lang="scss" scoped>
.icon-wrapper {
  list-style: none;
  border: 1px solid #f5f5f5;
  overflow: hidden;
  padding: 0;

  .icon-item {
    float: left;
    width: 25%;
    font-size: 26px;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    text-align: center;
    cursor: pointer;

    & > div {
      font-size: 12px;
    }

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
}

.pc_menu {
  /*height: calc(100vh - 211px);*/
}

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

::v-deep {
  .cjl_tree_box {
    padding: 1.06rem 0px;
  }

  .cjl_tree_box .el-tree-node__content {
  }

  .cjl_tree_box .el-tree-node__expand-icon {
    font-size: 15px !important;
    font-weight: 600 !important;
  }

  .cjl_tree_box .n-icon {
    font-size: 16px !important;
  }

  .cjl_tree_box .custom-tree-node {
    margin-left: 8px;
    font-size: 15px;
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
  :deep{
    .el-table__inner-wrapper{
      &:before{
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