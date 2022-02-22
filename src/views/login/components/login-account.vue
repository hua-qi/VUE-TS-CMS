<template>
  <div class="login-account">
    <el-form
      label-width="55x"
      :model="account"
      :rules="accountRules"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input autofocus v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
// el-form 面向规则(必须在 setup(return{返回}))
import { accountRules } from "../config/account-config";
import { ElForm } from "element-plus";
// 本地缓存
import localCache from "@/utils/cache";
export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? "",
    });
    // ref() 绑定 ElForm 组件 (通过泛型获取 ElForm 类型)
    const formRef = ref<InstanceType<typeof ElForm>>();
    // 密码登录真正登录逻辑
    const loginAction = (isKeepPassword: boolean) => {
      // valid 表单内容验证标识符
      formRef.value?.validate((valid) => {
        if (valid) {
          // console.log("真正的登录逻辑");
          // 1. 判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
        }

        // 2. 登录验证
        store.dispatch("login/accountLoginAction", { ...account });
      });
    };

    return {
      account,
      accountRules,
      formRef,
      loginAction,
    };
  },
});
</script>

<style scoped></style>
