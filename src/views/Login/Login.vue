
<style lang='less' scoped>
@import "../../assets/less/main.less";
#app {
  // background-image: url("../../assets/images/bg-Login.jpg");
  background-size: cover;
  background: #f9f9f9;
  padding-top: 50px;
}
.login-layout {
  width: 400px;
  height: 300px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  background: white;
  border-radius: 5px;
  margin: auto;
  .form-box {
    font-size: @text;
    color: @textColor;
    margin: auto;
    padding-top: 30px;
    width: 80%;
    .displayCenter(@align-items: flex-start);
    flex-direction: column;
    span {
      margin-bottom: 4px;
      &:before {
        content: "* ";
        color: red;
      }
    }
  }
}
</style>

<template>
  <div id="app">
    <div class="login-layout">
      <div class="form-box">
        <span>帐户名</span>
        <Input v-model="userAccount" size="large" placeholder="请输入帐户名"/>
      </div>
      <div class="form-box">
        <span>密码</span>
        <Input v-model="password" size="large" placeholder="请输入密码"/>
      </div>
      <div class="form-box">
        <Button type="success" size="large" @click="clickLogin()" long>登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
import GLOBAL from "../../assets/GLOBAL.vue";
export default {
  name: "Login",
  data() {
    return {
      // 帐户名密码
      userAccount: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    clickLogin() {
      if (this.userAccount === "Fencing" && this.password === "test") {
        GLOBAL.isLogin.isLogin = true;
        this.$router.push({
          name: "Navigate"
        });
      } else {
        this.$Message.warning("用户名或密码错误");
      }
    }
  },
  created() {
    GLOBAL.isLogin.isLogin = false;
  }
};
</script>