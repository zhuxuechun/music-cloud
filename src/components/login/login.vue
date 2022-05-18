<template>
  <div :class="bian ? 'deng bian' : 'deng'">
    <div class="img">
      <img src="../../assets/images/111.png" alt="" />
    </div>
    <div>
      <el-input v-model="input1" placeholder="账号(手机号)" />
    </div>
    <div>
      <el-input v-model="input2" placeholder="password" />
    </div>

    <div @click="saoma">
      <span class="iconfont icon-erweima"></span> 扫码登录
    </div>
    <div>
      <el-button type="danger" @click="deng">登录</el-button>
    </div>
    <div class="ai">
      <span class="iconfont icon-ziyuan60"></span>
      <span @click="zhuce">注册</span>&emsp;
      <span>
        <el-checkbox label="自动登录" name="type"></el-checkbox>
      </span>
    </div>
    <div class="biao">
      <span
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin"></use></svg
      ></span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq"></use>
        </svg>
      </span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wangyi"></use>
        </svg>
      </span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </span>
    </div>
    <div>
      <el-checkbox
        label="同意<<叼毛条约>> <<儿童保护条约>>"
        name="type"
        v-model="istong"
      ></el-checkbox>
    </div>
    <div class="xx">
      <svg class="icon" aria-hidden="true" @click="gb">
        <use xlink:href="#icon-guanbihao"></use>
      </svg>
    </div>
    <div class="ma" v-if="guanma" v-loading="l">
      <div class="smd"><a href="#">扫码登录</a></div>
      <div class="mama">
        <img :src="sc" alt="" />
      </div>
      <div class="qita">
        <div><el-button type="primary" @click="sm">确认登录</el-button></div>
        <div @click="qi">使用其他方式登录></div>
      </div>
    </div>
  </div>
</template>

<script>
// import Cookies from 'js-cookie'
import cookies from "vue-cookies";

export default {
  data() {
    return {
      input1: "",
      input2: "",
      istong: false,
      guanma: false,
      sc: "",
      bian: true,
      key: "",
      qrurl: "",
      l: false,
    };
  },
  watch: {
    sc(o, n) {
      this.l = false;
    },
  },
  props: {},
  methods: {
    gb() {
      this.$store.commit("islogin", false);
    },
    qi() {
      this.guanma = false;
    },
    async saoma() {
      this.l = true;
      this.bian = false;
      this.guanma = true;
      let {
        data: {
          data: { unikey: key },
        },
      } = await this.$host.get("Api/login/qr/key");
      let {
        data: { data: dd },
      } = await this.$host.get("Api/login/qr/create?key=" + key + "&qrimg=1");
      // console.log(dd);
      this.sc = dd.qrimg;
      this.key = key;
      this.qrurl = dd.qrurl.slice(27);
    },
    async sm() {
      let { data: t } = await this.$host.get(
        "Api/login/qr/check?key=" + this.key
      );
      let { data: data } = await this.$host({
        url: "Api/user/account",
        methods: "post",
        Headers: "" + t.cookie,
      });
      console.log(data);
      if (t.code === 803 && data.code === 200) {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        this.guanma = false;

        this.sui(data);
      } else if (t.code === 801 && data.code === 200) {
        ElMessage({
          message: "上次已登录,cookie未过期,直接登录",
          type: "success",
        });
        this.guanma = false;
        this.sui(data);
      } else if (t.code === 800) {
        ElMessage({
          message: "二维码已过期",
          type: "error",
        });
      } else {
        ElMessage({
          message: "扫码失败原因是网易登录风控限制或者其他原因",
          type: "error",
        });
      }
    },
    async sui(data) {
      this.$store.commit("islogin", false);
      this.$router.push("/index");
      this.$store.commit("user", data);
      let {
        data: { playlist },
      } = await this.$host.get("Api/user/playlist?uid=" + data.profile.userId);
      let xg = playlist.slice(0, 1);
      let sgd = playlist.filter((x) => {
        return x.subscribed === true;
      });
      let cgd = playlist.filter((x, i) => {
        return x.subscribed === false && i !== 0;
      });
      this.$store.commit("chuangge", cgd);
      let {
        data: { songs: haha },
      } = await this.$host.get("Api/playlist/track/all?id=" + xg[0].id);
      this.$store.commit("zlove", haha);
    },
    zhuce() {
      // this.$router.push("/zhuce");
      ElMessageBox.alert(
        "使用你的真实网易云账号密码登录就行,注册没弄",
        "Title",
        {
          confirmButtonText: "ok",
        }
      );
    },
    async deng() {
      if (this.istong === false) {
        ElMessageBox.alert(
          "你知道我有很多把戏, 但我爱人的时候没有技巧,(请勾选条约!)",
          "请勾选条约!",
          {
            confirmButtonText: "XUECHUN",
          }
        );
        return;
      }
      if (this.input1 === "" || this.input2 === "") {
        ElMessage({
          message: "请输入账号或密码!",
          type: "error",
        });
        return;
      }

      let { data: data } = await this.$host.get(
        "Api/login/cellphone?phone=" + this.input1 + "&password=" + this.input2
      );
      // console.log(data);
      if (data.code === 200 && this.$store.state.user === "") {
        // this.$store.commit("islogin", false);

        // ElMessageBox.alert("初见乍惊欢, 久处亦怦然", "登录成功!", {
        //   confirmButtonText: "欢迎",
        // });
        // this.$router.push("/index");
        // this.$store.commit("user", data);
        // // this.$store.commit("zlove", res);

        // let {
        //   data: { playlist },
        // } = await this.$host.get(
        //   "Api/user/playlist?uid=" + data.profile.userId
        // );
        // // console.log(playlist);
        // let xg = playlist.slice(0, 1);
        // let sgd = playlist.filter((x) => {
        //   return x.subscribed === true;
        // });
        // let cgd = playlist.filter((x, i) => {
        //   return x.subscribed === false && i !== 0;
        // });
        // this.$store.commit("chuangge", cgd);
        // let {
        //   data: { songs: haha },
        // } = await this.$host.get("Api/playlist/track/all?id=" + xg[0].id);
        // // console.log(haha);
        // this.$store.commit("zlove", haha);

        // this.$store.commit("chuangge", xg);
        // this.$store.commit("chuangge",sgd);
        this.sui();
      } else if (this.$store.state.user !== "") {
        ElMessageBox.alert("您已登录!请先退出登录!", "您已登录!", {
          confirmButtonText: "ok",
        });
      } else {
        ElMessage({
          message: "登录失败!",
          type: "error",
        });
        console.log("登录失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 200px;
  height: 30px;
}
.deng div {
  margin-top: 2vh;
}
.deng {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 300px;
  // box-shadow: 3px 3px 3px ;
  box-shadow: rgb(226, 225, 223);
  background-color: rgb(255, 255, 255);
  z-index: 99;
  margin-left: 0 !important;
  align-items: center;
  align-content: space-around;
}
.bian {
  border: 1px solid rgb(214, 215, 216);
}
.biao {
  display: flex;
  justify-content: space-around;
  width: 300px;
}
.el-button {
  width: 200px;
}
.biao span {
  font-size: 30px;
}
.img img {
  align-self: center;
  justify-self: center;
  width: 100%;
  height: 100px;
}
.ai {
  display: flex;
  align-items: center;
  // justify-content: space-evenly;
}
.ma {
  z-index: 90;
  top: 0;
  position: absolute;
  top: 0;
  margin-top: 0 !important;
  z-index: 9999;
  width: 100%;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  justify-content: space-around;
  height: 100%;
  // background-color: rgba(94, 93, 93, 0.5);
  background-color: rgb(255, 255, 255);
}
.smd {
  font-size: 27px;
  margin-bottom: 10px;
}

.qita {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;

  margin-top: 30px !important;
}
.qita div:nth-child(2) {
  font-size: 13px;
  color: rgb(26, 149, 206);
}
.mama {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0 !important;
  position: absolute;
  top: 0;
  text-align: center;
  position: absolute;
  overflow: hidden;
  // line-height: 50%;
}
.mama img {
  // transform: translate(-50%,-50%);
}
.xx {
  position: absolute;
  top: -20px;
  font-size: 28px;
  right: 0;
}
</style>

