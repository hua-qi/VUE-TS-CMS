// 全局配置入口文件

// UI 组件全局注册
import registerElement from "./register-element";
// 属性/方法 全局注册
import registerProperties from "./register-properties";

import { App } from "vue";
// 参数 app 的类型
export function globalRegister(app: App): void {
  // 1. 函数调用方式 (易理解)
  // registerElement(app);
  // 2. 插件安装方式
  app.use(registerElement);
  app.use(registerProperties);
}
