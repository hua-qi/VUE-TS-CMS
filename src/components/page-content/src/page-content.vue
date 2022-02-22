<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 一：header 插槽 -->
      <template #headerHanlder>
        <el-button type="primary" v-if="isCreate" @click="handleAddClick()">
          <el-icon>
            <plus />
          </el-icon>
          <span> {{ addTitle }} </span>
        </el-button>
      </template>
      <!-- 二：列中插槽(三个个通用插槽) -->
      <!-- 1.#slotName 对应名称插槽 -->
      <!-- 2.#slotName="scope" 获取子组件插槽中数据 -->
      <template #createAt="scope">
        <!-- $filters 全局注册属性 -->
        <strong> {{ $filters.formatTime(scope.row.createAt) }} </strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            type="text"
            size="mini"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            <el-icon>
              <edit />
            </el-icon>
            <span>编辑</span>
          </el-button>
          <el-button
            type="text"
            size="mini"
            class="delete-btn"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon>
              <delete />
            </el-icon>
            <span>删除</span>
          </el-button>
        </div>
      </template>

      <!-- 特殊插槽组遍历 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { HyTable } from "@/base-ui/table";
import { usePermission } from "@/hooks/use-permission";

export default defineComponent({
  components: {
    HyTable,
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
    addTitle: {
      type: String,
      required: true,
    },
  },
  emits: ["addBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    // 获取该用户所具有的操作权限
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");

    const store = useStore();

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    // 监听 pageInfo
    watch(pageInfo, () => getPageData());
    // 转至 store/system 中使用action 请求数据
    // pageUrl （自定义） 提高代码复用
    // 发送网络请求函数（返回：方便父组件进行调用）
    const getPageData = (queryInfo: any = {}) => {
      // 先行判断是否具有query权限
      if (!isQuery) return;
      store.dispatch("system/getPageListAction", {
        // 获取父组件传递的 pageName
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };
    getPageData();
    const dataList = computed(() =>
      // 调用store.getters 函数
      store.getters["system/pageListData"](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters["system/pageListCount"](props.pageName)
    );

    // 适用于各组件的特殊插槽组
    const otherPropSlots = props.contentTableConfig?.propsList.filter(
      (item: any) => {
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      }
    );

    // 删除/编辑/新建 操作
    const handleDeleteClick = (item: any) => {
      console.log(item);
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
        },
      });
    };
    // 向父组件发送事件
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };
    const handleAddClick = () => {
      emit("addBtnClick");
    };

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      handleDeleteClick,
      handleEditClick,
      handleAddClick,
    };
  },
});
</script>

<style scoped>
.delete-btn {
  color: red;
}
</style>
