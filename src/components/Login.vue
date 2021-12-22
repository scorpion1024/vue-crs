<template>
  <div class="contain">
    <div class="loginBox">
      <div></div>
      <h2>后台管理系统</h2>
      <form>
        <div class="item">
          <input
            type="text"
            name="userName"
            required
            autoComplete="off"
            v-model="userName"
          />
          <label for="">用户名</label>
        </div>
        <div class="item">
          <input type="password" name="passWord" required v-model="passWord" />
          <label for="">密码</label>
        </div>
        <button class="btn" type="submit" @click.prevent="doLogin">
          提交
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import "@/assets/css/login.css";
import md5 from "js-md5";
export default {
  data() {
    return {
      userName: "",
      passWord: "",
    };
  },
  computed: {
    submitParams() {
      return {
        userName: this.userName,
        passWord: md5(this.passWord),
      };
    },
  },
  methods: {
    doLogin() {
      const submit = this.submitParams;
      if (submit.userName === "") {
        this.$message.error("请输入用户名");
        return false;
      }
      if (this.passWord === "") {
        this.$message.error("请输入密码");
        return false;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$api
        .doLogin(submit)
        .then((res) => {
          if (res.code === 0) {
            sessionStorage.setItem("token", res.msg);
            window.location = "/";
          } else {
            this.$message.error(res.msg);
            loading.close();
          }
        })
        .catch((error) => {
          this.$message.error(error);
          loading.close();
        });
    },
  },
};
</script>

<style scoped>
</style>