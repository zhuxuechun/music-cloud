<template>
  <div class="header">
    <div class="logo">
      <div class="iconfont icon-wangyiyunyinle wangyi">XXXXXXX叼蒙音乐</div>
    </div>
    <div class="sou">
      <div
        class="iconfont icon-shangyiyehoutuifanhui-xianxingyuankuang"
        @click="sx('shang')"
      ></div>
      <div
        class="iconfont icon-xiayiyeqianjinchakangengduo-xianxingyuankuang"
        @click="sx('xia')"
      ></div>
      <div id="kuang">
        <span class="iconfont icon-sousuo" @click="sousuo"></span>
        <input
          @keyup.enter="sousuo"
          type="text"
          class="input"
          placeholder="搜索"
          v-model="shuru"
        />
      </div>
      &emsp;
      <div class="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-changgemaikefenghuatongKTVluyin"></use>
        </svg>
      </div>
    </div>

    <div class="sk"></div>
    <div class="tou">
      <img
        :src="this.$store.state.user === '' ? tou : $store.state.user.avatar"
        alt=""
      />&ensp;
      <span id="uname" @click="deng">
        <el-dropdown>
          <span class="el-dropdown-link" id="de">
            {{
              this.$store.state.user === ""
                ? "未登录"
                : $store.state.user.username
            }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="tiao('login')">登录</el-dropdown-item>
              <el-dropdown-item @click="tiao('zhuce')">注册</el-dropdown-item>
              <el-dropdown-item @click="tiao('tuichu')"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>

      &ensp; <span class="iconfont icon-heijiao"></span>&ensp;
      <span class="iconfont icon-huanzhuang"></span>&ensp;
      <span class="iconfont icon-shezhi"></span>&ensp;
      <span class="iconfont icon-xinfeng"></span>
    </div>
  </div>

  <div class="left">
    <div class="fa">
      <div class="faxian" @click="rou('index')">&ensp;发现音乐</div>
      <div class="boke">&ensp;播客</div>
      <div class="shipin">&ensp;视频</div>
      <div class="guanzhu">&ensp;关注</div>
      <div class="zhibo">&ensp;直播</div>
      <div class="siren">&ensp;私人FM</div>
    </div>
    <div class="wode">
      <div class="iconfont yinyue">&ensp;我的音乐</div>
      <div class="iconfont icon-xiazai">&ensp;本地与下载</div>
      <div class="iconfont icon-zuijinbofang1" @click="rou('like')">
        &ensp;我的喜欢
      </div>
      <div class="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wodeyunpan"></use></svg
        >&ensp; 我的音乐云盘
      </div>
      <div class="iconfont icon-boke1">&ensp;我的博客</div>
      <div class="iconfont icon-shoucang1">&ensp;我的收藏</div>
    </div>
  </div>

  <div class="neirong">
    <router-view> </router-view>
    <!-- <div class="zhan"></div> -->
  </div>

  <div class="foot">
    <div class="fl">
      <img
        :src="
          $store.state.dqge === ''
            ? 'https://p4.music.126.net/fqZPrpG6ABuuHb8EVKf8HQ==/109951166924458141.jpg'
            : $store.state.dqge.cover
        "
        alt=""
        class="geshou"
      />
      <div class="xinxi">
        <div class="geming" v-if="$store.state.dqge">
          {{ $store.state.dqge === "" ? "" : $store.state.dqge.name }}
          <span class="iconfont icon-wusunyinzhi-copy"></span>
          <span
            :class="
              isxihuan === false
                ? 'iconfont icon-56aixin'
                : 'iconfont icon-aixin'
            "
            @click="xihuan"
          ></span>
        </div>
        <div class="shouming">
          {{
            $store.state.song !== ""
              ? $store.state.song.album.name
              : $store.state.likesong === ""
              ? ""
              : $store.state.likesong.name
          }}
        </div>
      </div>
    </div>

    <div class="fm">
      <div class="mbiao">
        <div
          @click="dan"
          :class="
            count === 1
              ? 'iconfont icon-danquxunhuan'
              : count === 2
              ? 'iconfont icon-suijibofang'
              : 'iconfont icon-aixin'
          "
        ></div>
        <div class="iconfont icon-shangyishoushangyige"></div>
        <div
          @click="bofang"
          :class="
            bz === false ? 'iconfont icon-24gl-play' : 'iconfont icon-zanting'
          "
        ></div>
        <div class="iconfont icon-xiayigexiayishou"></div>
        <div class="iconfont icon-geci24"></div>
      </div>
      <div class="jindu">
        <span>{{ dqtime }}</span
        >&ensp;
        <el-slider
          v-model="value"
          @change="changejin"
          size="small"
          tooltip-class="jindudian"
          :max="zhong"
        >
        </el-slider
        >&ensp;
        <span>{{ jieshu }}</span>
        <audio
          :src="songurl === '' ? $store.state.songurl.url : songurl.url"
          ref="yinpin"
          autoplay
          @timeupdate="jinn"
          @canplay="jinnn"
          @pause="zanting"
        ></audio>
      </div>
    </div>
    <div class="fr"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import moment from "moment";
import Index from "./components/index/index.vue";
import Like from "./components/like/like.vue";
export default defineComponent({
  setup() {
    const typeRef = ref("dot");
    const placementRef = ref("bottom");
    const directionRef = ref("horizontal");
    return {
      showArrow: ref(false),
      type: typeRef,
      types: ["dot", "line"],
      placement: placementRef,
      placements: ["top", "bottom", "left", "right"],
      direction: directionRef,
      directions: ["horizontal", "vertical"],
      options: [
        {
          label: "登录",
          key: "login",
          disabled: true,
        },
        {
          label: "注册",
          key: "zhuce",
        },
        {
          label: "退出登录",
          key: "tuichu",
        },
      ],
      handleSelect(key) {
        if (key === "tuichu") {
          this.$store.commit("tuichu");
        } else if (key !== "tuichu") {
          console.log("hahashshsh");
          this.$router.push("/" + key);
        }
      },
    };
  },
  components: {
    Index,
    Like,
  },
  data() {
    return {
      tou: "https://p4.music.126.net/fqZPrpG6ABuuHb8EVKf8HQ==/109951166924458141.jpg",
      options: [
        {
          label: "登录",
          key: "denglu",
          disabled: true,
        },
        {
          label: "注册",
          key: "zhuce",
        },
        {
          label: "退出登录",
          key: "tuichu",
        },
      ],
      dqge: this.$store.state.dqge,
      danqu: "icon-danquxunhuan",
      isxihuan: false,
      count: 1,
      value: "",
      lubopic: [],
      shuru: "红色高跟鞋",
      username: "张书宁",
      songurl: "",
      bz: false,
      dqtime: "",
      zhong: "",
      jieshu: "00:00",
    };
  },
  watch: {
    songurl(newurl, oldurl) {
      this.bz = true;
    },
  },
  methods: {
    tiao(key) {
      if (key === "tuichu") {
        this.$store.commit("tuichu");
      } else if (key !== "tuichu") {
        this.$router.push("/" + key);
      }
    },

    jinnn() {
      //  let {
      //   data: { data: res },
      // } = await this.$host.get("Api/song/url?id=" + can.id);
      this.songurl = this.$store.state.songurl;
      this.bz = true;
      this.dqge = this.$store.state.dqge;
    },
    jinn() {
      this.dqge = this.$store.state.dqge;
      this.value = this.$refs.yinpin.currentTime;
      this.songurl = this.$store.state.songurl;

      this.dqtime = this.$refs.yinpin.currentTime.toFixed(2);
      // this.dqtime = dayjs(this.$store.state.dqge).format('mm:ss');
      this.jieshu = dayjs(this.$store.state.dqge.dt).format("mm:ss");
      console.log(this.jieshu);
      // this.jieshu= this.$refs.yinpin.duration.toFixed(2);
      this.zhong = dayjs(this.$store.state.dqge.dt).format("mm:ss");
    },
    bofang() {
      if (this.$refs.yinpin.currentTime === 0) {
        this.value = "";
      }
      this.value = this.$refs.yinpin.currentTime;
      // this.zhong = dayjs(this.$store.state.dqge.dt).format("mm:ss");
      console.log(this.jieshu);
      console.log('this.jieshu');


      // this.zhong = this.$refs.yinpin.duration;
      if (this.bz === true) {
        this.bz = false;
        this.$refs.yinpin.pause();
      } else if (this.bz === false) {
        this.bz = true;
        this.$refs.yinpin.play();
      }
    },
    changejin() {
      this.$refs.yinpin.currentTime = this.value;
    },
    sx(can) {
      if (can === "shang") {
        this.$router.go(-1);
      }
      this.$router.go(1);
    },
    async rou(can) {
      this.$router.push("/" + can);
      if (this.$store.state.user === "") {
        this.$store.commit("qingkong");
      } else {
        let { data: res } = await this.$host.get(
          "Ben/user/songs?username=" + this.$store.state.user.username
        );
        //  console.log(res);
        this.$store.commit("zlove", res);
      }
    },
    async sousuo() {
      this.$router.push("/sou");
      this.$store.commit("sousuo", this.shuru);
      let {
        data: {
          result: { songs: res },
        },
      } = await this.$host.post(
        "Api/search?keywords=" + this.$store.state.shuru
      );
      this.$store.commit("slist", res);
    },
    xihuan() {
      this.isxihuan = !this.isxihuan;
    },
    dan() {
      if (this.count === 1) {
        this.danqu = "icon-danquxunhuan";
        this.count = 2;
      } else if (this.count === 2) {
        this.danqu = "icon-suijibofang";
        this.count = 3;
      } else if (this.count === 3) {
        this.danqu = "icon-danquxunhuan1";
        this.count = 1;
      }
    },
  },
  created(){
    console.log('shhshsh');
  }
});
</script>

<style lang="less" scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

:deep(.creative-enter-from),
:deep(.creative-leave-to) {
  opacity: 0;
  transform: scale(0.9);
}

:deep(.creative-enter-active),
:deep(.creative-leave-active) {
  transition: all 0.3s ease;
}
.header {
  width: 100vw;
  // height:120px;
  background-color: rgb(236, 65, 65);
  position: fixed;
  display: flex;
  justify-content: space-between;
}
.header div {
  width: 400px;
  height: 90px;
}
.logo {
  // flex: 20%;
  width: 20vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo div:nth-child(1) {
  width: 10rem;
  // border: 1px solid rgb(3, 130, 248);
  font-size: 25px;
  color: rgb(247, 247, 247);
  // text-align: center;
  margin-left: 30px;
  line-height: 90px;
}

.sou {
  display: flex;
  align-items: center;
  // justify-content: center;
  width: 20vw;
  // border:1px solid rgb(17, 0, 255);
}
.sou > div {
  width: 30px;
  height: 30px;
  font-size: 22px;
}
.sou div:nth-child(1) {
  margin-top: -4.5px;
  position: fixed;
  margin-right: 30px;
}
.sou div:nth-child(2) {
  margin-top: -4.5px;
  // position: fixed;
  margin-left: 30px;
}
.sbiao {
  font-size: 22px;
}
#kuang {
  align-self: center;

  display: flex;

  width: 150px;
  background-color: rgb(236, 65, 65);
}
#kuang span {
  position: absolute;
  align-self: center;
  font-size: 20px;
  margin-left: 10px;
}
.sk {
  width: 250px;
  background-color: rgb(236, 65, 65);
}
.input {
  font-size: 13px;
  text-align: center;
  line-height: 27px;
  width: 150px;
  height: 27px;
  border-radius: 20px;
  // color:aqua;
  background-color: rgba(149, 158, 158, 0.3);
  border: 1px solid rgb(236, 65, 65);
  outline: none;
}

.tou {
  display: flex;
  align-items: center;
  justify-items: center;
  // border:1px solid rgb(68, 0, 255);
}
.tou img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.tou span {
  font-size: 21px;
}
#uname {
  width: 35px;
  font-size: 13.8px;
  color: #fff;
}
.tou span:nth-child(3) {
  align-self: center;
  margin-top: 8px;
  margin-left: -8px;
}
.left {
  width: 230px;
  position: fixed;
  top: 90px;
  bottom: 90px;
  z-index: 5;
  border-right: 1px solid rgb(211, 214, 218);
}
.fa {
  margin-top: 20px;
  // height:250px;
  // border: 1px solid red;
  // width:180px;
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  justify-content: space-around;
}
.fa div {
  line-height: 40px;
  // margin-left:15px;
  width: 200px;
  border-radius: 8px;
  height: 40px;
}
.fa div:hover {
  background-color: rgb(235, 235, 235);
}
.faxian {
  font-weight: 600;
  font-size: 19px;
}
.wode {
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  justify-content: space-around;
}
.wode div {
  line-height: 40px;
  // margin-left:15px;
  width: 200px;
  border-radius: 8px;
  height: 40px;
}
.wode div:nth-child(1) {
  font-weight: 200;
  font-size: 14px;
}
.wode div:nth-child(1) ~ div:hover {
  background-color: rgb(235, 235, 235);
}
.neirong {
  position: fixed;
  left: 230px;
  width: 83vw;
  top: 90px;
}
.zhan {
  bottom: 0;
  position: fixed;
  width: 100vw;
  height: 90px;
}
.foot {
  position: fixed;
  justify-content: space-between;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid rgb(156, 153, 153);
  height: 90px;
  z-index: 6;
  display: flex;
  background-color: rgb(255, 255, 255);
}
.fl {
  // border:1px solid red;
  width: 33.3vw;
  // margin: 10px 30px;
  display: flex;
  align-items: center;
  // justify-content: space-evenly;
  // justify-content: space-around;
  height: 90px;
  // border:1px solid red;
}
.foot .geshou {
  margin-left: 40px;
  width: 60px;
  height: 60px;
  border-radius: 15px;
}

.foot .xinxi {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

// .foot > div {
//   // border:1px solid red;
// }
.fm {
  // border:1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fm .mbiao {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0;
}
.mbiao > div {
  font-size: 22px;
  text-align: center;
  line-height: 60px;
  width: 60px;
  color: rgb(8, 8, 8);
  height: 60px;
  // border:1px solid red;
}
.mbiao div:nth-child(3):hover {
  background-color: rgb(227, 233, 238);
  // font-color:rgb(228, 227, 227)
}
.mbiao div:nth-child(3) {
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: rgb(8, 8, 8);
  text-align: center;
  line-height: 50px;
}
.fm .jindu {
  display: flex;
  align-items: center;
  width: 30vw;
  font-size: 10px;
  // border: 1px solid blue;
  height: 10px;
}
.el-slider {
  --el-slider-main-bg-color: red;
  --el-slider-runway-bg-color: var(--el-border-color-light);
  --el-slider-stop-bg-color: var(--el-color-white);
  --el-slider-disable-color: var(--el-text-color-placeholder);
  --el-slider-border-radius: 3px;
  --el-slider-height: 4px;
  --el-slider-button-size: 8px;
  --el-slider-button-wrapper-size: 36px;
  --el-slider-button-wrapper-offset: -15px;
}

.el-dropdown {
  width: 120px;
  height: 90px;
  line-height: 90px;
}

#de {
  font-size: 15px;
  color: #fff;
}
.jindudian {
  width: 5px;
  height: 5px;
}
.fr {
  width: 33.3vw;
  height: 90px;
}
</style>>

