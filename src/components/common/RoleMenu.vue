<template>
  <el-button
      plain
      type="primary"
      size="small"
      @click="distrMenu(row)"
  >分配菜单
  </el-button>

  <CustomModal
      :showModal="showCm"
      className="dkl"
      attachDemo="#roleMP"
      :mw="400"
      :mh="500"
      :modelTitle="cmTitle"
      @closeModal="closeModal"
  >
    <template #content>
      <div style="padding: 0.38rem 1.2rem" v-loading="cmLoading">
        <!--提示-->
        <el-alert
            title="操作提示！"
            type="warning"
            :closable="false"
            description="more text description"
        >
          <p>
            <el-icon>
              <Star/>
            </el-icon>
            、分配时菜单和按钮可以多选；
          </p>
          <p>
            <el-icon>
              <Star/>
            </el-icon>
            、代表菜单：代表页面的按钮；
          </p>
          <p>
            <el-icon>
              <Star/>
            </el-icon>
            、全选下一级：点击后只会选中下一级菜单或按钮,其他层级不会选中；
          </p>
          <p>
            <el-icon>
              <Star/>
            </el-icon>
            、取消全选：按照正常逻辑，回取消当前节点下的所有子节点的选中状态；
          </p>

        </el-alert>
        <div class="tree_cjl_box margin-top" >
          <el-scrollbar height="420px" always>
            <el-tree
                class="cjl_tree_p"
                :data="menuDta"
                show-checkbox
                node-key="id"
                ref="pcTree"
                :default-expanded-keys="menuInitIds"
                icon="ArrowRightBold"
                :check-strictly="true"
                highlight-current
                @node-click="pcMenuNodeChange"
                :props="menuProps"
                :expand-on-click-node="false"
                @check="pcBoxChek">
              <template #default="{ node }">
                <div class="el-tree-node__label" :class="node.data.children?'hasC':''">
                  <!--图标-->
                  <n-icon size="22" v-show="node.data.menuType==1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 16 16">
                      <g fill="none">
                        <path
                            d="M8 2c-1.4 0-2.417.567-3.074 1.37a4.204 4.204 0 0 0-.898 2.154C1.965 5.735 1 7.322 1 8.5c0 .573.142 1.332.686 1.954c.556.636 1.46 1.046 2.814 1.046h.645A3.5 3.5 0 0 1 8.5 7h4c.957 0 1.824.384 2.456 1.006c-.132-.717-.545-1.304-1.088-1.724a3.865 3.865 0 0 0-1.89-.753c-.113-1.16-.638-2.022-1.349-2.603C9.841 2.28 8.85 2 8 2zm.5 6a2.5 2.5 0 0 0 0 5H9a.5.5 0 0 0 0-1h-.5a1.5 1.5 0 0 1 0-3H9a.5.5 0 0 0 0-1h-.5zM12 8a.5.5 0 0 0 0 1h.5a1.5 1.5 0 0 1 0 3H12a.5.5 0 0 0 0 1h.5a2.5 2.5 0 0 0 0-5H12zm-3.5 2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"
                            fill="currentColor"></path>
                      </g>
                    </svg>
                  </n-icon>
                  <n-icon size="22" v-show="node.data.menuType==2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 24 24">
                      <g fill="none">
                        <path
                            d="M6.01 5h1.508A1.75 1.75 0 0 1 9.25 3.5h8a3.25 3.25 0 0 1 3.25 3.25v8a1.75 1.75 0 0 1-1.5 1.732v1.509a3.25 3.25 0 0 0 3-3.241v-8A4.75 4.75 0 0 0 17.25 2h-8a3.25 3.25 0 0 0-3.24 3zM2 9.25A3.25 3.25 0 0 1 5.25 6h9.5A3.25 3.25 0 0 1 18 9.25v9.5A3.25 3.25 0 0 1 14.75 22H11.5v-3.25a2.25 2.25 0 0 0-2.25-2.25H2V9.25zM2 18v.75A3.25 3.25 0 0 0 5.25 22H10v-3.25a.75.75 0 0 0-.75-.75H2z"
                            fill="currentColor"></path>
                      </g>
                    </svg>
                  </n-icon>
                  <div class="custom-tree-node">
              <span v-if="node.data.menuType==1" @click="clickNode(node)">
                  <span class="cjl_tree_label">{{ node.data.menuName }}</span>
              </span>
                    <span v-if="node.data.menuType==2">
                  <span class="cjl_tree_label">{{ node.data.menuName }}
                    <span style="color: rgb(176, 176, 176);font-size: 14px">（按钮）</span>
                  </span>
              </span>
                    <span class="tree_cjl_btn_r">
                      <el-button
                          link
                          size="mini"
                          :data-ss="node.data.href"
                          v-if="!node.isLeaf"
                          @click="()=>checkAllChildren(node,1)"
                      >
                          <span>
                           全选下一级
                          </span>
                      </el-button>
                          <el-button
                              link
                              size="mini"
                              :data-ss="node.data.href"
                              v-if="!node.isLeaf"
                              @click="()=>checkAllChildren(node,2)"
                          >

                           <span>
                               取消全选
                           </span>
                      </el-button>
                    </span>
                  </div>
                </div>

              </template>


            </el-tree>
          </el-scrollbar>
        </div>
        <div class="btn_box_f">
          <el-button type="primary" @click="addGroupMenu">确认</el-button>
          <el-button @click="cancel" >取消</el-button>
        </div>

      </div>

    </template>

  </CustomModal>
</template>

<script lang="ts">
import $ from "jquery";
import {h, onMounted, reactive, ref, shallowReactive, watch} from "vue";
import {defineComponent} from "@vue/runtime-core";
import store from "@/layouts/store/index";
import {
   getAllRoleMenuIds,
  getMenuListUrl,
  upSetRoleMenu
} from "@/api/url";
import {usePost, useDataTable} from "@/hooks";
import {USER_INFO_KEY} from "@/store/keys";
import {$vfm, VueFinalModal, ModalsContainer} from '@/utils/vueFinalModal/VueFinalModal.esm.js'
import {ElLoading, ElMessage, FormInstance, TabsPaneContext} from "element-plus";

export default defineComponent({
  name: "RoleMenu",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueFinalModal,
  },
  props:{
    row:{
      type:Object
    }
  },
  setup: function () {
    const post = usePost();
    /*用户信息*/
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    const userId = ref(null);
    const showModal = ref(false);
    const activeName = ref('pcMenu');

    const roleType = ref(null);
    const roleItem = ref<any>();
    /*自定义弹窗*/
    const showCm = ref(false);
    const cmTitle = ref("");
    const cmLoading = ref(false)
    const distrMenu = async (item: any) => {
      roleItem.value = item;
      $(".dkl").find(".vfm__content.modal-content").css({
        "width": "70%",
        "height": "96%"
      })
      showCm.value = true;
      cmLoading.value = true
      cmTitle.value = "分配菜单";
      await getMenuListData();
      await ddMenuListData();
      await wvMenuListData();
       InitRoleMenu();
      cmLoading.value = false
    }
    const closeModal = () => {
      showCm.value = false;
    }
    /****************************************************************************************************************************************************************/

    /****************************************************************************************************************************************************/
    /*微信分配菜单参数*/
    const wvMenuDta = ref<any>([]);
    const wvMenuInitIds = ref<any>([]);
    const wvTree = ref<any>([]);
    const wvMenuNodeChange = (e: any, id: any) => {
      console.log(e);
      console.log(id);
    }
    const wvMenuListData = () => {
      return new Promise<void>(resolve => {
        /*获取PC*/
        let Menu = reactive({
          pid: 0,
          platform: 3,
          isNotBtn: 2
        })
        post({
          url: getMenuListUrl,
          data: Menu,
        })
            .then((res: any) => {
              if (res.success) {
                wvMenuDta.value = res.data;
              }
            })
            .catch(console.log).finally(resolve);
      })

    }
    const wvBoxChek = (data: any, node: any) => {
      let arr = ref<any>([]);
      /*被选中的节点集合*/
      let isCheckNode = node.checkedKeys;
      let flag = false;
      isCheckNode.forEach(function (item: any, index: any) {
        if (data.id == item) {
          flag = true;
        }
      })
      console.log(flag);
      if (flag) {
        //被选中
      } else {
        if (data.children) {
          getChild(wvMenuDta.value, data.id, arr.value);
          console.log("arr.value");
          console.log(arr.value);
          if (arr.value.length > 1) {
            let newArr = ref<any>([]);
            let list = arr.value;
            for (let i = 1; i < list.length; i++) {
              newArr.value.push(list[i])
              wvTree.value.setChecked(list[i], false, true);
            }
          }
        } else {
          wvTree.value.setChecked(data.id, false, true);
        }
      }
    }

    function wvCheckAllChildren(data: any, type: any) {
      console.log(data);
      wvTree.value.setChecked(data.data.id, true, false);
      console.log(data.data.wvCheckAllChildren);
      if (type == 1) {
        data.data.wvCheckAllChildren = true;
        data.childNodes.forEach(function (item: any) {
          console.log(item.data.id);
          wvTree.value.setChecked(item.data.id, true, false);
        })
      } else {
        data.data.wvCheckAllChildren = false;
        data.childNodes.forEach(function (item: any) {
          console.log(item.data.id);
          wvTree.value.setChecked(item.data.id, false, true);
          let arr = ref<any>([]);
          getChild(menuDta.value, item.data.id, arr.value);
          if (arr.value.length > 1) {
            let newArr = ref<any>([]);
            let list = arr.value;
            for (let i = 1; i < list.length; i++) {
              newArr.value.push(list[i])
              wvTree.value.setChecked(list[i], false, true);
            }
          }
        })
      }
    }

    function wvAddGroupMenu(e: any) {
      console.log(2);
      console.log(wvTree.value.getCheckedKeys());
      let roleMenu = reactive({
        createUser: userId.value,
        roleId: roleItem.value.id,
        platform: 3,
        menuIds: wvTree.value.getCheckedKeys()
      })
      console.log(roleMenu);
      post({
        url: upSetRoleMenu,
        data: roleMenu,
      })
          .then((res: any) => {
            if (res.success) {
              ElMessage.success('角色菜单授权成功！！');
            }
            closeModal()
          })
          .catch(console.log);
    }


    /****************************************************************************************************************************************************/
    /*钉钉分配菜单参数*/
    const ddMenuDta = ref<any>([]);
    const ddMenuInitIds = ref<any>([]);
    const ddTree = ref<any>([]);
    const ddMenuNodeChange = (e: any, id: any) => {
      console.log(e);
      console.log(id);
    }
    const ddMenuListData = () => {
      return new Promise<void>(resolve => {
        /*获取PC*/
        let Menu = reactive({
          pid: 0,
          platform: 2,
          isNotBtn: 2
        })
        post({
          url: getMenuListUrl,
          data: Menu,
        })
            .then((res: any) => {
              if (res.success) {
                ddMenuDta.value = res.data;
              }
            })
            .catch(console.log).finally(resolve);
      })

    }
    const ddBoxChek = (data: any, node: any) => {
      let arr = ref<any>([]);
      /*被选中的节点集合*/
      let isCheckNode = node.checkedKeys;
      let flag = false;
      isCheckNode.forEach(function (item: any, index: any) {
        if (data.id == item) {
          flag = true;
        }
      })
      console.log(flag);
      if (flag) {
        //被选中
      } else {
        if (data.children) {
          getChild(ddMenuDta.value, data.id, arr.value);
          console.log("arr.value");
          console.log(arr.value);
          if (arr.value.length > 1) {
            let newArr = ref<any>([]);
            let list = arr.value;
            for (let i = 1; i < list.length; i++) {
              newArr.value.push(list[i])
              ddTree.value.setChecked(list[i], false, true);
            }
          }
        } else {
          ddTree.value.setChecked(data.id, false, true);
        }
      }
    }

    function ddCheckAllChildren(data: any, type: any) {
      console.log(data);
      ddTree.value.setChecked(data.data.id, true, false);
      console.log(data.data.ddCheckAllChildren);
      if (type == 1) {
        data.data.ddCheckAllChildren = true;
        data.childNodes.forEach(function (item: any) {
          console.log(item.data.id);
          ddTree.value.setChecked(item.data.id, true, false);
        })
      } else {
        data.data.ddCheckAllChildren = false;
        data.childNodes.forEach(function (item: any) {
          console.log(item.data.id);
          ddTree.value.setChecked(item.data.id, false, true);
          let arr = ref<any>([]);
          getChild(menuDta.value, item.data.id, arr.value);
          if (arr.value.length > 1) {
            let newArr = ref<any>([]);
            let list = arr.value;
            for (let i = 1; i < list.length; i++) {
              newArr.value.push(list[i])
              ddTree.value.setChecked(list[i], false, true);
            }
          }
        })
      }
    }

    function ddAddGroupMenu(e: any) {
      console.log(2);
      console.log(ddTree.value.getCheckedKeys());
      let roleMenu = reactive({
        createUser: userId.value,
        roleId: roleItem.value.id,
        platform: 2,
        menuIds: ddTree.value.getCheckedKeys()
      })
      console.log(roleMenu);
      post({
        url: upSetRoleMenu,
        data: roleMenu,
      })
          .then((res: any) => {
            if (res.success) {
              ElMessage.success('角色菜单授权成功！！');
            }
            closeModal()
          })
          .catch(console.log);
    }

    /***********************************************************************************************************************************************************/

    /*网页分配菜单参数*/
    const menuDta = ref<any>([]);
    const menuInitIds = ref<any>([]);
    const menuProps = {
      children: 'children',
      label: 'menuName'
    }
    const getMenuListData = () => {
      return new Promise<void>(resolve => {
        /*获取PC*/
        let Menu = reactive({
          pid: 0,
          platform: 1,
          isNotBtn: 2
        })
        post({
          url: getMenuListUrl,
          data: Menu,
        })
            .then((res: any) => {
              if (res.success) {
                menuDta.value = res.data;
              }
            })
            .catch(console.log).finally(resolve);
      })

    }


    const pcMenuNodeChange = (e: any, id: any) => {
      console.log(e);
      console.log(id);
    }

    const pcTree = ref<any>([]);
    const pcBoxChek = (data: any, node: any) => {
      /*   console.log(data);
         console.log(node);
         console.log(pcTree);*/
      // console.log(pcTree.value.getCheckedNodes());
      let arr = ref<any>([]);
      /*被选中的节点集合*/
      let isCheckNode = node.checkedKeys;
      let flag = false;
      isCheckNode.forEach(function (item: any, index: any) {
        if (data.id == item) {
          flag = true;
        }
      })
      console.log(flag);
      if (flag) {
        //被选中
      } else {
        if (data.children) {
          getChild(menuDta.value, data.id, arr.value);
          console.log("arr.value");
          console.log(arr.value);
          if (arr.value.length > 1) {
            let newArr = ref<any>([]);
            let list = arr.value;
            for (let i = 1; i < list.length; i++) {
              newArr.value.push(list[i])
              // pcTree.value.setCheckedKeys([arr[i]]);\
              pcTree.value.setChecked(list[i], false, true);
            }
            // pcTree.value.setCheckedKeys([arr[i]],false);
          }

        } else {
          pcTree.value.setChecked(data.id, false, true);
        }


      }

    }
    const getChild = (nodes: any, item: any, arr: any) => {
      nodes.forEach(function (el: any, index: any) {
        if (el.id === item) {
          arr.push(el.id);
          if (el.children) {
            childNodesDeep(el.children, arr);
          }
        } else if (el.children) {
          getChild(el.children, item, arr);
        }
      })
    }
    const childNodesDeep = (nodes: any, arr: any) => {
      if (nodes)
        nodes.forEach(function (ele: any) {
          arr.push(ele.id);
          if (ele.children) {
            childNodesDeep(ele.children, arr);
          }
        });
    }

    const handleTabClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    function checkAllChildren(data: any, type: any) {
      console.log(data);
      pcTree.value.setChecked(data.data.id, true, false);
      //console.log(JSON.parse(JSON.stringify(data)));
      console.log(data.data.checkAllChildren);
      if (type == 1) {
        data.data.checkAllChildren = true;
        data.childNodes.forEach(function (item: any) {
          console.log(item.data.id);
          pcTree.value.setChecked(item.data.id, true, false);
        })

      } else {
        data.data.checkAllChildren = false;
        data.childNodes.forEach(function (item: any) {
          console.log(item.data.id);
          pcTree.value.setChecked(item.data.id, false, true);

          let arr = ref<any>([]);
          getChild(menuDta.value, item.data.id, arr.value);
          if (arr.value.length > 1) {
            let newArr = ref<any>([]);
            let list = arr.value;
            for (let i = 1; i < list.length; i++) {
              newArr.value.push(list[i])
              // pcTree.value.setCheckedKeys([arr[i]]);\
              pcTree.value.setChecked(list[i], false, true);
            }
            // pcTree.value.setCheckedKeys([arr[i]],false);
          }
        })
      }
    }

    const cancel = () => {
      closeModal()
    }

    /*点击节点名称展开*/
    function clickNode(node: any) {
      // console.log(node);
      if (node.expanded) {
        node.expanded = false;
      } else {
        node.expanded = true;
      }
    }

    function addGroupMenu() {
      console.log(pcTree.value.getCheckedKeys());
      let roleMenu = reactive({
        createUser: userId.value,
        roleId: roleItem.value.id,
        platform: 1,
        menuIds: pcTree.value.getCheckedKeys()
      })
      console.log(roleMenu);
      post({
        url: upSetRoleMenu,
        data: roleMenu,
      })
          .then((res: any) => {
            if (res.success) {
              ElMessage.success('角色菜单授权成功！！');
            }
            closeModal()
          })
          .catch(console.log);
    }

    /***********************************************************************************************************************************************/

    /*初始化已分配的菜单数据*/
    const InitRoleMenu = () => {
      roleType.value = roleItem.value.roleType
      let roleMenu = reactive({
        roleId: roleItem.value.id,
      })
      post({
        url: getAllRoleMenuIds,
        data: roleMenu,
      })
          .then((res: any) => {
            if (res.success) {
              menuInitIds.value = res.result;
              ddMenuInitIds.value = res.result;
              wvMenuInitIds.value = res.result;
              res.result.forEach(function (value: any) {
                setTimeout(function () {
                  pcTree.value.setChecked(value, true, false);
                  ddTree.value.setChecked(value, true, false);
                  wvTree.value.setChecked(value, true, false);
                }, 20)
              });
            } else {
              ElMessage.warning(res.message ? res.message : "查询结果为空！请尽快为角色分配菜单");
            }

          })
          .catch(console.log);
    }

    onMounted(() => {
      if (typeof userInfo === "string") {
        userId.value = JSON.parse(userInfo).id
      }

    });
    return {
      /*自定义弹窗，方法和参数*/
      showCm,
      cmTitle, cmLoading,
      distrMenu,
      closeModal,
      /*分配菜单*/
      menuDta,
      ddMenuDta,
      wvMenuDta,
      getMenuListData,
      ddMenuListData,
      wvMenuListData,
      menuProps,
      pcMenuNodeChange,
      ddMenuNodeChange,
      wvMenuNodeChange,
      pcBoxChek,
      ddBoxChek,
      wvBoxChek,
      activeName,
      handleTabClick,
      cancel,
      addGroupMenu,
      ddAddGroupMenu,
      wvAddGroupMenu,
      clickNode,
      pcTree,
      ddTree,
      wvTree,
      checkAllChildren,
      ddCheckAllChildren,
      wvCheckAllChildren,
      InitRoleMenu,
      menuInitIds,
      ddMenuInitIds,
      wvMenuInitIds,
    }
  }
})
</script>

<style scoped>

</style>

