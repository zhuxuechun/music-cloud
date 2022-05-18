<template>
  <div class="zong">
    <div class="fen">
      <div class="yuzhong">
        <span>语种:</span>
        <span @click="so(-1)" :id="area === -1 ? 'shiyan' : ''">全部</span>
        <span @click="so(7)" :id="area === 7 ? 'shiyan' : ''">华语</span>
        <span @click="so(96)" :id="area === 96 ? 'shiyan' : ''">欧美</span>
        <span @click="so(8)" :id="area === 8 ? 'shiyan' : ''">日本</span>
        <span @click="so(16)" :id="area === 16 ? 'shiyan' : ''">韩国</span>
        <span @click="so(0)" :id="area === 0 ? 'shiyan' : ''">其他</span>
      </div>
      <div class="fenlei">
        <span>分类:</span>
        <span @click="sousuo(-1)" :id="type === -1 ? 'shiyan' : ''">全部</span>
        <span @click="sousuo(1)" :id="type === 1 ? 'shiyan' : ''">男歌手</span>
        <span @click="sousuo(2)" :id="type === 2  ? 'shiyan' : ''">女歌手</span>
        <span @click="sousuo(3)" :id="type === 3  ? 'shiyan' : ''">乐队组合</span>
      </div>
      <div class="shai">
        <span>筛选:</span>
        <span>热门</span>
        <span>A</span>
      </div>

      <div class="demo-image__lazy imgg">
        <el-scrollbar height="45vh">
          <img
            v-for="x in sou"
            :key="x.id"
            :src="x.picUrl"
            class="img"
            alt=""
            @click="gsd(x.name)"
          />
        </el-scrollbar>
      </div>
    </div>
    <div class="fenn">
      <div>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="50"
          class="mt-4"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      sou: "",
      type: -1,
      area: -1,
    };
  },
  methods: {
    gsd(can){
      console.log(can);
      this.$store.commit("sousuo",can);
      this.$router.push("/sou");

    },
    async so(can) {
      this.area = can;
      let {
        data: { artists: res },
      } = await this.$host.get(
        "Api/artist/list?type=" +
          this.type +
          "&area=" +
          this.area +
          "&initial=-1"
      );
      res.forEach((x, i) => {
        if (x.picUrl === "") {
          res.splice(i, 1);
        }
        x.picUrl = x.picUrl + "?param=200y200";
      });
      this.sou = res;
      //  console.log(res);
    },
    async sousuo(can) {
      this.type = can;
      let {
        data: { artists: res },
      } = await this.$host.get(
        "Api/artist/list?type=" +
          this.type +
          "&area=" +
          this.area +
          "&initial=-1"
      );
      res.forEach((x, i) => {
        if (x.picUrl === "") {
          res.splice(i, 1);
        }
        x.picUrl = x.picUrl + "?param=200y200";
      });
      this.sou = res;
    },
  },
  async created() {
    let {
      data: { artists: res },
    } = await this.$host.get("Api/artist/list?type=-1&area=-1&initial=-1");
    this.sou = res;
   res.forEach((x, i) => {
        if (x.picUrl === "") {
          res.splice(i, 1);
        }
        x.picUrl = x.picUrl + "?param=200y200";
      });
    // console.log(res);
    this.$store.commit("geshouimg", res);
  },
};
</script>

<style lang="less" scoped>
.zong {
  z-index: 3000;
  width: 100vw;
<<<<<<< HEAD
  //   top:170px;
  //   position: fixed;
  //   bottom:90px
=======
>>>>>>> e436518 (second)
}
.yuzhong {
  font-size: 14px;
  font-weight: 160;
  margin-top: 10px;
  margin-left: 100px;
  width: 465px;
  display: flex;
  justify-content: space-between;
}
#shiyan {
  color: red !important;
}
.fenlei {
  font-size: 14px;
  font-weight: 160;
  margin-top: 10px;
  margin-left: 100px;
  height: 30px;
  line-height: 30px;
  width: 500px;
  //    border:1px solid red;
  display: flex;
  // justify-content: space-between;
}
.fenlei span:nth-child(1) ~ span {
  margin-left: 43.5px;
}
<<<<<<< HEAD
// .fenlei span:nth-child(2) {
//   color: red;
//   // width:40px;
//   //  height:20px;
//   // line-height: 20px;
//   // text-align: center;
//   // background-color: rgb(227, 233, 238);
//   // border-radius: 8px;
// }
// .yuzhong span:nth-child(2) {
//   color: red;
//   // width:40px;
//   // height:20px;
//   // line-height: 20px;
//   // text-align: center;
//   // background-color: rgb(227, 233, 238);
//   // border-radius: 8px;
// }
=======

>>>>>>> e436518 (second)
.shai {
  margin-left: 100px;
  margin-top: 10px;
  width: 500px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 160;
}
.imgg {
  width: 80%;
  margin-top: 20px;
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
}
.img {
  width: 200px;
  height: 200px;
  //   border: 1px solid red;
  border-radius: 15px;
}
.imgg img {
  margin-top: 10px;
  margin-left: 30px;
}
.fenn {
  display: flex;
  // margin:auto auto;
  //   justify-content: space-around;
  // align-items: center;
  margin-top: 15px;
  margin-left: 30px;
  justify-items: center;
  text-align: center;
}
</style>

