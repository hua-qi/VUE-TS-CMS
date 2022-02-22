/* eslint-disaqble */
// 每一个 .vue文件都导出 DefineComponent<> 泛型
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明模块
declare module "*.json";
