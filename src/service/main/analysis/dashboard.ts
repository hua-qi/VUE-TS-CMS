// 1. 引入 基础请求函数
import hyRequest from "@/service/index";

// 2. 枚举类型 所需请求
enum DashboardAPT {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
}

// 3. 导出 相关请求函数
export function getCategoryGoodsCount() {
  return hyRequest.get({
    url: DashboardAPT.categoryGoodsCount,
  });
}
export function getCategoryGoodsSale() {
  return hyRequest.get({
    url: DashboardAPT.categoryGoodsSale,
  });
}
export function getCategoryGoodsFavor() {
  return hyRequest.get({
    url: DashboardAPT.categoryGoodsFavor,
  });
}
export function getAddressGoodsSale() {
  return hyRequest.get({
    url: DashboardAPT.addressGoodsSale,
  });
}
