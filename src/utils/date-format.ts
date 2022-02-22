import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// 向dayjs添加 utc 格式转换插件
dayjs.extend(utc);

// 定义默认变量
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
// utc格式时间 转换
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  if (utcString) {
    // utcOffset(8) 0时区向 东8区 时间偏移
    return dayjs.utc(utcString).utcOffset(8).format(format);
  } else {
    return "";
  }
}
// 时间戳时间 转换
export function formatTimestamp(
  timestamp: number,
  format: string = DATE_TIME_FORMAT
) {
  if (timestamp) {
    return dayjs.unix(timestamp).format(format);
  } else {
    return "";
  }
}
