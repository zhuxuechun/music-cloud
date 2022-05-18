<template>
  <div class="head">
    <div class="hsl">
      <div class="zuijin">
        我的喜欢&ensp;<span>共{{ $store.state.lsong.length }}首</span>
      </div>
      <div class="qingkong">
        <span><a href="#" @click="qingkong">清空列表</a></span>
      </div>
      <div class="bfquan">
        <span
          ><div class="iconfont icon-24gf-play"></div>
          &ensp;<a href="#">播放全部</a>&ensp;
          <div class="iconfont icon-jiahao"></div
        ></span>
      </div>
    </div>
  </div>
  <div class="neirong">
    <el-scrollbar width="100%" class="gundong">
      <n-table
        striped
        single-column="true"
        bordered="false"
        bottom-bordered="false"
        size="small"
        single-line="true"
      >
        <thead>
          <tr class="bianse">
            <th class="bian">&ensp;&ensp;&ensp;音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
          </tr>
        </thead>
        <tbody
          class="bianse"
          v-for="(item, index) in $store.state.lsong"
          :key="item.id"
        >
          <tr>
            <td
              height="30px"
              class="gequxinxi"
              @mouseenter="bianse(index)"
              :class="bian === index ? 'bianse' : ''"
              @mouseout="likai"
            >
              <span>{{ index < 9 ? "0" + (index + 1) : index + 1 }}</span
              >&ensp;
              <div @click="fang(item)"><a href="#">{{ item.name }}</a> </div>
              &ensp;
              <span :class="item.mv == 0 ? 'isyin' : ''">
                <svg class="icon" aria-hidden="true" @click="mvv(item.mv)">
                  <use xlink:href="#icon-MV"></use>
                </svg> </span
              >&nbsp;
              <span :class="item.fee == 8 ? 'isyin' : ''">
                <svg class="icon" aria-hidden="true" @click="mvv(x.mvid)">
                  <use xlink:href="#icon-vip"></use>
                </svg>
              </span>
              &ensp;
              <svg class="icon" aria-hidden="true" @click="zan(item)">
                <use
                  :xlink:href="
                    item.url !== 'hello' ? '#icon-aixin' : '#icon-56aixin'
                  "
                ></use>
              </svg>
            </td>
            <td
              @mouseenter="bianse(index)"
              :class="bian === index ? 'bianse' : ''"
            >
              {{ item.ar[0].name }}
            </td>
            <td
              @mouseenter="bianse(index)"
              :class="bian === index ? 'bianse' : ''"
            >
              {{ item.ar[0].name }}
            </td>
          </tr>
        </tbody>
      </n-table>
    </el-scrollbar>
    <div id="zhanwei"></div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import moment from "moment";
import { ElMessage } from "element-plus";

export default {
  name: "like",
  data() {
    return {
      bian: "",
      gecount: 10,
      songlist: [],
      isai: false,
      ai: "",
      sslist: "",
    };
  },
  methods: {
    mvv(can) {
      if (can !== 0) {
        this.$store.commit("dqmv", { id: can });
        this.$router.push("mvd");
      }
      console.log(can);
    },
    async zan(can) {
      if (this.$store.state.user === "") {
        ElMessageBox.alert("你没登录,点什么赞,我数据往哪儿加???", "未登录!", {
          confirmButtonText: "请先登录",
        });
        return;
      }
    },
    async fang(can) {
      console.log(can);

      this.$store.commit("isPlay", true);
      let {
        data: { data: res },
      } = await this.$host.get("Api/song/url?id=" + can.id);

      let {
        data: { songs },
      } = await this.$host.get("Api/song/detail?ids=" + can.id);
      this.$store.commit("dqge", songs[0]);
      this.$store.commit("chuan", res);
    },
    qingkong() {
      this.songlist = [];
      this.$store.state.lsong = "";
    },
    bianse(can) {
      this.bian = can;
      // console.log(can);
    },
    likai() {
      this.bian = "";
    },
    async aixin(can) {
      let res = await this.$host.post("Api/like?id=" + can.data.id);
      //  console.log(JSON.parse(res));
      if (can.data.a === 200) {
        let res = await this.$host.post(
          "Api/like?id=" + can.data.id + "&like=false"
        );
        // console.log(res);
        if (res.data.code === 200) {
          ElMessage({ message: "取消喜欢成功", type: "success" });
          this.songlist.forEach((x) => {
            if (x === can) {
              x.data.a = "";
            } else {
            }
          });
        } else if (res.status.code !== 200) {
          ElMessage({ message: "取消喜欢失败", type: "error" });
        }
      } else {
        // let res=await this.$host.post("Api/like?id="+can.data.id)
        // console.log(res);

        if (res.data.code === 200) {
          ElMessage({ message: "喜欢成功", type: "success" });
          this.songlist.forEach((x) => {
            if (x === can) {
              x.data.a = res.data.code;
            } else {
            }
          });
        } else if (Response.code === 405) {
          ElMessage({ message: "喜欢失败", type: "error" });
        }
      }
      // console.log(this.songlist);
    },
  },
  async created() {
    this.sslist = this.$store.state.lsong;
    if (this.$store.state.user === "") {
      return;
    }

    this.$store.state.lsong.forEach((x) => {
      x.playTime = dayjs(x.playTime).format("YYYY-MM-DD HH:mm:ss"); // 2011-10-17 00:17:56
    });
    // this.songlist = list;
    // console.log(list);
  },
  props: {},
};
</script>

<style lang="less" scoped>
.head {
  width: 80vw;
}
.hsl > div {
  width: 35vw;
}
.hsl {
  width: 75vw;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 30px;
  justify-content: space-between;
  // border:1px solid red;
  align-content: center;
}
.zuijin {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 550;
}
.zuijin span {
  // align-self: center;
  color: rgb(136, 133, 129);
  font-size: 16px;
  font-weight: 170;
}
.qingkong {
  display: flex;
  flex-direction: row-reverse;
  align-self: center;
  color: rgb(80, 165, 217);
  // justify-items:reserve;
  // border:1px solid red;
}
.qingkong span a {
  // align-se;
  text-decoration: none;
  color: rgb(80, 165, 217);
}
.bfquan {
  align-self: flex-start;
  width: 80px;
  height: 50px;
  display: flex;
  text-align: center;
  line-height: 50px;
  // border:1px solid red;
  align-items: end;
}
.bfquan span {
  background-color: red;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  flex-direction: row;
  // flex-direction: row-reverse;
  width: 140px;
  height: 38px;
  text-align: center;
  line-height: 38px;
  // border:1px solid red;
}
.bfquan span a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
.bfquan span div:nth-child(1) {
  color: rgb(255, 255, 255);
}
// .bianse:hover {
//   background-color: aqua;
// }
// .bian:hover {
//   background-color: aqua;
// }
.bianse {
  background-color: rgb(204, 211, 211);
}
.gequxinxi span:nth-child(2) {
  font-size: 22px;
}
.gequxinxi {
  display: flex;
  align-items: center;
}
.neirong {
  width: 75vw;
  bottom: 20vh;
  margin: 0 auto;
  margin-top: 30px;
  // margin-bottom: 130px;
  // margin-bottom: 20vh;
  height: 50vh;
}

#zhanwei {
  width: 100%;
  height: 90px;
}
.dianzan:active {
  color: aqua;
}
.gequxinxi span:nth-child(3) {
  font-size: 20px;
}
.aixin:visited {
  background-color: aqua;
}
.gequxinxi span:nth-child(4) {
  font-size: 18px;
}
.isyin {
  display: none;
}
</style>>
