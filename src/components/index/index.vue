<template>
  <div class="qiehuan">
<<<<<<< HEAD
    <div @click="qiehuan('gexing')" :id="qieh === 'gexing' ? 'isqie' : ''">
=======
  <div @click="qiehuan('gexing')" :id="qieh === 'gexing' ? 'isqie' : ''">
>>>>>>> e436518 (second)
      个性推荐
    </div>
    <div @click="qiehuan('zhuanshu')" :id="qieh === 'zhuanshu' ? 'isqie' : ''">
      专属定制
    </div>
    <div @click="qiehuan('gedan')" :id="qieh === 'gedan' ? 'isqie' : ''">
      歌单
    </div>
<<<<<<< HEAD
    <div @click="qiehuan('tuijian')" :id="qieh === 'tuijian' ? 'isqie' : ''">
=======
    <div @click="qiehuan('paihang')" :id="qieh === 'tuijian' ? 'isqie' : ''">
>>>>>>> e436518 (second)
      推荐榜
    </div>
    <div @click="qiehuan('geshou')" :id="qieh === 'geshou' ? 'isqie' : ''">
      歌手
    </div>
    <div @click="qiehuan('zuixin')" :id="qieh === 'zuixin' ? 'isqie' : ''">
      最新歌手
<<<<<<< HEAD
    </div>
=======

  <!-- </div> -->
  <!-- <van-tabs class="qiehuan">
    <van-tab title="个性推荐" @click="qiehuan('gexing')"></van-tab>
    <van-tab title="专属定制" @click="qiehuan('zhuanshu')"></van-tab>
    <van-tab title="歌单" @click="qiehuan('gedan')"></van-tab>
    <van-tab title="推荐榜" @click="qiehuan('paihang')"></van-tab>
    <van-tab title="歌手" @click="qiehuan('geshou')"></van-tab>
    <van-tab title="最新歌手" @click="qiehuan('zuixin')"></van-tab>
  </van-tabs> -->
>>>>>>> e436518 (second)
  </div>
  <el-scrollbar height="70vh" class="gundong">
    <div class="faxian">
      <el-carousel
        :interval="3000"
        type="card"
        height="200px"
        loop="true"
        width="100vw"
        initial-index="0"
      >
        <el-carousel-item v-for="(item, index) in lunbopic" :key="index">
<<<<<<< HEAD
          <img :src="item.pic" alt="" />
=======
          <img :src="item.pic + '?param=y200'" alt="" />
>>>>>>> e436518 (second)
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="md">
      <span class="tuijian">推荐歌单</span>
      <div class="suiyi" v-for="(x, i) in playlists" :key="x.id">
        <!-- <span class="iconfont  plc">{{x.playCount}}</span> -->
<<<<<<< HEAD
       
       <div class="plc">
         <span class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-play"></use></svg
          >{{ x.playCount }}</span>
         </div> 
        
        <div>
          <img
            :src="x.coverImgUrl"
=======

        <div class="plc">
          <span class="icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gf-play"></use></svg
            >{{ x.playCount }}</span
          >
        </div>

        <div>
          <img
            :src="x.coverImgUrl + '?param=200y200'"
>>>>>>> e436518 (second)
            alt=""
            id="img"
            @mouseenter="chudian(i)"
            @click="diange(x)"
<<<<<<< HEAD
=======
            class="demo-image__lazy"
>>>>>>> e436518 (second)
          />
          <span :class="chu === i ? 'bo' : 'boo'">
            <span class="icon">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="chu === i ? '#icon-bofang2' : ''"></use></svg
            ></span>
          </span>
        </div>

        <span>{{ x.name }}</span>
      </div>
    </div>
  </el-scrollbar>
<<<<<<< HEAD
  <div class="geshou" v-if="$store.state.isgeshou">
    <Geshou></Geshou>
    <!-- <geshou></geshou> -->
=======
  <div class="geshou" v-if="qieqie === 'geshou'">
    <Geshou></Geshou>
  </div>
  <div class="paihang" v-if="qieqie === 'paihang'">
    <Paihang></Paihang>
>>>>>>> e436518 (second)
  </div>
</template>

<script>
import { Button } from "vant";
<<<<<<< HEAD
import Geshou from "../geshou/geshou.vue";
import geshou from "../geshou/geshou.vue";
export default {
  components: { Geshou },
=======
import dayjs from "dayjs";
import Geshou from "../geshou/geshou.vue";
import geshou from "../geshou/geshou.vue";
import Paihang from "../../components/paihang/paihang.vue";
export default {
  components: {
    Geshou,
    Paihang,
  },
>>>>>>> e436518 (second)
  name: "Index",
  data() {
    return {
      qieh: "gexing",
      lunbopic: [],
      gedan: [],
      chu: "",
      playlists: [],
<<<<<<< HEAD
=======
      qieqie: "",
>>>>>>> e436518 (second)
    };
  },
  props: {
    Geshou,
  },
  methods: {
    chudian(can) {
      this.chu = can;
      // console.log(can);
    },
    async diange(can) {
<<<<<<< HEAD
      // console.log(can);
=======
      this.$router.push("gedan");
      can.createTime = dayjs(can.createTime).format("YYYY-MM-DD");
>>>>>>> e436518 (second)
      this.$store.commit("gedanye", can);
      let {
        data: { songs },
      } = await this.$host.get(
        "Api/playlist/track/all?id=" + can.id + "&limit=50"
      );
<<<<<<< HEAD
      //  console.log(songs);
      this.$store.commit("gdlist", songs);
      this.$store.commit("slist", songs);

      this.$router.push("gedan");
    },
    qiehuan(can) {
      this.qieh = can;
      if (can === "geshou") {
        this.$store.commit("geshou");
      } else this.$store.commit("bxgeshou");
=======
      this.$store.commit("gdlist", songs);
      this.$store.commit("slist", songs);
    },
    qiehuan(can) {
      this.qieh = can;
      this.qieqie = can;
>>>>>>> e436518 (second)
    },
  },

  async created() {
    const { data: res } = await this.$host.get("Api/homepage/block/page");
    this.lunbopic = res.data.blocks[0].extInfo.banners;
<<<<<<< HEAD
    // console.log(res.data.blocks[0].extInfo.banners.slice(0,11));
=======
>>>>>>> e436518 (second)

    const {
      data: { playlists },
    } = await this.$host.get("Api/top/playlist?limit=10");
<<<<<<< HEAD
    // console.log(playlists);
    playlists.forEach((x,i)=>{
      if(x.playCount>10000){
        x.playCount=Math.ceil(x.playCount/10000)+'万'
      }
    })
=======

    playlists.forEach((x, i) => {
      if (x.playCount > 10000) {
        x.playCount = Math.ceil(x.playCount / 10000) + "万";
        x.coverImgUrl = x.coverImgUrl + "?param=300y300";
      }
    });
>>>>>>> e436518 (second)
    this.playlists = playlists;
  },
};
</script>

<style lang="less" scoped>
.faxian {
  margin: 0 auto;
  width: 75vw;
  margin-top: 90px;
}
.qiehuan {
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 4;
  vertical-align: middle;
  display: flex;
  // left:19%;
  width: 100vw;
  // border:1px solid red;
  margin: 0 auto;
  align-items: center;
}
.qiehuan div {
  font-size: 17px;
  margin-right: 20px;
  line-height: 80px;
  text-align: center;
}
.qiehuan div:nth-child(1) {
  margin-left: 62px;
}
#isqie {
  font-size: 22px;
  text-decoration: 4px underline red;
  font-weight: 700;
  // text-decoration: ;
}

.carousel-img {
  width: 100%;
  height: 240px;
  border-radius: 20px;
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
.md {
  display: flex;
  width: 75vw;
  margin: 0 auto;
  justify-content: space-between;
  flex-wrap: wrap;
  // justify-items: start;
}
.md .tuijian {
  width: 70vw;
  display: flex;
  align-items: center;
  font-size: 22px;
  height: 60px;
}
.md .suiyi {
  // justify-items: start;
  width: 210px;
  height: 265px;
}
.md .suiyi > div img {
  width: 210px;
  height: 210px;
  border-radius: 20px;
}
.md .suiyi .bo {
  float: right;
  position: relative;
  font-size: 24px;
  margin-top: -50px;
  margin-right: 20px;

  // z-index: 5;
}
.md .suiyi .boo {
  float: right;
  position: relative;
  font-size: 24px;
  margin-top: -50px;
  margin-right: 20px;
  display: none;
}

#img:hover {
  background-color: rgb(0, 0, 0);
  opacity: 0.6;
  color: #000;
}
.md .suiyi {
  overflow: hidden;
}
.carousel {
  width: 100%;
}

.el-carousel {
  margin: auto;
  width: 70vw;
}

.el-carousel__item {
  border-radius: 10px;
}

.el-carousel__item img {
  height: 100%;
  border-radius: 10px;
}

.recommendMusicList {
  margin: 20px 10px;
}

.recommendMusicList h3 {
  color: #373737;
}
.geshou {
  position: fixed;
  top: 150px;
  width: 100%;
  z-index: 2008;
  background-color: rgb(255, 255, 255);
  height: 80%;
}
<<<<<<< HEAD
=======
.paihang {
  position: fixed;
  top: 150px;
  // border: 4px solid red;
  width: 100%;
  z-index: 2008;
  background-color: rgb(255, 255, 255);
  bottom: 90px;
}
>>>>>>> e436518 (second)
.plc {
  position: absolute;
  font-size: 14px;
  font-weight: 200;
  top: 0;
  right: 10px;
  // color:rgb(255, 255, 255) !important;
}
<<<<<<< HEAD
.icon{
  color:rgb(255, 255, 255) !important;
=======
.icon {
  color: rgb(255, 255, 255) !important;
>>>>>>> e436518 (second)
}
.suiyi {
  position: relative;
}
</style>>

