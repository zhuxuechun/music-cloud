<template>
  <el-scrollbar
    v-loading="loading"
    element-loading-text="嘿,蟹不肉,正在加载中哦"
    element-loading-background="rgba(0,0,0)"
    ref="video"
  >
    <div class="q">
      <div class="lef">
        <div @click="huitui">{{ "<" }}&nbsp;MV详情</div>
        <div>
          <video :src="mvurl" autoplay controls @canplay="canplay"></video>
        </div>
        <div class="getou">
          <img :src="mv == '' ? '' : mv.artists[0].img1v1Url" alt="" />
          <span>&emsp;{{ mv === "" ? "" : mv.artists[0].name }}</span>
        </div>
        <div class="mvname">
          {{ !mv.desc ? "此用户未添加简介哦" : mv.desc }}
        </div>
        <div class="fabu">
          <span>发布:&emsp;{{ mv.publishTime }}</span
          >&emsp;
          <span>播放:&emsp;{{ mv.playCount }}</span>
        </div>
        <div class="zy">
          <div class="yuan">
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-56aixin"></use>
              </svg>
              播放({{
                mv.playCount > 10000
                  ? Math.ceil(mv.playCount / 10000) + "万"
                  : mv.playCount
              }})
            </span>
          </div>
          <div class="yuan">
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoucang1"></use>
              </svg>
              收藏({{ mv.subCount }})
            </span>
          </div>
          <div class="yuan">
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31zhuanfa"></use>
              </svg>
              转发({{ mv.shareCount }})
            </span>
          </div>
          <div class="yuan">
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-play"></use>
              </svg>
              下载(2001)
            </span>
          </div>
        </div>
        <el-input
          v-model="textarea"
          maxlength="30"
          placeholder="发表评论"
          show-word-limit
          type="textarea"
        />
        <div class="commit">
          <span class="jing">精彩评论</span>
          <div class="yitiao" v-for="x in cs" :key="x.id">
            <img
              :src="x.user.avatarUrl"
              alt=""
            />
            <div class="ping">
              <div>{{x.user.nickname}}:{{x.content}}</div>
              <div>{{x.timeStr}}</div>
            </div>
            <div class="biaoo">
              <span class="iconfont icon-dianzan">({{x.likedCount}})</span>
              <span class="iconfont icon-pinglun1">({{x.replyCount}})</span>
              <span class="iconfont icon-31zhuanfa"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="rig">
        <div class="xiang">
          相关推荐

          <div class="huan" @click="huan">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xunhuan"></use></svg
            >换一批
          </div>
        </div>
        <div class="yige" v-for="x in plist" :key="x.id" @click="guan(x)">
          <img :src="x.cover" alt="" />
          <div>
            <div class="name">{{ x.name }}</div>
            <div class="zuozhe">by&emsp;{{ x.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      mvurl: "",
      plist: "",
      mv: "",
      offset: 5,
      loading: true,
      ntime: 0,
      otime: 0,
      cs: "",
      hcs: "",
    };
  },
  watch: {
    mvurl(n, o) {
      this.otime = new Date().getTime();
      if (this.otime - this.ntime < 1500) {
        return;
      }
      console.log(this.otime - this.ntime);
      this.loading = true;
    },
  },
  methods: {
    huitui() {
      this.$router.go(-1);
    },
    async xx() {},
    async huan() {
      // this.loading=true
      if (this.offset == 45) {
        this.offset = -5;
      }
      this.offset = this.offset + 5;
      let {
        data: { data: re },
      } = await this.$host.get("Api/top/mv?limit=5&offset=" + this.offset);

      // console.log(re);
      this.plist = re;
    },
    canplay() {
      this.ntime = new Date().getTime();
      // console.log(this.ntime);
      this.loading = false;
    },

    async guan(can) {
      //   console.log(can);
      let {
        data: { data },
      } = await this.$host.get("Api/mv/url?id=" + can.id);
      this.mvurl = data.url;
      let {
        data: { data: r },
      } = await this.$host.get("Api/mv/detail?mvid=" + can.id);
      this.mv = r;
      // console.log(r);
    },
  },
  // mounted() {},
  // updated() {
  //     this.loading = true;
  // },
  async created() {
    let {
      data: { data },
    } = await this.$host.get("Api/mv/url?id=" + this.$store.state.bomv.id);
    let {
      data: { data: r },
    } = await this.$host.get("Api/mv/detail?mvid=" + this.$store.state.bomv.id);
    this.mv = r;
    let {
      data: { data: re },
    } = await this.$host.get("Api/top/mv?limit=5");
    let { data: {data:comments} } = await this.$host.get(
      "Api/comment/new?type=1&id=" + r.id + "&sortType=2"
    );
    // console.log(da);
    this.cs = comments.comments;
    // da.comments.map((x)=>{
    //   x.
    // })
    // this.hcs = da.hotComments;
    this.plist = re;
    // console.log(r);
    this.mvurl = data.url;
  },
};
</script>

<style lang="less" scoped>
.getou {
  display: flex;
  border-radius: 30px;
  border: 1px solid rgb(67, 67, 67);
  // position: relative;
  align-items: center;
}
.getou div:nth-child(1) {
  margin-left: -20px;
}
.q {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}
.q > div {
  margin-left: 30px;
}
.lef {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.lef div:nth-child(1) {
  font-size: 18px;
  font-weight: 400;
}
.lef > div:nth-child(2) {
  margin-top: 15px;
}
.lef > div {
  margin-top: 10px;
}
.lef video {
  // border:1px solid red;
  width: 100%;
  height: 100%;
}
.rig {
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.rig img {
  width: 180px;
  // height:130px;
}
.yige {
  // border:1px solid rgb(137, 135, 135);
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 15px;
  width: 30vw;
  margin-top: 15px;
  display: flex;
  margin-right: 20px;
  font-size: 13.5px;
  font-weight: 200;
}

.fabu span {
  font-size: 15px !important;
  font-weight: 250 !important;
}
.yige div {
  margin-left: 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.name {
  overflow: hidden;
  font-size: 15px;
  font-weight: 360;
}
.zuozhe {
  overflow: hidden;
}
.xiang {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 19px;
  width: 30vw;
  margin-right: 20px;
  font-weight: 400;
  // border:1px solid red;
  margin: 5px auto;
}
.mvname {
  // width: 40vw;
  overflow: hidden;
  height: 85px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid rgb(89, 89, 89);
  // background-color: rgba(233, 239, 239, 0.788);
}
.getou img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
@media only screen and (max-width: 1200px) {
  .rig {
    display: none;
  }
}
.huan {
  font-size: 14px;
}
.yige img {
  border-radius: 8px;
}
.zy {
  // border:1px solid red;
  display: flex;
  // justify-content: space-between;
  align-items: center;
}
.zy > div {
  font-size: 16px !important;
  width: 130px;
  height: 30px;
  border-radius: 15px;
  text-align: center;

  border: 1px solid rgb(219, 218, 218);
}
.zy > div:nth-child(1) ~ div {
  margin-left: 25px;
  // margin-top:0 !important;
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
  height: 80px;
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

