<template>
  <div class="musicDetailCard">
    <el-scrollbar max-height="100vh">
      <div class="container">
        <span class="xx">
          <svg class="icon" aria-hidden="true" @click="guanbi()">
            <use xlink:href="#icon-xiala"></use>
          </svg>
        </span>
        <div class="haha">
          <img
            src="../../assets/images/MusicDetailCard/needle.png"
            :class="$store.state.isPlay === true ? 'yao' : 'yaoo'"
            alt=""
          />
          <div>
            <img src="../../assets/images/MusicDetailCard/disc.png" class="cipan
            nihao" :class="$store.state.isPlay===true?'cipanzhuan':'buzhuan'"
            alt= />
          </div>
          <div
            class="ha"
            :class="$store.state.isPlay === true ? 'cipanzhuan' : 'buzhuan'"
            ref="geshou"
          >
            <img
              class="geshou"
              :class="$store.state.isPlay === true ? 'cipanzhuan' : 'buzhuan'"
              :src="
                $store.state.dage === ''
                  ? 'https://p4.music.126.net/fqZPrpG6ABuuHb8EVKf8HQ==/109951166924458141.jpg'
<<<<<<< HEAD
                  : $store.state.dqge.al.picUrl
=======
                  : $store.state.dqge.al.picUrl+'?param=200y200'
>>>>>>> e436518 (second)
              "
              alt=""
            />
          </div>
        </div>
        <div class="tou">
          <div>
            <h1>
              {{ $store.state.dqge === "" ? "" : $store.state.dqge.al.name }}
            </h1>
          </div>
          <div class="ming">
            {{ $store.state.dqge === "" ? "" : $store.state.dqge.name }}-{{
              $store.state.dqge === "" ? "" : $store.state.dqge.ar[0].name
            }}
          </div>
        </div>
        <div class="lyric">
          
            <LyricsScroll :lyric="lyric"></LyricsScroll>
          
        </div>
      </div>

      <!-- <div class="commit">
        <div class="quan">全部评论(1324325)</div> -->

        <!-- <div class="pinglun">
          <span class="ping" v-for="x in clist" :key="x">
            <span class="ren">
              <img
                :src="
                  x.user.avatarUrl === ''
                    ? 'https://p4.music.126.net/fqZPrpG6ABuuHb8EVKf8HQ==/109951166924458141.jpg'
                    : x.user.avatarUrl
                "
                alt=""
              />
              <span class="cname"></span>
              <span class="cn">{{ x.content }}</span>
              <span class="ctime">{{ x.timeStr }}</span>
            </span>
            <span class="zan">
              <span class="iconfont icon-dianzan">{{ x.likedCount }}</span>
              <span class="iconfont icon-pinglun1"></span>
            </span>
          </span>
        </div> -->
        
      <!-- </div> -->
      <div class="commit">
          <span class="jing">精彩评论</span>
          <div class="yitiao" v-for="x in clist" :key="x.id">
            <img
              :src="x.user.avatarUrl"
              alt=""
            />
            <div class="ping">
              <div>{{x.user.nickname}}:{{x.content}}</div>
              <div>{{x.timeStr}}</div>
            </div>
            <div class="biaoo">
              <span class="iconfont icon-dianzan">({{x.likedCount}})</span>&ensp;
              <span class="iconfont icon-pinglun1"></span>&ensp;
              <span class="iconfont icon-31zhuanfa"></span>&ensp;
            </div>
          </div>
        </div>

      <div class="fabu" v-if="$store.state.isfa === true">
        <div class="xx" @click="xx">
          <span class="iconfont icon-guanbihao"></span>
        </div>
        <div class="zhu">
          <span class="geming">歌曲:&ensp;letting go</span>
          <div class="kuang">
            <el-input maxlength="140" placeholder="写评论" type="textarea" />
          </div>
          <div class="cbiao">
            <span class="iconfont icon-aite"></span>
            <!-- <span class="iconfont "></span> -->
            <span class="iconfont icon-ziyuan60"></span>
          </div>
        </div>
        <div class="anniu">
          <!-- <el-button type="danger" :icon="Delete" circle></el-button> -->
          <el-button type="danger" round>发布</el-button>
        </div>
      </div>
      <div class="fu">
        <span class="iconfont icon-ziyuan60" @click="fabu"
          >发表我的音乐评论</span
        >
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import LyricsScroll from "../lyricsScroll/LyricsScroll.vue";
export default {
  data() {
    return {
      lyric: [[0, "正在加载歌词"]],
      clist: "",
    };
  },
  components: {
    LyricsScroll,
  },
  methods: {
    guanbi() {
      this.$store.commit("isbo");
    },
    xx() {
      this.$store.commit("isfa");
    },
    fabu() {
      this.$store.commit("isfa");
    },
    async getLyric(id) {
      let res = await this.$host.get("/lyric?id=" + this.$store.state.dqge.id);
      console.log(res);
      let lyrics = res.data.lrc.lyric;
      // 对获取到的歌词进行处理
      let arr = lyrics.split("\n");
      let array = [];
      // let obj = {};
      let time = "";
      let value = "";
      let result = [];

      //去除空行
      arr.forEach((item) => {
        if (item != "") {
          array.push(item);
        }
      });
      arr = array;
      arr.forEach((item) => {
        time = item.split("]")[0];
        value = item.split("]")[1];
        //去掉时间里的中括号得到xx:xx.xx
        var t = time.slice(1).split(":");
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });

      this.lyric = result;
      // console.log(this.lyric);
    },
  },
  async created() {
    let {
      data: { hotComments: re },
    } = await this.$host.get(
      "Api/comment/music?id=" + this.$store.state.dqge.id + "&limit=30"
    );
    //  console.log(re);
    this.clist = re;
    let res = await this.$host.get("Api/lyric?id=" + this.$store.state.dqge.id);
    console.log(res);
    let lyrics = res.data.lrc.lyric;
    // 对获取到的歌词进行处理
    let arr = lyrics.split("\n");
    let array = [];
    // let obj = {};
    let time = "";
    let value = "";
    let result = [];

    //去除空行
    arr.forEach((item) => {
      if (item != "") {
        array.push(item);
      }
    });
    arr = array;
    arr.forEach((item) => {
      time = item.split("]")[0];
      value = item.split("]")[1];
      //去掉时间里的中括号得到xx:xx.xx
      var t = time.slice(1).split(":");
      //将结果压入最终数组
      result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
    });

    this.lyric = result;
    // console.log(this.lyric);
  },
};
</script>

<style lang="less" scoped>
.musicDetailCard {
  position: absolute;
  width: 100%;
  // height: calc(100vh - 55px);
  height: 100%;
  bottom: 90px;
  left: 0;
  z-index: 2002;
  animation-duration: 2s;
  background-color: white;
  background-image: linear-gradient(to bottom, #dbbebf, rgb(250, 246, 246));
}
@keyframes zhua {
  from {
  }
  to {
    transform: rotate(360deg);
  }
}
.item {
  font-size: 20px;
  width: 30px;
  line-height: 25px;
  height: 30px;
}
.item:nth-child(3) {
  margin-top: -4px;
  text-align: center;
  line-height: 35px;
  font-size: 35px;
  width: 35px;
  height: 35px;
  background-color: rgb(243, 242, 242);
  border-radius: 50%;
}
.m {
  text-align: center;
  // border: 1px solid red;
  width: 440px;
  line-height: 80px;
  height: 70px;
}
.left {
  // border: 1px solid red;
  width: 200px;
  line-height: 60px;
  height: 60px;
}
.tou {
  margin: 0 auto;
  display: flex;
  margin-top: 10vh;
  align-items: center;
  // border: 1px solid rgb(245, 0, 0);
  width: 30rem;

  flex-direction: column;
  // text-align: center;
  justify-content: center;
  height: 8rem;
  overflow: hidden;
}
.lyric {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  // position: absolute;
  overflow: hidden;
  width: 30rem;
  // border: 1px solid red;
  height: 55vh;
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
}


.ci {
  margin: 0.8rem auto;
  text-align: center;
  line-height: 2rem;
  width: 22rem;
  overflow-y: hidden;
  height: 2rem;
}

.geshou {
  width: 220px;
  height: 220px;
  position: absolute;
  top: 269px;
  left: 150px;
  border-radius: 50%;
  animation: zhua 14s linear infinite;
}

.cipan {
  z-index: 3;
  left: 100px;
  width: 320px;
  top: 220px;
  position: absolute;
  height: 320px;
  animation: zhua 20s linear infinite;
  animation-delay: 1s;
  // border: 1px solid red;
}
.cipanzhuan {
  animation-play-state: running;
  animation-delay: 0.5s;
}
.buzhuan {
  animation-play-state: paused;
  animation-delay: 0.5s;
}
.yao {
  z-index: 4;
  width: 100px;
  position: absolute;
  top: 150px;
  left: 250px;
  height: 100px;
  transform: rotate(10deg);
  transform-origin: 0px 0px;
  animation: 3s;
  transition-duration: 1s;
  // border: 1px solid red;
  // transform-origin: 30px 0;
}
.yaoo {
  z-index: 4;
  width: 100px;
  position: absolute;
  top: 150px;
  left: 250px;
  height: 100px;
  transform-origin: 0px 0px;
  transform: rotate(-16deg);
  // animation: 3s;
  transition-duration: 1s;
  // border: 1px solid red;
  // transform-origin: 30px 0;
}

.zhuan {
  transform: rotate(-23deg);
  // animation: 3s;
  transition-duration: 0.5s;
}
// .ping {
//   height: 60px;
//   border-bottom: 1px solid rgb(235, 229, 229);
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// }
.ren {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  align-items: flex-start;
}
.ren img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: auto 10px;
}
.zan {
  // display: flex;
  align-self: flex-end;
  margin-right: 10px;
}
.zan span {
  width: 50px;
  height: 30px;
  line-height: 30px;
  // margin: 10px auto;
  margin-left: 10px;

  // font-size: ;
}
.cn {
  width: 530px;
  // height:17px;
  overflow: hidden;
  white-space: nowrap;
}
.quan {
  // margin-top: -20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700px;
}
.fabu {
  width: 500px;
  height: 300px;
  position: fixed;
  z-index: 9999 !important;
  // margin: -400px auto;
  left: 34%;
  bottom: 240px;
  background-color: rgb(255, 255, 255);
}

@left: 50%-150px;
.fu {
  position: fixed;
  z-index: 3001;
  margin: 20px auto;
  bottom: 20px;
  opacity: 0.7;
  width: 200px;
  // @wi:50vw;
  left: @left;
  left: 43%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  bottom: 90px;
  border-radius: 20px;
  background-color: rgb(200, 200, 200);
}
.fu > span {
  background-color: rgb(200, 202, 202);
  opacity: 0.7;
  font-weight: 500;
  font-size: 14px;
}
.zhu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.geming {
  margin-top: 18px;
  font-size: 18px;
  font-weight: 500;
}
.kuang {
  width: 70%;
  margin: 10px auto;
  align-self: center;
  height: 180px;
  border: 1px solid rgb(141, 137, 137);
}
.xx {
  // float:right;
  // position: relative;
  position: absolute;
  // margin-right:30px;
  right: 10px;
}
.xx span {
  font-size: 30px;
}
.cbiao {
  display: flex;
  margin-left: -300px;
  font-size: 19px;

}
.el-textarea {
  // height: 250px;

  --el-input-text-color: rgb(0, 0, 0);
  // --el-input-border: var(--el-border-base);
  // --el-input-border-color: 1px solid #fff;
  --el-input-border-radius: var(--el-border-radius-base);
  --el-input-bg-color: #fff;
  --el-input-icon-color: #fff;
  // --el-input-placeholder-color:  #fff;
  --el-input-hover-border: 1px solid #fff;
  --el-input-clear-hover-color: #fff;
  --el-input-focus-border: 1px solid #fff;
  --el-input-height: 250px;
  --el-input-border: 1px solid #fff;
}
.anniu {
  float: right;
  // width:60px;
  margin-right: 20px;
  margin-top: -30px;
}
.el-button {
  width: 90px;
}
.xx {
  position: absolute;
  top: 100px;
  left: 40px;
  font-size: 60px;
  // z-index: ;
}
.icon {
  font-size: 30px !important;
}
.commit {
  width:45vw;
  margin: 0 auto;
  font-size:13.5px;
  // color: red;
  // border:1px solid red;
  // margin-top: 5vh;
  margin-bottom: 10vh;
}
.yitiao > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.yitiao {
  overflow: hidden;
  position: relative;
  display: flex;
  height: 90px;
  align-items: center;
  // width:50vw !important;
  // border: 1px solid red;
  // justify-content: space-between;
}

.biaoo {
  // align-self: baseline;
  font-size: 16px !important;
  font-weight: 400;
  display: block;
  position: absolute;
  // margin-left:10vw;
  // width: 0;
  right: 0;
  bottom: 0;
}
.jing {
  font-size: 20px;
  font-weight: 400;
}
.ping {
  height:80%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;

}
.ping > div:nth-child(1) {
  font-size: 16px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient:vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-weight: 400;
}
.ping > div:nth-child(2) {
  font-size: 13.5px;
}
.biaoo>span:nth-child(3){
  font-size: 20px;
}
</style>

