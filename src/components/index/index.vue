<template>
  <div class="qiehuan">
    <div @click="qiehuan('gexing')" :id="qieh === 'gexing' ? 'isqie' : ''">
      个性推荐
    </div>
    <div @click="qiehuan('zhuanshu')" :id="qieh === 'zhuanshu' ? 'isqie' : ''">
      专属定制
    </div>
    <div @click="qiehuan('gedan')" :id="qieh === 'gedan' ? 'isqie' : ''">
      歌单
    </div>
    <div @click="qiehuan('tuijian')" :id="qieh === 'tuijian' ? 'isqie' : ''">
      推荐榜
    </div>
    <div @click="qiehuan('geshou')" :id="qieh === 'geshou' ? 'isqie' : ''">
      歌手
    </div>
    <div @click="qiehuan('zuixin')" :id="qieh === 'zuixin' ? 'isqie' : ''">
      最新歌手
    </div>
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
          <img :src="item.pic" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="md">
      <span class="tuijian">推荐歌单</span>
      <div class="suiyi" v-for="(x, i) in playlists" :key="x.id">
        <!-- <span class="iconfont  plc">{{x.playCount}}</span> -->
       
       <div class="plc">
         <span class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-play"></use></svg
          >{{ x.playCount }}</span>
         </div> 
        
        <div>
          <img
            :src="x.coverImgUrl"
            alt=""
            id="img"
            @mouseenter="chudian(i)"
            @click="diange(x)"
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
  <div class="geshou" v-if="$store.state.isgeshou">
    <Geshou></Geshou>
    <!-- <geshou></geshou> -->
  </div>
</template>

<script>
import { Button } from "vant";
import Geshou from "../geshou/geshou.vue";
import geshou from "../geshou/geshou.vue";
export default {
  components: { Geshou },
  name: "Index",
  data() {
    return {
      qieh: "gexing",
      lunbopic: [],
      gedan: [],
      chu: "",
      playlists: [],
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
      // console.log(can);
      this.$store.commit("gedanye", can);
      let {
        data: { songs },
      } = await this.$host.get(
        "Api/playlist/track/all?id=" + can.id + "&limit=50"
      );
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
    },
  },

  async created() {
    const { data: res } = await this.$host.get("Api/homepage/block/page");
    this.lunbopic = res.data.blocks[0].extInfo.banners;
    // console.log(res.data.blocks[0].extInfo.banners.slice(0,11));

    const {
      data: { playlists },
    } = await this.$host.get("Api/top/playlist?limit=10");
    // console.log(playlists);
    playlists.forEach((x,i)=>{
      if(x.playCount>10000){
        x.playCount=Math.ceil(x.playCount/10000)+'万'
      }
    })
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
.plc {
  position: absolute;
  font-size: 14px;
  font-weight: 200;
  top: 0;
  right: 10px;
  // color:rgb(255, 255, 255) !important;
}
.icon{
  color:rgb(255, 255, 255) !important;
}
.suiyi {
  position: relative;
}
</style>>

