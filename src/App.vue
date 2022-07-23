<template>
  <div class="header" @click="dyc(e)">
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
      <div id="kuang" @mouseenter="lsc">
        <span class="iconfont icon-sousuo" @click="sousuo"></span>
        <input
          @keyup.enter="sousuo"
          type="text"
          class="input"
          placeholder="搜索"
          v-model="shuru"
          @mouseenter="cai"
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
        :src="
          this.$store.state.user === ''
            ? tou
            : $store.state.user.profile.avatarUrl
        "
        alt=""
      />&ensp;
      <span id="uname" @mouseenter="dd">
        <span class="weid" id="de">
          {{
            this.$store.state.user === ""
              ? "未登录"
              : $store.state.user.profile.nickname
          }}
        </span>
      </span>

      &ensp; <span class="iconfont icon-heijiao"></span>&ensp;
      <span class="iconfont icon-huanzhuang"></span>&ensp;
      <span class="iconfont icon-shezhi"></span>&ensp;
      <span class="iconfont icon-xinfeng"></span>
    </div>
  </div>

  <div class="left">
    <el-scrollbar>
      <div class="fa">
        <div class="faxian" @click="rou('index')">
          &ensp;<a href="#">发现音乐</a>
        </div>
        <div class="boke">&ensp;<a href="#"></a>播客</div>
        <div class="shipin" @click="mv">&ensp;<a href="#">视频</a></div>
        <div class="guanzhu">&ensp;<a href="#">关注</a></div>
        <div class="zhibo">&ensp;<a href="#">直播</a></div>
        <div class="siren">&ensp;<a href="#">私人FM</a></div>
      </div>
      <div class="wode">
        <div class="iconfont yinyue">&ensp;<a href="#">我的音乐</a></div>
        <div class="iconfont icon-xiazai">&ensp;<a href="#">本地与下载</a></div>

        <div class="">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wodeyunpan"></use></svg
          >&ensp;<a href="#">我的音乐云盘</a>
        </div>
        <div class="iconfont icon-shoucang1">
          &ensp;<a href="#">我的播客</a>
        </div>
        <div class="iconfont icon-zuijinbofang1" @click="rou('like')">
          &nbsp;<a href="#">我的喜欢</a>
        </div>
        <div class="wgd">
          <n-collapse arrow-placement="left">
            <n-collapse-item title="我创建的歌单">
              <div
                v-for="x in this.$store.state.cgd"
                :key="x.id"
                class="gdx"
                @click="tgd(x)"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-gedan"></use></svg
                >&emsp;{{ this.$store.state.cgd !== "" ? x.name : "" }}
              </div>
            </n-collapse-item>
          </n-collapse>
        </div>
      </div>
    </el-scrollbar>
  </div>

  <div class="neirong" @click="dyc(e)">
    <router-view></router-view>
  </div>

  <div class="foot">
    <div class="fl">
      <img
        :src="
          $store.state.dqge === ''
            ? 'https://p4.music.126.net/fqZPrpG6ABuuHb8EVKf8HQ==/109951166924458141.jpg'
            : $store.state.dqge.al.picUrl
        "
        alt=""
        class="geshou"
        @click="ci"
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
              ? $store.state.song.name
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
        <div
          class="iconfont icon-shangyishoushangyige"
          @click="shangyi('s')"
        ></div>
        <div
          @click="bofang"
          :class="
            bz === false ? 'iconfont icon-24gl-play' : 'iconfont icon-zanting'
          "
        ></div>
        <div class="iconfont icon-xiayigexiayishou" @click="shangyi('x')"></div>
        <div class="iconfont icon-geci24" @click="ci"></div>
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
        <span>{{ jieshu === NaN ? "00:00" : jieshu }}</span>
        <audio
          :src="songurl === '' ? $store.state.songurl.url : songurl.url"
          ref="yinpin"
          autoplay
          loop
          @timeupdate="jinn"
          @canplay="jinnn"
          @pause="zanting"
        ></audio>
      </div>
    </div>
    <div class="fr">
      <!-- <div class="slider-demo-block">
    <el-slider v-model="value" vertical height="60px" z-index="3051"> </el-slider>

  </div> -->
      <div class="yin">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-laba1"></use>
        </svg>
      </div>
    </div>
  </div>

  <div class="bofang" v-if="$store.state.isbo">
    <Bofang></Bofang>
  </div>
  <div class="isdeng" v-if="$store.state.isdeng">
    <div>
      <Login></Login>
    </div>
  </div>
  <div
    v-if="$store.state.islishi"
    class="ls"
    @mouseleave="lsl"
    @mouseenter="lsc"
  >
    <div class="stixing">
      <el-scrollbar height="450px">
        <span class="laji"
          >搜索历史
          <span @click="qinglishi" class="iconfont icon-lajitong"></span
        ></span>
        <div class="lishi">
          <span @click="sou(x)" v-for="x in $store.state.lishi" :key="x">{{
            x
          }}</span>
        </div>
        <span class="resou">热搜榜</span>
        <div class="ul">
          <div @click="sou(x.searchWord)" v-for="(x, i) in resoub" :key="x">
            &nbsp;<span>{{ i + 1 }}</span>
            <span class="qiansan" @click="sou(x.searchWord)"
              >&ensp;&ensp;&ensp;&ensp; {{ x.searchWord }}&ensp;</span
            ><span class="score">{{ x.score }} </span>&ensp;
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="i < 3 ? '#icon-hot' : ''"></use>
              </svg>
            </span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
  <div v-if="$store.state.isd" @mouseleave="nisd">
    <div class="geren">
      <div class="shuzi">
        <div>
          <span>{{
            $store.state.user === ""
              ? 0
              : $store.state.user.profile.accountStatus
          }}</span
          ><span>动态</span>
        </div>
        <div>
          <span>{{
            $store.state.user === "" ? "04" : $store.state.user.profile.follows
          }}</span
          ><span>关注</span>
        </div>
        <div>
          <span>{{
            $store.state.user === ""
              ? "09"
              : $store.state.user.profile.followeds
          }}</span
          ><span>粉丝</span>
        </div>
      </div>
      <div class="qiandao">
        <span class="iconfont icon-qiandao_o"></span> 签到
      </div>
      <!-- <div class="fenge"></div> -->
      <div class="lei">
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="iconfont icon-huiyuan-"
            >&ensp;会员中心</span
          ><span>></span>
        </div>
        <div @click="tiao('login')">
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="iconfont icon-shezhi"
            >&ensp;登录</span
          ><span>></span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="iconfont icon-shouye"
            >&ensp;商城</span
          ><span>></span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="iconfont icon-gerenzhongxin"
            >&ensp;个人中心</span
          ><span>></span>
        </div>
        <div @click="tiao('zhuce')">
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="iconfont icon-zhuce"
            >&ensp;注册</span
          ><span>></span>
        </div>
        <div @click="tiao('tuichu')">
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="iconfont icon-tuichu"
            >&ensp;退出登录</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import moment from "moment";
import Index from "./components/index/index.vue";
import Like from "./components/like/like.vue";
import Bofang from "./components/bofang/bofang.vue";
import { update } from "lodash";
import Login from "./components/login/login.vue";
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
    Bofang,
    Login,
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
      resoub: "",
      zhong: "",
      jieshu: "",
      cgd: [],
      sgd: [],
      xg: [],
    };
  },
  watch: {
    songurl(newurl, oldurl) {
      this.bz = true;
    },
  },

  methods: {
    dyc(e) {
      this.lsl();
      this.nisd();
    },
    lsc() {
      this.$store.commit("islishi", true);
    },
    lsl() {
      this.$store.commit("islishi", false);
    },
    async shangyi(can) {
      let dqgeid = this.$store.state.dqge.id;
      let list = this.$store.state.slist;
      var s = [];
      if (can === "s") {
        for (var i = 0; i < this.$store.state.slist.length; i++) {
          if (list[i].id === dqgeid && i > 0) {
            s.push(list[i - 1]);
          } else if (i === 0 && list[i].id === dqgeid) {
            return;
          }
        }
      } else if (can === "x") {
        for (var i = 0; i < this.$store.state.slist.length; i++) {
          if (list[i].id === dqgeid && i > 0) {
            s.push(list[i + 1]);
          }
        }
      }

      console.log(s[0]);
      this.$store.commit("isPlay", true);
      let {
        data: { data: res },
      } = await this.$host.get("Api/song/url?id=" + s[0].id);
      let {
        data: { songs },
      } = await this.$host.get("Api/song/detail?ids=" + s[0].id);
      this.$store.commit("dqge", songs[0]);
      this.$store.commit("chuan", res);
    },
    async tgd(can) {
      let { data } = await this.$host.get("Api/playlist/detail?id=" + can.id);
      console.log(data);
      this.$store.commit("gedanye", data.playlist);
      this.$router.push("gedan");
      this.$store.commit("gdlist", data.playlist.tracks);
    },
    async cai() {
      let {
        data: { data: res },
      } = await this.$host.get("Api/search/hot/detail");

      this.resoub = res;
    },
    mv() {
      this.$router.push("mv");
    },
    ci() {
      if (this.$store.state.dqge === "") {
        return;
      } else {
        this.$store.commit("isbo");
      }
    },
    tiao(key) {
      if (key === "tuichu") {
        if (this.$store.state.user === "") {
          ElMessageBox.alert("你小子还没登录呢吧", "未登录!", {
            confirmButtonText: "ok",
          });
        } else {
          this.$store.commit("tuichu");
        }
      } else if (key === "login") {
        // console.log('hshshsh');
        this.$store.commit("islogin", true);
      }
    },
    qinglishi() {
      this.$store.commit("qinglishi");
    },
    jinnn() {
      this.songurl = this.$store.state.songurl;
      this.bz = true;
      this.dqge = this.$store.state.dqge;
    },
    jinn() {
      this.dqge = this.$store.state.dqge;
      this.value = this.$refs.yinpin.currentTime;
      this.$store.commit("currentTime", this.$refs.yinpin.currentTime);
      this.songurl = this.$store.state.songurl;
      this.dqtime = dayjs(this.$refs.yinpin.currentTime * 1000).format("mm:ss");
      this.jieshu = dayjs(this.$store.state.dqge.dt).format("mm:ss");
      this.zhong = this.$store.state.dqge.dt / 1000;
    },
    bofang() {
      if (this.$refs.yinpin.currentTime === 0) {
        this.value = "";
      }
      if (this.bz === true) {
        this.bz = false;
        this.$store.commit("isPlay", false);
        this.$refs.yinpin.pause();
      } else if (this.bz === false) {
        this.bz = true;
        this.$store.commit("isPlay", true);
        this.$refs.yinpin.play();
      }
    },
    changejin() {
      this.$refs.yinpin.currentTime = this.value;
      this.value = this.$refs.yinpin.currentTime;
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
      }
    },
    async sousuo() {
      this.$store.commit("lishi", this.shuru);
      this.$store.commit("sousuo", this.shuru);
      let {
        data: {
          result: { songs: res },
        },
      } = await this.$host.get(
        "Api/search?keywords=" + this.$store.state.shuru
      );

      this.slist = res;
      let zl = res.slice(0, 11);
      // let artistlist=new Set()
      let artistlist = zl.map((x) => {
        return x.artists[0].id;
      });
      artistlist = Array.from(new Set(artistlist)).sort((a, b) => {
        return a - b;
      });
      artistlist = artistlist.splice(0, 3);
      let gsl = [];
      for (let t = 0; t < artistlist.length; t++) {
        let {
          data: { data: re },
        } = await this.$host.get("Api/artist/detail?id=" + artistlist[t]);
        gsl.push(re.artist);
      }
      console.log(gsl);
      this.$store.commit("geshouxin", gsl);
      this.$store.commit("slist", res);
      this.$router.push("/sou");

      let tt = [];
      for (let i = 0; i < this.$store.state.lsong.length; i++) {
        this.$store.state.slist.filter((x) => {
          if (x.id === this.$store.state.lsong[i].id) {
            tt.push(x);
          }
        });
      }

      this.$store.commit("tt", tt);
    },
    async sou(can) {
      this.shuru = can;
      this.$store.commit("lishi", can);

      this.$store.commit("sousuo", can);
      // this.sousuo();
      let {
        data: {
          result: { songs: res },
        },
      } = await this.$host.get(
        "Api/search?keywords=" + this.$store.state.shuru
      );

      this.slist = res;
      // console.log(res);

      let zl = res.slice(0, 11);
      // let artistlist=new Set()
      let artistlist = zl.map((x) => {
        return x.artists[0].id;
      });
      artistlist = Array.from(new Set(artistlist)).sort((a, b) => {
        return a - b;
      });
      artistlist = artistlist.splice(0, 3);
      let gsl = [];
      for (let t = 0; t < artistlist.length; t++) {
        let {
          data: { data: re },
        } = await this.$host.get("Api/artist/detail?id=" + artistlist[t]);
        gsl.push(re.artist);
      }
      console.log(gsl);
      this.$store.commit("geshouxin", gsl);
      this.$store.commit("slist", res);
      this.$router.push("/sou");

      let tt = [];
      for (let i = 0; i < this.$store.state.lsong.length; i++) {
        this.$store.state.slist.filter((x) => {
          if (x.id === this.$store.state.lsong[i].id) {
            tt.push(x);
          }
        });
      }

      this.$store.commit("tt", tt);
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
    dd() {
      this.$store.commit("isd", true);
    },
    nisd() {
      this.$store.commit("isd", false);
    },
  },
  async created() {},
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
/deep/.el-dropdown {
  --el-dropdown-menu-box-shadow: rgb(255, 255, 255) !important;
  --el-dropdown-menuItem-hover-fill: rgb(255, 255, 255) !important;
  --el-dropdown-menuItem-hover-color: rgb(255, 255, 255) !important;
  --el-dropdown-menu-index: 10;
  display: inline-flex;
  position: relative;
  color: rgb(255, 255, 255) !important;
  font-size: var(--el-font-size-base);
  line-height: 1;
  vertical-align: top;
}
/deep/.el-dropdown-menuItem {
  --el-dropdown-menuItem-hover: rgb(255, 255, 255) !important;
  --el-dropdown-menuItem-hover-color: rgb(255, 255, 255) !important;
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
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
}

.sou div:nth-child(2) {
  // margin-top: -4.5px;
  // position: fixed;
  margin-left: 5px;
}
// .sbiao {
//   font-size: 22px;
// }
#kuang {
  z-index: 999;
  position: relative;
  // position: absolute;
  align-self: center;
  display: flex;
  // border:1px solid rgb(17, 0, 255);
  width: 160px;
  background-color: rgb(236, 65, 65);
}
#kuang > span {
  position: absolute;

  left: 17px;

  font-size: 20px;
}
#kuang > input {
  margin-top: -5px;
  margin-left: 10px;
  // display:inline;
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
.wode > div:nth-child(1) ~ div:hover {
  background-color: rgb(235, 235, 235);
}
.wgd div:hover {
  background-color: rgb(235, 235, 235);
}
.icon {
  font-size: 15px !important;
}

.neirong {
  position: fixed;
  bottom: 90px;
  // border:2px solid blue;
  overflow: hidden;
  left: 230px;
  right: 0px;
  max-width: 100%;
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
  z-index: 3000;
  display: flex;
  background-color: rgb(255, 255, 255);
}
.fl {
  // border:1px solid red;
  width: 33.3vw;
  // margin: 10px 30px;
  display: flex;
  align-items: center;

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
.fl img:hover {
  // opacity: 0.5;
  filter: blur(1px);
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
.bofang {
  width: 100vw;
  height: 100vh;

  position: absolute;
  z-index: 2001;
}

.stixing {
  position: absolute;
  z-index: 9999 !important;
  top: 100px;
  left: 25vw;
  width: 270px !important;
  height: 450px !important;
  // border: 1px solid red;
  border: 1px solid rgb(189, 185, 185) !important;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  border-radius: 5px;
}
.ls {
  z-index: 9999;
}
.laji {
  margin-left: 10px;
}
.lishi {
  width: 100%;
  display: flex;
  align-items: center;
  align-content: space-around;
  flex-wrap: wrap;
}

.lishi span {
  border: 1px solid rgb(99, 99, 99);
  width: 110px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  margin-top: 8px;
  margin-left: 8px;
  overflow: hidden;
  border-radius: 20px;
}
.resou {
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 10px;
}
.ul {
  list-style: none;
  margin-left: -10px;
}
.ul div {
  line-height: 50px;

  margin-left: 10px;
  height: 50px;
}
.ul div:hover {
  background-color: rgb(221, 205, 205);
}
.ul div:nth-child(1) span:nth-child(1) {
  // font-size: 17px;
  font-weight: 700;
  color: red;
}
.ul div:nth-child(2) span:nth-child(1) {
  color: red;
  // font-size: 17px;
  font-weight: 700;
}
.ul div:nth-child(3) span:nth-child(1) {
  color: red;
  // font-size: 17px;
  font-weight: 700;
}
.ul div:nth-child(1) span:nth-child(2) {
  // font-size: 17px;
  font-weight: 700;
}
.ul div:nth-child(2) span:nth-child(2) {
  //  font-size: 17px;
  font-weight: 700;
}
.ul div:nth-child(3) span:nth-child(2) {
  // font-size: 17px;
  font-weight: 700;
}

.score {
  font-size: 5px;
}
.icon {
  font-size: 20px;
}
.geren {
  position: absolute;
  right: 100px;
  z-index: 9999;
  top: 100px;
  width: 320px;
  height: 400px;
  border-radius: 5px;
  border: 1px solid rgb(193, 193, 193);
  background-color: rgb(255, 255, 255);
}
.shuzi {
  display: flex;
  justify-content: space-around;
}
.shuzi {
  margin-top: 20px;
}
.shuzi > div {
  display: flex;
  flex-direction: column;
}
.shuzi > div > span:nth-child(1) {
  font-size: 20px;
  font-weight: 600;
}
.qiandao {
  margin: 10px auto;
  background-color: rgb(240, 228, 228);
  width: 100px;
  height: 35px;
  border-radius: 20px;
  line-height: 35px;
  text-align: center;
}

.lei div {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.lei > div:nth-child(1) {
  border-top: 1px solid rgb(224, 217, 217);
}
.lei > div:nth-child(1) ~ div {
  margin-top: 6.5px;
  // border:1px solid red;
}
.lei > div:hover {
  background-color: rgb(235, 223, 223);
}
.lei {
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
}
.lei div span:nth-child(2) {
  margin-right: 30px;
  float: right;
}
.el-slider {
  z-index: 3051;
}
.fr {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
}

.yin {
  margin-left: 48%;
  margin-top: 36px;
  // justify-self: center;
}
.gdx {
  width: 90px;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
}

.isdeng {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 40vw;
  margin-top: 100px;
}
.weid {
  white-space: nowrap;
  // border:1px solid rgb(0, 21, 255);
  // width:80px;
}
</style>

