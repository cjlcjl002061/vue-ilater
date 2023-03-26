import LayoutStore, { Layout } from "@/layouts";
import { isExternal, mapTwoLevelRouter } from "@/layouts/utils";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router, { asyncRoutes, constantRoutes } from "../router";
import Cookies from "js-cookie";
import { post } from "@/api/http";
import {getMenuListByRoleIdUrl, getMenuListUrl} from "@/api/url";
import { RouteRecordRaw } from "vue-router";
import { toHump } from ".";
import { RouteRecordRawWithHidden } from "@/layouts/types";
import useUserStore from "@/store/modules/user";
import pinia from "@/store/pinia";
import {USER_INFO_KEY, USER_TOKEN_KEY} from "@/store/keys";
import {reactive} from "vue";
import {UserState} from "@/store/types";
import {ElMessage, ElMessageBox} from "element-plus";

const userStore = useUserStore(pinia);

NProgress.configure({
    showSpinner: false,
});

interface OriginRoute {
    menuUrl: string;
    menuName?: string;
    hidden?: boolean;
    outLink?: string;
    affix?: boolean;
    cacheable?: boolean;
    icon?: string;
    iconActive?: string;
    iconA?: string;
    iconAActive?: string;
    iconB?: string;
    iconBActive?: string;
    tip?: string | number;
    isSingle?: boolean;
    children: Array<OriginRoute>;
    parentPath:string;
    fixed:any,
    menuHref:any
}

function getRoutes() {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    const Menu = reactive({
        // pid: 0,
        // platform: 1,
        userId:63,
        // roleId:JSON.parse(typeof userInfo === "string" ? userInfo :"").id,
        isNotBtn:1,
        type:1,
    })
    // console.log("this is Menu: ",Menu)
    return post({
        url: getMenuListUrl,
        method: "POST",
        data: Menu,
    }).then((res) => {
        return generatorRoutes(res.data);
    });
}

function getComponent(it: OriginRoute) {
    return (): any => import("@/views" + it.menuUrl + ".vue");
}

function isMenu(route: OriginRoute) {
    return route.children && route.children.length > 0;
}

function getNameByUrl(menuUrl: string) {
    const temp = menuUrl.split("/");
    return toHump(temp[temp.length - 1]);
}

function generatorRoutes(res: Array<OriginRoute>) {
    const tempRoutes: Array<RouteRecordRawWithHidden> = [];
    if(res == null ||res == undefined){
        ElMessage.error('Error Routes')
        console.log('Error Routes')
        return tempRoutes
    }
    res.forEach((it) => {
        if (it.children) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const route: RouteRecordRawWithHidden = {
                path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
                name: getNameByUrl(it.menuUrl),
                hidden: !!it.hidden,
                component: isMenu(it) ? Layout : getComponent(it),
                meta: {
                    title: it.menuName,
                    affix: it.fixed==1?true:false,
                    keepAlive: true,
                    cacheable: true,
                    icon: it.icon || "",
                    iconActive:it.iconActive || "",
                    iconA:it.iconA || "",
                    iconAActive:it.iconAActive || "",
                    iconB:it.iconB || "",
                    iconBActive:it.iconBActive || "",
                    badge: it.tip,
                    isSingle: !!it.isSingle,
                },
            };
            if (it.children) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                route.children = generatorRoutes(it.children);
            }
            tempRoutes.push(route);
        }
        else {
            if (it.parentPath == null) {
                /*没有子菜单*/
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const route: RouteRecordRawWithHidden = {
                    path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
                    name: getNameByUrl(it.menuUrl),
                    hidden: false,
                    component: Layout,
                    meta: {
                        keepAlive: true,
                        title: it.menuName,
                        affix: it.fixed==1?true:false,
                        cacheable: true,
                        icon: it.icon || "",
                        iconActive:it.iconActive || "",
                        iconA:it.iconA || "",
                        iconAActive:it.iconAActive || "",
                        iconB:it.iconB || "",
                        iconBActive:it.iconBActive || "",
                        badge: it.tip,
                        isSingle: !!it.isSingle,
                    },
                    children: [
                        {
                            path: "",
                            name: getNameByUrl(it.menuUrl),
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            hidden: true,
                            component: (): any => import("@/views" + it.menuUrl + ".vue"),
                            meta: {
                                title: it.menuName,
                                keepAlive: true,
                                cacheable: true,
                            },
                        }
                    ]
                };

                tempRoutes.push(route);
            }
            else {
                const route: RouteRecordRawWithHidden = {
                    path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
                    name: getNameByUrl(it.menuUrl),
                    hidden: !!it.hidden,
                    component: isMenu(it) ? Layout : getComponent(it),
                    meta: {
                        title: it.menuName,
                        affix: it.fixed==1?true:false,
                        keepAlive: true,
                        cacheable: true,
                        icon: it.icon || "",
                        iconActive:it.iconActive || "",
                        iconA:it.iconA || "",
                        iconAActive:it.iconAActive || "",
                        iconB:it.iconB || "",
                        iconBActive:it.iconBActive || "",
                        badge: it.tip,
                        isSingle: !!it.isSingle,
                    },
                };
                if (it.children) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    route.children = generatorRoutes(it.children);
                }
                tempRoutes.push(route);

            }
        }
    });
    return tempRoutes;
}

const whiteRoutes: string[] = ["/login"];

function isTokenExpired(): boolean {
    const token = Cookies.get(USER_TOKEN_KEY);
    return !!token;
}
router.beforeEach(async (to) => {
    NProgress.start();
    // console.log("this is to.path: ",to.path)
    // console.log("this is to: ",to)
    if (whiteRoutes.includes(to.path)) {
        NProgress.done();
        return true;
    } else {
        const isEmptyRoute = LayoutStore.isEmptyPermissionRoute();
        if (isEmptyRoute) {
            // 加载路由
            const accessRoutes: Array<RouteRecordRaw> = [];
            const tempRoutes = await getRoutes();

            accessRoutes.push(...tempRoutes);
            accessRoutes.push({
                path: "/:pathMatch(.*)*",
                redirect: "/404",
                hidden: true,
            } as RouteRecordRaw);
            const mapRoutes = mapTwoLevelRouter(accessRoutes);
            mapRoutes.forEach((it: any) => {
                router.addRoute(it);
            });
            LayoutStore.initPermissionRoute([
                ...asyncRoutes,
                ...constantRoutes,
                ...accessRoutes,
            ]);
            return { ...to, replace: true };
        }
        else {
            return true;
        }
        /*if (!isTokenExpired()) {
            NProgress.done();
            if(to.path.indexOf("login")==-1){
                let msDemo = document.querySelector(".cjl_es");
                if (!msDemo) {
                    ElMessageBox.alert('登录已失效，请重新登录!', 'QAS提示:', {
                        // if you want to disable its autofocus
                        // autofocus: false,
                        customClass: "cjl_es",
                        confirmButtonText: '去登录',
                        draggable: true,
                        showClose: false
                    })
                        .then(() => {
                            console.log("11");
                            router.replace({
                                path: "/login",
                            })
                        })
                }
            }
            else {
                return {
                    path: "/login",
                    query: { redirect: to.fullPath },
                };

            }


        }
        else {
            const isEmptyRoute = LayoutStore.isEmptyPermissionRoute();
            if (isEmptyRoute) {
                // 加载路由
                const accessRoutes: Array<RouteRecordRaw> = [];
                const tempRoutes = await getRoutes();

                accessRoutes.push(...tempRoutes);
                accessRoutes.push({
                    path: "/:pathMatch(.*)*",
                    redirect: "/404",
                    hidden: true,
                } as RouteRecordRaw);
                const mapRoutes = mapTwoLevelRouter(accessRoutes);
                mapRoutes.forEach((it: any) => {
                    router.addRoute(it);
                });
                LayoutStore.initPermissionRoute([
                    ...asyncRoutes,
                    ...constantRoutes,
                    ...accessRoutes,
                ]);
                return { ...to, replace: true };
            }
            else {
                return true;
            }
        }*/
    }
});

router.afterEach(() => {
    NProgress.done();
});
