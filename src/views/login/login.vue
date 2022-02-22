<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loginPanel from "./components/login-panel.vue";

export default defineComponent({
  components: {
    loginPanel,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login-bg.svg");
}
</style>
