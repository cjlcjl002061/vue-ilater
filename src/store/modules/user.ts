import LayoutStore from "@/layouts";
import Cookies from "js-cookie";

import Avatar from "@/assets/img_avatar.gif";
import { defineStore } from "pinia";
import { UserState } from "../types";
import {
  ROLE_ID_KEY,
  USER_ID_KEY,
  USER_INFO_KEY,
  USER_TOKEN_KEY,
} from "../keys";

const defaultAvatar = Avatar;

const userInfo: UserState = JSON.parse(
    localStorage.getItem(USER_INFO_KEY) || "{}"
);

const useUserStore = defineStore("user", {
  state: () => {
    return {
      userId: userInfo.userId || -1,
      roleId: userInfo.roleId || -1,
      roles: userInfo.roles || null,
      token: userInfo.token || "",
      userName: userInfo.userName || "",
      nickName: userInfo.nickName || "张三",
      avatar: userInfo.avatar || defaultAvatar,
      account:userInfo.account,
      name:userInfo.name,
      userType:userInfo.userType,
      languageId:1,
      authorityButton:userInfo.authorityButton||[],
    };
  },
  getters: {

    getUserId(): number {
      return this.userId;
    },
    getRoleId(): number {
      return this.roleId;
    },
    getName():string{
      return this.userName
    },
    getLanguageId():any{
      return this.languageId
    },
    getUserType():number{
      return this.userType
    },
    getAuthorityButton():any{
      return this.authorityButton
    },
  },
  actions: {
    saveUser(userInfo: UserState) {
      return new Promise<void>((res) => {
        userInfo.userId= userInfo.id;
        this.userId = userInfo.id;
        this.token = userInfo.token;
        this.roleId = userInfo.roleId;
        /*  this.roles = userInfo.roles;*/
        this.name = userInfo.name;
        this.nickName = userInfo.nickName;
        this.account = userInfo.account;
        this.userType=userInfo.userType
        this.languageId=userInfo.languageId
        this.authorityButton=userInfo.authorityButton
        /*  this.avatar = userInfo.avatar || defaultAvatar;*/
        Cookies.remove(USER_TOKEN_KEY,{ path: '/' })
        Cookies.set(USER_TOKEN_KEY, userInfo.token,{ path: '/' });
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        res();
      });
    },
    changeNickName(newNickName: string) {
      this.nickName = newNickName;
    },
    changeAuthorityButton(list:any){
      this.authorityButton=list
      const userInfo1 : UserState = JSON.parse(
          localStorage.getItem(USER_INFO_KEY) || "{}"
      );
      userInfo1.authorityButton=list
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo1));
    },
    logout() {
      return new Promise<void>((res) => {
        this.userId = 0;
        this.avatar = "";
        this.roleId = 0;
        this.roles = [];
        this.userName = "";
        this.nickName = "";
        this.token = "";
        Cookies.remove(USER_TOKEN_KEY);
        localStorage.clear();
        LayoutStore.reset();
        res();
      });
    },
  },
});

export default useUserStore;
