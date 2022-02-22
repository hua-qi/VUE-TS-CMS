<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="hanlder">
          <slot name="headerHanlder"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60px"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序列号"
        width="80px"
        align="center"
      />
      <template v-for="propItem in propsList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 默认名称作用域插槽 -->
          <template #default="scope">
            <!-- 动态绑定名称给插槽 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // header-title
    title: {
      type: String,
      default: "",
    },
    // 用户数据
    listData: {
      type: Array,
      required: true,
    },
    // 用户数据总数
    listCount: {
      type: Number,
      required: true,
    },
    // 用户数据对应table列表
    propsList: {
      type: Array,
      required: true,
    },
    // 显示序列
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    // 显示选中框
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    // table 页面选择器
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 }),
    },
    // table的多级行展开
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    // 底部 pagination 是否显示
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      // 获取数据发送至父组件
      emit("selectionChange", value);
    };
    // 双向绑定 page 向父组件提交时间及其参数
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };

    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };
    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style scoped lang="less">
.hy-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;

    .el-pagination {
      text-align: right;
    }
  }
}
</style>
