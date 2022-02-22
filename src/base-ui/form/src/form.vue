<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- 响应式布局 -->
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.ortherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.ortherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.key"
                    :value="option.value"
                    :label="option.label"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IFormItem } from "../types";
export default defineComponent({
  props: {
    // 组件绑定v-model 接收信息 固定写法
    modelValue: {
      type: Object,
      required: true,
    },
    formItems: {
      // vue3+ts 结合语法 Array 断言 为PropType 类型，接收泛型，规定传入数组中数据的格式
      type: Array as PropType<IFormItem[]>,
      // vue3+ts 注意事项：object/array,设置默认值时，规定使用箭头函数
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: "10px 40px",
      }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // screen.width >1920px 24/6=4
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  // 向父组件提交事件固定写法 update:modelValue
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 输入框重置事件方法一 (双向绑定 v-mode hyFormData)
    /*  // 将 modelValue 进行浅拷贝（不直接修改原对象值，遵守单向数据流）
    const hyFormData = ref({ ...props.modelValue });
    // 监听数据变化，向父组件提交事件
    watch(
      hyFormData,
      (newValue) => {
        emit("update:modelValue", newValue);
      },
      {
        deep: true,
      }
    ); */

    // 输入框重置事件方法二
    const handleValueChange = (value: any, field: string) => {
      // 向父组件发送事件，参数：解构modeValue 及其field的修改值
      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    return {
      handleValueChange,
    };
  },
});
</script>

<style scoped>
.hy-form {
  padding-top: 22px;
}
</style>
