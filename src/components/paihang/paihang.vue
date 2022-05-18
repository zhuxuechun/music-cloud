<template>
  <div class="zong" @click="kong" v-loading="load">
    <el-scrollbar height="65vh">
      <div class="guanfang">官方榜</div>
      <div class="bang" v-for="x in slist" :key="x.id">
        <img :src="x.coverImgUrl" alt="" @click="diange(x)" />
        <div class="gequ">
          <div
            :class="haha === x.tracks[0].id ? 'ge shen' : 'ge'"
            @mouseenter="jin(x.tracks[0].id)"
          >
            <span
              ><span class="red">1</span>&ensp;<span
                @click="chuan(x.tracks[0])"
                >{{ x.tracks[0].name }}</span
              ></span
            >
            <span class="zz">{{ x.tracks[0].ar[0].name }}</span>
          </div>
          <div
            :class="haha === x.tracks[1].id ? 'ge shen' : 'ge'"
            @mouseenter="jin(x.tracks[1].id)"
          >
            <span
              ><span class="red">2</span>&ensp;<span
                @click="chuan(x.tracks[1])"
                >{{ x.tracks[1].name }}</span
              ></span
            >
            <span class="zz">{{ x.tracks[1].ar[0].name }}</span>
          </div>
          <div
            :class="haha === x.tracks[2].id ? 'ge shen' : 'ge'"
            @mouseenter="jin(x.tracks[2].id)"
            @click="chuan(x.tracks[2])"
          >
            <span
              ><span class="red">3</span>&ensp;<span>{{
                x.tracks[2].name
              }}</span></span
            >
            <span class="zz">{{ x.tracks[2].ar[0].name }}</span>
          </div>
          <div
            :class="haha === x.tracks[3].id ? 'ge shen' : 'ge'"
            @mouseenter="jin(x.tracks[3].id)"
            @click="chuan(x.tracks[3])"
          >
            <span
              >4&ensp;<span>{{ x.tracks[3].name }}</span></span
            >
            <span class="zz">{{ x.tracks[3].ar[0].name }}</span>
          </div>
          <div
            :class="haha === x.tracks[4].id ? 'ge shen' : 'ge'"
            @mouseenter="jin(x.tracks[4].id)"
            @click="chuan(x.tracks[4])"
          >
            <span
              >5&ensp;<span>{{ x.tracks[4].name }}</span></span
            >
            <span class="zz">{{ x.tracks[4].ar[0].name }}</span>
          </div>
          <div
            :class="haha === x.id ? 'gengduo shen' : 'gengduo'"
            @mouseenter="jin(x.id)"
          >
            <span @click="diange(x)">查看更多</span> &ensp;>
          </div>
        </div>
      </div>
      <div class="quanqiu">全球榜</div>
      <div class="tutu">
        <div class="tu" v-for="it in tulist" :key="it.id">
          <img
            :src="it.coverImgUrl"
            alt=""
            @mouseenter="cb(it.id)"
            @click="diange(it)"
          />
          <div class="c">
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use></svg
              >{{ Math.round(it.playCount / 10000) + "万" }}
            </span>
          </div>
          <div :class="tuid === it.id ? 'bo' : 'wu'">
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use>
              </svg>
            </span>
          </div>

          <div>{{ it.name }}</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slist: [],
      haha: "",
      tulist: "",
      tuid: "",
      load: true,
    };
  },

  methods: {
    gengduo(can) {
      console.log(can);
    },
    async diange(can) {
      this.$router.push("gedan");
      //   console.log(can);
      this.$store.commit("gedanye", can);
      let {
        data: { songs },
      } = await this.$host.get(
        "Api/playlist/track/all?id=" + can.id + "&limit=50"
      );
      this.$store.commit("gdlist", songs);
      this.$store.commit("slist", songs);
    },
    cb(can) {
      this.tuid = can;
    },
    kong() {
      this.haha = "";
    },
    jin(can) {
      this.haha = can;
    },
    async chuan(can) {
      this.$store.commit("isPlay", true);
      //   console.log(can);
      let {
        data: { data: res },
      } = await this.$host.get("Api/song/url?id=" + can.id);
      // console.log(res);
      let {
        data: { songs },
      } = await this.$host.get("Api/song/detail?ids=" + can.id);
      this.$store.commit("dqge", songs[0]);
      this.$store.commit("chuan", res);
    },
  },
  async created() {
    let { data } = await this.$host.get("Api/toplist");
    data.list.forEach((x) => {
      x.coverImgUrl = x.coverImgUrl + "?param=200y200";
    });
    this.tulist = data.list.slice(4);
    // console.log(this.tulist);
    for (let i = 0; i < 4; i++) {
      let {
        data: { playlist: slist },
      } = await this.$host.get("Api/playlist/detail?id=" + data.list[i].id);
      slist.coverImgUrl = slist.coverImgUrl + "?param=200y200";
      this.slist.push(slist);
    }
    this.load = false;
  },
};
</script>

<style lang="less" scoped>
.zong {
  width: 80%;
  margin-bottom: 90px;
  margin-left: 60px;
}
.guanfang {
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: 550;
  //   justify-content: space-around;
}
.bang {
  display: flex;
  // flex-direction: ;
}
.bang > img {
  width: 220px;
  border-radius: 10px;
}
.gequ {
  width: 75%;
  //   border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 30px;
}
.gequ > div {
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  background-color: rgb(240, 242, 244);
}
.bang {
  margin-bottom: 30px;
}
.red {
  color: rgb(194, 15, 15);
}
.ge {
  display: flex;
  justify-content: space-between;
}
.gequ > div > span:nth-child(1) {
  margin-left: 10px;
}
.gequ > div > span:nth-child(2) {
  margin-right: 10px;
}
.gengduo > span {
  margin-left: 10px;
}
.shen {
  background-color: rgb(211, 199, 199) !important;
}
.quanqiu {
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: 550;
}
.tutu {
  display: flex;
  flex-wrap: wrap;
  //   justify-content: space-between;
}
.tu {
  position: relative;
  order: 0;
  margin-bottom: 10px;
  margin-right: 40px;
}
.tu > img {
  width: 200px;
  border-radius: 10px;
}
.c {
  position: absolute;
  top: 0px;
  right: 5px;
  color: rgb(255, 255, 255);
}
.icon {
  color: rgb(255, 255, 255) !important;
}
.bo {
  position: absolute;
  top: 75px;
  left: 85px;
  font-size: 35px;
}
.wu {
  display: none;
}
</style>

