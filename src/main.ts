import { createApp, App } from "vue";
import { globalRegister } from "./global";
// 样式文件
import "normalize.css";
import "./assets/css/index.less";

// 1.1. UI库 全局引入
// import ElementPlus from "element-plus";
// 1.2. UI库 样式(官方强烈建议 全局引入样式)
// import "element-plus/dist/index.css";

import rootApp from "./App.vue";
// (router / store)插件 注册
import router from "./router";
import store from "./store";
// store 信息加载
import { setupStore } from "./store";
// axios封装库
// import hyRequest from "./service";
// import "./service/axios_demo";
const app: App = createApp(rootApp);

// 1.3. UI库 插件安装
// app.use(ElementPlus);

// 全局配置(注册UI组件)(模块化开发) 1. 调用函数方式(易理解)
// globalRegister(app);
// 2. 插件方式 app.use会自动调用函数(包括参数app)
app.use(globalRegister);
app.use(store);
// 注意 vuex 和 router 插件 执行顺序
setupStore(); // 刷新时,vuex重加载
app.use(router);

app.mount("#app");

// 获取全局配置变量
// console.log(process.env.VUE_APP_BASE_URL);
// console.log(process.env.VUE_APP_BASE_NAME);

// 定义请求数据返回值类型
/* interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

// 泛型 + 接口类型
hyRequest
  .request<DataType>({
    url: "/home/multidata",
    method: "GET",
    // 单独拦截
    interceptors: {
      requestInterceptor: (config) => {
        // console.log("单独请求的config");
        return config;
      },
      responseInterceptor: (res) => {
        // console.log("单独响应的response");
        return res;
      },
    },
  })
  .then((res) => {
    // console.log(res.data);
    // console.log(res.returnCode);
    // console.log(res.success);
  });
hyRequest
  .get<DataType>({
    url: "/home/multidata",
    // 默认显示 loading
    showLoading: false,
  })
  .then((res) => {
    // console.log(res);
  }); */
