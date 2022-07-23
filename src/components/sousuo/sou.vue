<template>
  <el-scrollbar>
    <div class="he">
      <div class="tishi">
        <span>搜索&ensp;{{ this.$store.state.shuru }}</span>
        <span>你可能感兴趣</span>
      </div>

      <div class="kuai">
        <div class="geshou" v-for="x in $store.state.geshouxin" :key="x.cover">
          <img
            :src="
              !$store.state.geshouxin
                ? 'https://p4.music.126.net/fqZPrpG6ABuuHb8EVKf8HQ==/109951166924458141.jpg'
                : x.cover
            "
            alt=""
          />
          <div>
            <span
              >歌手:&ensp;{{ !$store.state.geshouxin ? "未知" : x.name }}</span
            >
            <span
              >MV:&ensp;{{
                $store.state.geshouxin ? x.mvSize : "未知"
              }},&ensp;歌曲:&ensp;{{
                $store.state.geshouxin ? x.musicSize : "未知"
              }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="qiehuan">
      <a
        href="#"
        v-for="x in qie"
        :key="x.id"
        @click="qiee(x.n)"
        :id="qieee === x.n ? 'qie' : ''"
        >{{ x.n }}</a
      >
    </div>

    <div class="gun">
      <n-table
        striped
        size="small"
        bordered="false"
        single-column="true"
        single-line="true"
      >
        <thead>
          <tr>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>不知道</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, i) in $store.state.slist" :key="x.id">
            <td class="h">
              <template v-if="$store.state.dqge.id !== x">{{
                i < 9 ? "0" + (i + 1) : i + 1
              }}</template>
              <template v-else
                ><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-laba1"></use></svg
              ></template>
              &ensp;<span @click="chuan(x)"
                ><a href="#"
                  >{{ x.name }}
                  <span>
                    <svg class="icon" aria-hidden="true" @click="zan(x)">
                      <use
                        :xlink:href="
                          $store.state.tt.indexOf(x) === -1
                            ? '#icon-56aixin'
                            : '#icon-aixin'
                        "
                      ></use>
                    </svg> </span
                  >&nbsp;
                  <span v-if="x.mvid !== 0">
                    <svg class="icon" aria-hidden="true" @click="mvv(x.mvid)">
                      <use xlink:href="#icon-MV"></use>
                    </svg> </span
                  >&nbsp;
                  <span v-if="x.fee == 8">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-vip"></use>
                    </svg>
                  </span>
                </a>
              </span>
            </td>
            <td>{{ x.artists[0].name }}</td>
            <td>{{ x.album.name }}</td>
            <td>...</td>
          </tr>
        </tbody>
      </n-table>
    </div>

    <div class="fenye">
      <div class="fenn">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          @prev-click="shangye"
          @next-click="xiaye"
        />
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: "sou",
  data() {
    return {
      qie: [
        { id: 1, n: "单曲" },
        { id: 2, n: "歌手" },
        { id: 3, n: "专辑" },
        { id: 4, n: "视频" },
        { id: 5, n: "歌单" },
        { id: 6, n: "歌词" },
        { id: 7, n: "播客" },
        { id: 8, n: "声音" },
        { id: 9, n: "用户" },
      ],
      songxinxi: [],
      geshou: [],
      geshouxin: [],
      shuru: this.$store.state.shuru,
      qieee: "单曲",
      slist: this.$store.state.slist,
      album: [],
      isbo: "",
      isai: "",
      offset: 0,
      tt: "",
    };
  },
  watch: {},
  props: {},
  methods: {
    async haha() {
      let {
        data: {
          result: { songs: res },
        },
      } = await this.$host.get(
        "Api/search?keywords=" + this.$store.state.shuru
      );

      // console.log(res);
      let artist = res.filter((x) => {
        return x.artists[0].id < 10000;
      });

      if (artist) {
        this.geshou = artist[0];
        let {
          data: { data: re },
        } = await this.$host.get(
          "Api/artist/detail?id=" + artist[0].artists[0].id
        );
        console.log(re);
        this.geshouxin = re.artist;
      } else {
        this.geshou = res[0];
        let {
          data: { data: re },
        } = await this.$host.get(
          "Api/artist/detail?id=" + res[0].artists[0].id
        );
        this.geshouxin = re.artist;
      }
    },
    async shangye() {
      if (this.offset === 0) {
        return;
      }
      this.offset -= 30;
      let {
        data: {
          result: { songs },
        },
      } = await this.$host.get(
        "Api/search/?&offset=" +
          this.offset +
          "&keywords=" +
          this.$store.state.shuru
      );
      this.$store.commit("slist", songs);
    },
    async xiaye() {
      if (this.offset === 150) {
        return;
      }
      this.offset += 30;
      let {
        data: {
          result: { songs },
        },
      } = await this.$host.get(
        "Api/search/?&offset=" +
          this.offset +
          "&keywords=" +
          this.$store.state.shuru
      );
      this.$store.commit("slist", songs);
    },
    mvv(can) {
      if (can !== 0) {
        this.$store.commit("dqmv", { id: can });
        this.$router.push("mvd");
      }
    },
    async zan(can) {
      console.log(can);
      let { data: res } = await this.$host.get(
        "Ben/user/songs?username=" + this.$store.state.user.username
      );
      this.$store.commit("zlove", res);
      if (this.$store.state.user === "") {
        ElMessageBox.alert("你没登录,点什么赞,我数据往哪儿加???", "未登录!", {
          confirmButtonText: "请先登录",
        });
        return;
      }

      this.$nextTick(() => {
        if (can.status !== 2001) {
          can.status = 2001;
          this.$host.get(
            "Ben/user/add?sid=" +
              can.id +
              "&username=" +
              this.$store.state.user.username +
              "&song=" +
              can.name +
              "&singer=" +
              can.artists[0].name +
              "&url=url&state=" +
              can.album.name
          );
        } else if (can.status === 2001) {
          can.status = 0;
          this.$host.get("Ben/user/delete?sid=" + can.id);
        }
      });
    },
    async chuan(can) {
      // console.log(can);
      this.$store.commit("isPlay", true);
      this.isbo = can;
      let {
        data: { data: res },
      } = await this.$host.get("Api/song/url?id=" + can.id);
      let {
        data: { songs },
      } = await this.$host.get("Api/song/detail?ids=" + can.id);
      this.$store.commit("dqge", songs[0]);
      this.$store.commit("chuan", res);
    },
    qiee(can) {
      this.qieee = can;
    },
    jieguo() {
      let jie = this.$host.get(
        "Api/search?keywords=" + this.$store.state.shuru
      );
    },
  },
  async created() {
    // console.log(this.$store.state.shuru);
    let {
      data: {
        result: { songs: res },
      },
    } = await this.$host.get("Api/search?keywords=" + this.$store.state.shuru);

    this.slist = res;
    let zl = res.slice(0, 11);
    // let artistlist=new Set()
    let artistlist = zl.map((x) => {
      return x.artists[0].id;
    });
    artistlist = Array.from(new Set(artistlist))
      .sort((a, b) => {
        return a - b;
      })
      .splice(0, 3);

    let gsl = [];
    for (let t = 0; t < artistlist.length; t++) {
      let {
        data: { data: re },
      } = await this.$host.get("Api/artist/detail?id=" + artistlist[t]);
      gsl.push(re.artist);
    }

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
};
</script>

<style lang="less" scoped>
.he {
  margin-left: 30px;
}
.kuai {
  margin-top: 10px;
  display: flex;
  // justify-content: space-around;
}
.tishi {
  display: flex;
  flex-direction: column;
}
.tishi span:nth-child(1) {
  font-size: 23px;
  font-weight: 550;
}
.tishi span:nth-child(2) {
  font-size: 14px;
  font-weight: 100;
}
.geshou {
  display: flex;
  align-items: center;

  width: 270px;
  height: 80px;
  // border: 1px solid red;
  background-color: rgb(241, 236, 236);
  border-radius: 10px;
}
.geshou img {
  width: 50px;
  height: 50px;
  margin: auto 6px;
  border-radius: 50%;
}
.geshou div {
  // margin-left: 10px;
  // display: inline-flex;
  display: flex;
  flex-direction: column;
}
.geshou div span:nth-child(2) {
  font-size: 12px;
  font-weight: 100;
}
.zhuanji {
  display: flex;
  align-items: center;
  margin-left: 30px;
  width: 270px;
  height: 80px;
  border: 1px solid red;
  border-radius: 10px;
}
.zhuanji img {
  width: 50px;
  height: 50px;
  margin: auto 6px;
  border-radius: 50%;
}
.zhuanji div {
  // margin-left: 10px;
  // display: inline-flex;
  display: flex;
  flex-direction: column;
}
.zhuanji div span:nth-child(2) {
  font-size: 12px;
  font-weight: 100;
}
.qiehuan {
  margin-top: 20px;
  margin-left: 30px;
  display: flex;
  // justify-content: space-between;
}
.qiehuan a {
  color: #000;
  font-size: 18px;
  font-weight: 300;
  text-decoration: none;
}
// .qiehuan a:nth-child(1){
//     margin-left: 30px;
// }
#qie {
  font-weight: 550;
  text-decoration: underline red;
}
.qiehuan a:nth-child(1) ~ a {
  margin-left: 30px;
  font-size: 18px;
}
.gun {
  // position: fixed;
  // width:80vw;
  margin-left: 30px;
  margin-top: 20px;
  // @height: 100vh-90px;
}
.el-scrollbar {
  // @height: 100vh-90px;
  max-height: 75vh;
}
.fenye {
  display: flex;
  // margin:auto auto;
  justify-content: space-around;
  // align-items: center;
  margin-top: 20px;
  justify-items: center;
}
.geshou {
  margin-right: 30px;
}
.isyin {
  display: none;
}
</style>

