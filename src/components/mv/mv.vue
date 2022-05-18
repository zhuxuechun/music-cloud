<template>
  <el-scrollbar max-height="75vh">
    <div class="t">
      <div @click="tiao('mv')" :class="tao === 'mv' ? 'tt' : ''">MV</div>
      <div @click="tiao('shi')" :class="tao === 'shi' ? 'tt' : ''">视频</div>
      <div class="huan" @click="huanyi">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use></svg
        >换一批
      </div>
    </div>
    <div class="zhuti">
      <div class="mv" v-for="x in mvimg" :key="x" @click="mvv(x)">
        <img :src="x.cover" alt="" />
        <div class="count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang-copy"></use>
          </svg>
          {{ x.playCount }}
        </div>
        <div class="name">{{ x.name }}</div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      mvimg: "",
      tao: "mv",
      offset: 0,
    };
  },
  methods: {
    async tiao(can) {
      this.tao = can;
      if(can==='mv'){
        this.huanyi()
      }
      if(can==='shi'){
        let {
        data: { data },
      } = await this.$host("Api/mv/exclusive/rcmd?limit=12&offset=" + this.offset);
      this.mvimg = data;
      }
    },
    mvv(can) {
      this.$store.commit("dqmv", can);
      this.$router.push("mvd");
    },
    async huanyi() {
      if (this.mvimg.length<12||!this.mvimg) {
        this.offset = -12;
      }

      this.offset += 12;
      let {
        data: { data },
      } = await this.$host("Api/mv/all?limit=12&offset=" + this.offset);
      this.mvimg = data;
    },
  },

  async created() {
    let {
      data: { data },
    } = await this.$host("Api/mv/all?limit=12");
    // console.log(data);
    this.mvimg = data;
  },
};
</script>

<style lang="less" scoped>
.t {
  margin: 0 20px;
  margin-top: 20px;
  display: flex;
  font-size: 20px;
  align-items: center;
}
.huan {
  margin-left: 20px;
  font-size: 15px;
  font-weight: 350;
}
.tt {
  text-decoration: underline solid 3.5px;
  text-decoration-color: rgb(244, 2, 22);
}
.t div:nth-child(2) {
  margin-left: 20px;
}
.zhuti {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // justify-items: start;
  justify-items: self-start;
  // align-items:center;
  align-content: space-around;
}
.mv {
  align-content: space-around;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-self: flex-end;
  margin-top: 20px;
  
  position: relative;
}
.mv img {
  order:-1;
  width: 300px;
  height: 200px;
  border-radius: 10px;
}
.name {
  width: 300px;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  font-weight: 200;
}
.count {
  position: absolute;
  top: 5px;
  right: 5px;
  color: aliceblue;
}
</style>

