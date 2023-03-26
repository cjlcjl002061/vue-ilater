import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "dayjs/locale/zh-cn";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "@/icons/iconfont/iconfont.css";
import "@/icons/iconfont/iconfont.js";
import "@/icons/fonts/iconfont.css";
import "@/icons/fonts/iconfont.js";
import naive from "naive-ui";


import "@/styles/main.css";
import LayoutStore from "@/layouts";
import http from "@/api/http";
import { registerComponents } from "./components";
import * as Icons from "@element-plus/icons";
import pinia from "./store/pinia";

import "./setting";

const app = createApp(App);
Object.keys(Icons).forEach((it) => {
  app.component(it, (Icons as any)[it]);
});
registerComponents(app);
app.use(LayoutStore, {
  state: {
    layoutMode: "ltr",
  },
  actions: {
    onPersonalCenter() {
      router.push({ path: "/personal", query: { uid: 1 } });
    },
    onLogout() {
      router.replace({ path: "/login", query: { redirect: "/" } }).then(() => {
        window.location.reload();
      });
    },
  },
});
app.use(pinia).use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(naive);
app.use(http);
app.mount("#app");
