<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登陆</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
// defineComponent() 中包裹的对象 -> 组件的描述 -> 类 (在其他地方使用时，<login-panel />  为组件的实例)
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    // 1. 定义属性
    const isKeepPassword = ref(true);
    // 使用 ref() 绑定 LoginAccount组件，通过泛型指定类型
    // InstanceType<typeof LoginAccount>方法可以获取 LoginAccount 通过 export default defineComponent 导出的实例类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    const currentTab = ref("account");

    // 2. 定义方法
    const handleLoginClick = () => {
      // console.log("登录");
      // 登录方式判断
      if (currentTab.value === "account") {
        // 调用子组件方法
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        phoneRef.value?.loginAction();
      }
    };
    return {
      isKeepPassword,
      currentTab,
      accountRef,
      phoneRef,
      handleLoginClick,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 120px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
