import { App } from "vue";
import { formatUtcString } from "@/utils/date-format";

export default function (app: App) {
  // $ 编码习惯 标识全局属性/方法
  app.config.globalProperties.$filters = {
    foo() {
      console.log("foo");
    },
    formatTime(value: string) {
      return formatUtcString(value);
    },
  };
}
