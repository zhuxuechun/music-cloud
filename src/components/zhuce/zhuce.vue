<template>
  <div class="deng">
    <div class="img">
      <img src="../../assets/images/111.png" alt="" />
    </div>
    <div>
      <div>
        <el-input v-model="input1" placeholder="输入你的人名(中文名)">
          <template #prepend>name</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input v-model="input2" placeholder="输入你的昵称 (例如狗蛋)">
          <template #append>username</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input
          v-model="input3"
          placeholder="phone"
          class="input-with-select"
        >
          <template #prepend>
            <el-select placeholder="+(86)" style="width: 110px">
              <el-option label="110" value="1"></el-option>
              <el-option label="120" value="2"></el-option>
              <el-option label="119" value="3"></el-option>
            </el-select>
          </template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input
          v-model="input4"
          placeholder="搁这儿填你的密码"
          class=""
        >
        </el-input>
      </div>
    </div>
    <div>
      <el-button type="danger" @click="zhuce">注册</el-button>
    </div>
    <div>
      <span @click="qied">登录</span>
    </div>
    <div class="biao">
      <span 
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin"></use></svg
      ></span>
      <span >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq"></use>
        </svg>
      </span>
      <span >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wangyi"></use>
        </svg>
      </span>
      <span >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </span>
    </div>
    <div>
      <el-checkbox
        label="同意<<叼毛条约>><<儿童保护条约>>"
        name="type"
        v-model="istong"
      ></el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      istong:false,
    };
  },
  props: {},
  methods: {
    qied() {
      this.$router.push("/login");
    },
    zhuce() {
      const ze = /^1[3|4|5|7|8][0-9]\d{8}$/;
      const ze2 = /^[a-zA-Z]\w{5,17}$/;
      const ze3 = /^[\u4e00-\u9fa5]{0,}$/;
      
      if (
        this.input1 === "" ||
        this.input2 === "" ||
        this.input3 === "" ||
        this.input4 === ""
      ) {
        ElMessage({
          message: "请输入正确的内容",
          type: "warning",
        });
      } 
      else if (!ze3.test(this.input1)) {
        ElMessageBox.alert("叼毛,你瞅瞅你填的是人名吗!", "嘿嘿,填错了吧", {
          confirmButtonText: "OK",
        });
      } 
      else if (!ze.test(this.input3)) {
        ElMessageBox.alert("叼毛,你手机号填错了!", "嘿嘿,填错了吧", {
          confirmButtonText: "OK",
        });
      } 
      else if (!ze2.test(this.input4)) {
        ElMessageBox.alert(
          "叼毛,密码太low了,密码以字母开头,长度在6~18之间,只能包含字母、数字和下划线!",
          "嘿嘿,填错了吧",
          {
            confirmButtonText: "OK",
          }
        );
      } 
     else if (this.istong === false) {
        ElMessageBox.alert("你知道我有很多把戏, 但我爱人的时候没有技巧, 记得勾选", "请先勾选条约!", {
          confirmButtonText: "ok",
        });
        return
      }
      else {
        this.$host.get(
          "Ben/user/register?name=" +
            this.input1 +
            "&phone=" +
            this.input3 +
            "&username=" +
            this.input2 +
            "&password=" +
            this.input4 +
            "&avatar=url&remark=null"
        );
        ElMessageBox.alert("人终将为其年少不可得之物困其一生, 注册成功!", "注册成功!", {
          confirmButtonText: "XUECHUN",
        });
      }
      
    },
  },
};
</script>

<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
// .el-input {
//   width: 200px;
//   height: 30px;
// }
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.deng div {
  margin-top: 1.5vh;
}
.deng {
  display: flex;
  flex-direction: column;
  margin: 40vh, auto;
  margin-left: 50px;
  align-items: center;
  align-content: space-around;
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
</style>

