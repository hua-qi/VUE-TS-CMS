<template>
  <el-form label-width="55x" :model="phone" :rules="phoneRules" ref="formRef">
    <el-form-item label="手机号" prop="phoneNumber">
      <el-input autofocus v-model="phone.phoneNumber" />
    </el-form-item>
    <el-form-item label="验证码" prop="identifyingCode">
      <div class="get-code">
        <el-input v-model="phone.identifyingCode" />
        <el-button type="primary" size="small" class="get-btn"
          >获取验证码</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { phoneRules } from "@/views/login/config/phone-config";
import { ElForm } from "element-plus";

export default defineComponent({
  setup() {
    const store = useStore();
    const phone = ref({
      phoneNumber: "",
      identifyingCode: "",
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 登录验证
          store.dispatch("login/accountLoginAction", { ...phone });
        }
      });
    };
    return {
      phone,
      phoneRules,
      formRef,
      loginAction,
    };
  },
});
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
