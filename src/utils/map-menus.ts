import { IBreadcrumb } from "@/base-ui/breadcrumb";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  // 角色路由
  const routes: RouteRecordRaw[] = [];
  // 1. 首先加载默认所有的routes （数组包裹）
  const allRoutes: RouteRecordRaw[] = [];
  // 1.1. webpack方法，递归(true)查找文件夹下文件(正则匹配)
  const routeFiles = require.context("../router/main", true, /\.ts/);
  // webpack方法，文件路径遍历
  routeFiles.keys().forEach((key) => {
    // 获取文件模块对象 (路径处理+拼接)
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });

  // 2. 然后，根据菜单获取需要添加的routes
  /*
  userMenus:
  type === 1 -> children -> type === 1/2
  type === 2 -> url -> route
  递归函数实现
   */
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 两者路径匹配后，返回 allRoutes[] 元素
        const route = allRoutes.find((route) => route.path === menu.url);
        // 该元素添加至角色路由数组中
        if (route) routes.push(route);
        // 第一次匹配路由的菜单进行赋值
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        // 递归调用
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}

// 面包屑数组填充
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

// 用户列表中的路径匹配
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    // type===1 父级列表
    if (menu.type === 1) {
      // 递归调用
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        // 可选链调用填充数组（父级（无path+子级）（禁止跳转，不传输path）
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      // 子级列表 且 路径匹配
      return menu;
    }
  }
}

export { firstMenu };

// 递归获取用户权限组
export function mapMenusToPermissions(userMenus: any[]) {
  const permissionsList: string[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissionsList.push(menu.permission);
      }
    }
  };

  _recurseGetPermission(userMenus);
  return permissionsList;
}

// 获取 用户权限菜单 叶子节点
export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = [];

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leafKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);

  return leafKeys;
}
