<template>
  <el-button type="primary" plain color="#626aef" size="small" @click="addUser(row)">
    授权
  </el-button>
  <CustomModal
      :showModal="showCm"
      className="dkl"
      attachDemo="#userMp"
      :mw="400"
      :mh="500"
      :modelTitle="cmTitle"
      @closeModal="closeModal"
  >
    <template #content>
      <div style="padding: 0.38rem 1.2rem">
        <!--      提示区  -->
        <div>
          <n-alert title="操作提示：">
            <template #icon>
              <n-icon :size="18">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                  <path
                      d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm-2 0C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5zm6.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"
                      fill="currentColor"></path>
                </svg>
              </n-icon>
            </template>
            1、每个用户只能分配一个角色<br>
            2、低等级的管理用户，不可为其他用户分配比自己等级还高的角色;<br>
            3、管理员可以自动降级，操作需要谨慎！
            4、鼠标移入角色名上，会弹出显示，该角色下分配菜单。
          </n-alert>
        </div>

        <div class="role_box">
          <!-- 角色和角色的菜单显示  -->
<!--          <el-radio-group v-model="isCheckRole">-->
          <div v-for="(item,index) in roleList" :key="item.id"
               class="item_box margin-bottom-sm"
               @click="selectRole(item,$event)">
            <n-dropdown trigger="hover" :options="item.menuList" key-field="id" label-field="menuName"
                        children-field="children">
<!--              <n-button :data-id="item.id">{{ item.roleName }}</n-button>-->
<!--              <el-radio :label="item.id"  label="1" size="large" border >{{ item.roleName }}</el-radio>-->
              <el-check-tag :checked="isCheckRole==item.id" >{{ item.roleName }}</el-check-tag>
            </n-dropdown>

          </div>
<!--        </el-radio-group>-->
        </div>

        <!-- 按钮区 -->
        <div class="btn_box">
          <n-button type="info"  @click="addUserRole">
            确定
          </n-button>
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
  updateUserRoleUrl, getRoleAllListUrl, getUserRoleByUserIdUrl, getALLRoleAndMenuTOListUrl,
} from "@/api/url";
import {usePost, useDataTable} from "@/hooks";
import {USER_INFO_KEY} from "@/store/keys";
import {$vfm, VueFinalModal, ModalsContainer} from '@/utils/vueFinalModal/VueFinalModal.esm.js'
import {ElLoading, ElMessage, FormInstance, TabsPaneContext} from "element-plus";

export default defineComponent({
  name: "AddSnibeUserRole",
  components: {
    VueFinalModal,
  },
  emits: ['refreshTable'],
  props: {
    row: {
      type: Object
    }
  },
  setup(props, {emit}) {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    const userId = ref(null);
    const post = usePost();
    const showCm = ref(false);
    const cmTitle = ref("");
    const closeModal = () => {
      showCm.value = false;
    }
    const defaultProps = {
      children: 'children',
      label: 'name',
      key: 'key'
    }
    const options = ref<any>([])

    let roleList = ref<any>([])
    const user = ref<any>();

    const isCheckRole = ref<any>(null);

    function addUser(row: any) {
      if (typeof userInfo === "string") {
        userId.value = JSON.parse(userInfo).id
      }
      user.value = row;
      $(".dkl").find(".vfm__content.modal-content").css({
        "width": "56%",
        "height": "66%"
      })
      showCm.value = true;
      cmTitle.value = "用户授权";
      /*获取系统的所有角色*/
      getAllRoleList();

    }

    /*
    * 获取所有的角色
    * */
    function getAllRoleList() {
      post({
        url: getALLRoleAndMenuTOListUrl,
        data: {}
      }).then((res: any) => {
        if (res.success) {
          roleList.value = res.data;
          isCheckRole.value = user.value.roleId
        }

      })
    }

    /**
     * 选择角色
     */
    function selectRole(item: any, e: any) {
      roleList.value.forEach((it: any) => {
        if (it.id != item.id) {
          it.page = false;
        }
      })
      let id: any = null;
      if ($(e.target).hasClass("n-button__content")) {
        id = $(e.target).parent().attr("data-id");
      } else {
        id = $(e.target).attr("data-id");
      }
      if (id === item.id + "") {
        if (item.page) {
          item.page = false;
          isCheckRole.value = null;
        } else {
          item.page = true;
          isCheckRole.value = item.id;
        }
      } else {
        item.page = true;
        isCheckRole.value = item.id;
      }
    }

    /**
     * 查询当前用户是否有授权的角色
     */
    // function getUSerRole() {
    //   post({
    //     url: getUserRoleByUserIdUrl,
    //     data: user.value
    //   }).then((res: any) => {
    //     if (res.success) {
    //       roleList.value.forEach((val: any) => {
    //         if (res.result.roleId == val.id) {
    //           val.page = true;
    //           isCheckRole.value = val.id;
    //         }
    //       })
    //     }
    //
    //   })
    // }

    function addUserRole() {
      /*
      * 1、先插入用户信息
      * 2、插入用户的额 角色信息
      * */
      user.value.roleId=isCheckRole.value;
      user.value.c_user=userId.value;
      user.value.userId=user.value.id;
      post({
        url: updateUserRoleUrl,
        data: user.value
      }).then((res: any) => {
        if (res.code==200){
          emit("refreshTable");
          ElMessage.success(res.message)
        }else {
          ElMessage.error(res.message)
        }
          /*
          * 调用父组件函数，刷新表格
          * */
          closeModal()

      })
    }

    onMounted(() => {

    })

    return {
      showCm,
      cmTitle,
      closeModal,
      addUser,
      defaultProps,
      roleList,
      selectRole,
      addUserRole,isCheckRole
    }
  }
})
</script>

<style scoped lang="scss">
.role_box {
  display: flex;
  padding: 2.2rem 0px;
  flex-flow:row wrap;
  .item_box {
    margin-right: 0.86rem;

    .n-button {
      --n-ripple-color: var(--el-color-primary-light-2) !important;
      --n-text-color: rgb(51, 54, 57);
      --n-text-color-hover: var(--el-color-primary-light-4) !important;
      --n-text-color-pressed: var(--el-color-primary-light-4) !important;
      --n-text-color-focus: var(--el-color-primary-light-2) !important;
      --n-border: 0px solid rgb(224, 224, 230);
      --n-border-hover: 0px solid var(--el-color-primary-light-2) !important;
      --n-border-pressed: 0px solid var(--el-color-primary-light-2) !important;
      --n-border-focus: 0px solid var(--el-color-primary-light-2) !important;
      --n-border-disabled: 0px solid rgb(224, 224, 230);
    }

    .n-button:not(.n-button--disabled):hover {
      background-color: transparent !important;
      color: var(--el-color-primary-light-2) !important;
    }

  }

}
</style>