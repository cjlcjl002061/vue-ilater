<template>
  <div class="login-container">
    <div class="left">
      <img :src="ImageBg1"/>
      <div class="content">
        <img :src="logo"/>
        <div class="proj-name">{{ projectNameEN }}</div>
        <div class="desc">质量管理云系统</div>
        <div class="ttiipp">致力于服务实验室质量分析</div>
        <div class="bottom">
          {{ projectName + "    " + version }} · Made by snibe
        </div>
      </div>
    </div>
    <div class="right">
      <el-card class="form-wrapper">
        <div class="title">账号登录</div>
        <div class="item-wrapper">
          <el-input
              v-model="username"
              placeholder="请输入用户名/手机号"
              clearable
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <IphoneIcon/>
              </el-icon>
            </template>
          </el-input>
        </div>
        <div class="item-wrapper margin-top-lg">
          <el-input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              clearable
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <LockIcon/>
              </el-icon>
            </template>
          </el-input>
        </div>
        <div class="item-wrapper margin-top-lg">
          <!--          <el-select v-model="lId" >-->
          <!--            <el-option v-for="item in lList" :label="item.country" :value="item.id"></el-option>-->
          <!--          </el-select>-->
        </div>
        <div class="flex-sub"></div>
        <div class="flex-sub"></div>
        <div class="margin-top-lg">
          <el-button
              type="primary"
              class="login"
              :loading="loading"
              @click="onLogin"
          >
            登录
          </el-button>
        </div>
        <div class="my-width flex-sub margin-top">
          <div class="flex justify-between">
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import ImageBg1 from "@/assets/img_login_bg_01.jpg";
import logo from "@/assets/logo.png";
import {post, Response} from "@/api/http";
import { loginUrl} from "@/api/url";
import {ElMessage} from "element-plus";
import {useMessage} from 'naive-ui'
import {UserState} from "@/store/types";
import setting from "../../setting";
import useUserStore from "@/store/modules/user";
import base from "@/utils/base64";
import {onMounted} from "@vue/runtime-core";

export default defineComponent({
  name: "Login",
  setup() {
    const lList=ref()
    const lId=ref()
    const authorityButton=ref()
    const projectNameEN = setting.projectNameEN;
    const projectNameCN = setting.projectNameCN;
    const version = setting.version;
    const username = ref("");
    const password = ref("");
    const autoLogin = ref(true);
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const isShow = ref(false);
    let isCheck = ref(false);
    let base64 = new base();
    const onLogin = () => {
      if (username.value == "") {
        ElMessage({
          type: 'error',
          message: `用户名位必填项 `,
        })
        return false;
      }
      if (password.value == "") {
        ElMessage({
          type: 'error',
          message: `密码位必填项 `,
        })
        return false;
      }

      // if (isCheck.value == false) {
      //   ElMessage({
      //     type: 'error',
      //     message: `请点击按钮进行验证 `,
      //   })
      //   return false;
      // }
      loading.value = true;
        /**企业用户登陆*/
        let User = reactive({
          account: username.value,
          password: base64.encode(password.value)
        })
        post({
          url: loginUrl,
          data: User,
        })
            .then((res:any) => {
              if (res.code==200){
                const item :any=res.result
                // item.languageId=lId.value
                userStore.saveUser(item as UserState).then(() => {
                  router
                      .replace({
                        path: route.query.redirect
                            ? (route.query.redirect as string)
                            : "/",
                      })
                      .then(() => {
                        loading.value = false;
                      });
                  // getAuthorityButton(item.roleId).then((list:any)=> {
                  //   userStore.changeAuthorityButton(list)
                  // })
                });
              }else {
                loading.value = false;
                ElMessage.error(res.message);
              }

            })
            .catch((error) => {
              loading.value = false;
              ElMessage.error(error.message);
            });
    };

    const onShow = () => {
      isShow.value = true;
    };

    const onClose = () => {
      isShow.value = false;
      console.log(isCheck.value);
    };

    const onSuccess = () => {
      isCheck.value = true;
      onClose(); // 验证成功，需要手动关闭模态框
    };
    //获取已授权按钮
    const getAuthorityButton=(id:any)=>{
      // return new Promise((resolve, reject) => {
      //   post({
      //     url:getAuthorityButtonUrl,
      //     data:{
      //       roleId:id,
      //       menuType:2,
      //       plartform:1
      //     }
      //   }).then((res:any)=>{
      //     if (res.code==200){
      //       resolve(res.result)
      //     }else {
      //       resolve([])
      //     }
      //   })
      // })
    }

    onMounted(()=>{
      //获取语言
      // lListStore.refreshLanguageList().then(()=>{
      //   lList.value = lListStore.value
      //   const item:any=lListStore.value[0]
      //   lId.value=item.id
      // })


    })
    return {
      projectNameEN,
      projectNameCN,
      version,
      username,
      password,
      autoLogin,
      loading,
      onLogin,
      ImageBg1,
      logo,
      isShow,
      onShow,
      onClose,
      onSuccess,authorityButton,
      isCheck,
      getAuthorityButton,
      lList,
      lId,
      value: ref(100)
    };
  },

});

</script>

<style lang="scss" scoped>
@keyframes scale-to {
  0% {
    transform: scale(0.2, 0.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

$leftWith: 35%;
.login-container {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;

  .left {
    position: relative;
    width: $leftWith;
    min-width: $leftWith;
    max-width: $leftWith;
    overflow: hidden;

    & > img {
      height: 100%;
      width: 100%;
      object-fit: fill;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;

      & > img {
        width: 100px;
        height: 100px;
        margin-top: 20%;
      }

      .proj-name {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        margin-top: 10px;
      }

      .desc {
        font-size: 18px;
        color: #fff;
        margin-top: 10px;
      }

      .ttiipp {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 500;
        font-size: 30px;
        text-shadow: 0 0 5px var(--el-color-primary),
        0 0 15px var(--el-color-primary), 0 0 50px var(--el-color-primary),
        0 0 150px var(--el-color-primary);
        animation: scale-to 1s linear;
      }

      .bottom {
        color: silver;
        margin-bottom: 5%;
        font-size: 16px;
      }
    }
  }

  .right {
    flex: 1;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .form-wrapper {
      width: 50%;

      .title {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .login {
        width: 100%;
      }
    }
  }

  .footer {
    width: 50%;
    margin-top: 20px;

    .justify-evenly {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      margin-top: -4px;
      margin-bottom: -4px;

      .dingding_btn {
        color: #0081ff;
        display: flex;
        cursor: pointer;

        .n-icon {
          font-size: 24px !important;
        }

        span {
          font-size: 16px;
        }
      }

      .dingding_btn:hover {
        cursor: pointer;
      }

      .dingding_btn:active {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}
//
//@media screen and( max-width: 966px) {
//  .left {
//    display: none;
//  }
//  .right {
//    background-image: url("../../assets/img_login_mobile_bg_01.jpg");
//    background-size: cover;
//
//    .form-wrapper {
//      width: 80% !important;
//    }
//  }
//}
</style>
