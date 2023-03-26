import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";

import { Layout, mapTwoLevelRouter } from "@/layouts";

/**
 * 这里存放一些系统必要的路由，不需要权限控制。如：登录、重定向、404等，可以根据自己的实际情况进行修改
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)*",
        component: (): any => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    hidden: true,
    component: (): any => import("@/views/exception/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: Login,
  },
  {
    path: "/",
    redirect: "/index/welcome",
    hidden: true,
  },

];

/**
 * 这里存放一些需要进行权限控制的页面，但是不需要在菜单接口返回的路由信息，如某些页面的二级详情页面。
 */
export const asyncRoutes = [
  // {
  //   path: "/index",
  //   name: "root",
  //   component: Layout,
  //   meta: {
  //     title: "主页",
  //     icon: "HouseIcon",
  //     isSingle:true
  //   },
  //   children: [
  //     {
  //       path: "welcome",
  //       name: "welcome",
  //       component: (): any => import("@/views/index/welcome.vue"),
  //       meta: {
  //         icon: "ok-icon-homefill",
  //         title: "首页",
  //         affix: true,
  //         cacheable: true,
  //       },
  //     }
  //   ],
  // },
];
/**
 * 初始化路由(模拟数据)
 */
export const  initRouter= [
    {
      "id": 364,
      "title": "权限管理",
      "icon": "ok-icon-settings",
      "href": "/system",
      "order": 8,
      "csysId": 92,
      "createTime": "2022-09-13 18:49:38.0",
      "modifyTime": "2022-10-11 09:08:36.0",
      "pid": 0,
      "status": 1,
      "children": [
        {
          "id": 371,
          "title": "用户管理",
          "icon": "ok-icon-friendfamous",
          "href": "/system/user",
          "order": 1,
          "csysId": 92,
          "createTime": "2022-09-13 22:24:55.0",
          "modifyTime": "2022-10-10 10:14:04.0",
          "pid": 364,
          "status": 1,
          "children": null,
          "isChanged": null,
          "checkArr": null,
          "spread": true,
          "check": false
        },
        {
          "id": 372,
          "title": "角色管理",
          "icon": "ok-icon-group",
          "href": "/system/role",
          "order": 2,
          "csysId": 92,
          "createTime": "2022-09-13 22:25:07.0",
          "modifyTime": "2022-10-10 10:14:18.0",
          "pid": 364,
          "status": 1,
          "children": null,
          "isChanged": null,
          "checkArr": null,
          "spread": true,
          "check": false
        },
        {
          "id": 3721,
          "title": "菜单管理",
          "icon": "ok-icon-group",
          "href": "/system/menu",
          "order": 2,
          "csysId": 92,
          "createTime": "2022-09-13 22:25:07.0",
          "modifyTime": "2022-10-10 10:14:18.0",
          "pid": 364,
          "status": 1,
          "children": null,
          "isChanged": null,
          "checkArr": null,
          "spread": true,
          "check": false
        }
      ],
      "isChanged": null,
      "checkArr": null,
      "spread": true,
      "check": false
    }
  ];

const router = createRouter({
  history: createWebHashHistory(),
  routes: mapTwoLevelRouter([...constantRoutes, ...asyncRoutes]),
  // routes: mapTwoLevelRouter([...constantRoutes]),
});


export default router;
