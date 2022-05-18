<template>
  <div class="toubu">
    <el-scrollbar max-height="75vh">
      <div class="tou">
<<<<<<< HEAD
        <img :src="this.$store.state.gedanxin.coverImgUrl" alt="" />
        <div class="tr">
          <div class="jian">
            <div>{{ this.$store.state.gedanxin.name }}</div>
          </div>
          <div class="hong">
            <div>播放全部</div>
            <div>分享({{ this.$store.state.gedanxin.shareCount }})</div>
            <!-- <div>收藏({{this.$store.state.gedanxin.playCount}})</div> -->
=======
        <img :src="$store.state.gedanxin.coverImgUrl" alt="" />
        <div class="tr">
          <div class="jian">
            <div>{{ $store.state.gedanxin.name }}</div>
          </div>
          <div class="zuo">
            <img
              :src="$store.state.gedanxin.creator.avatarUrl + '?param=50y50'"
              alt=""
            />
            &ensp;<span>{{ $store.state.gedanxin.createTime }}</span>
          </div>
          <div class="hong">
            <div class="iconfont icon-bofang">&nbsp;播放全部</div>
            <div class="iconfont icon-dianzan">
              点赞({{ this.$store.state.gedanxin.subscribedCount }})
            </div>
>>>>>>> e436518 (second)
          </div>
          <div class="biao">
            <div class="tags">
              标签:&nbsp;
              <div v-for="(item, i) in $store.state.gedanxin.tags" :key="item">
<<<<<<< HEAD
                {{i===$store.state.gedanxin.tags.length-1?item &nbsp;:item &nbsp;+'/'}}
=======
                {{i===$store.state.gedanxin.tags.length-1?item &nbsp; :item &nbsp;+'/'}}
>>>>>>> e436518 (second)
              </div>
            </div>
            <div class="shuju">
              <div>
                歌曲:&ensp;{{
                  this.$store.state.gedanxin.trackCount
                }}&nbsp;&nbsp;&nbsp;播放:&nbsp;{{
<<<<<<< HEAD
                  this.$store.state.gedanxin.playCount
=======
                  (typeof $store.state.gedanxin.playCount === string)  ||
                  $store.state.gedanxin.playCount < 10000
                    ? $store.state.gedanxin.playCount
                    : Math.round($store.state.gedanxin.playCount / 10000) + "万"
>>>>>>> e436518 (second)
                }}
              </div>
            </div>
            <div class="jianjie">
              {{ this.$store.state.gedanxin.description }}
            </div>
          </div>
<<<<<<< HEAD
          <!-- <div class="jianjie">{{this.$store.state.gedanxin.description}}</div> -->
=======
>>>>>>> e436518 (second)
        </div>
      </div>
      <div class="wen">
        <div>歌曲列表</div>
        <div>评论({{ this.$store.state.gedanxin.commentCount }})</div>
        <div>收藏者</div>
      </div>
<<<<<<< HEAD
      <div class="biaoge">
=======
      <div class="biaoge" v-loading="load">
>>>>>>> e436518 (second)
        <n-table
          striped
          size="small"
          bordered="false"
          single-column="true"
          single-line="true"
        >
          <thead>
            <tr>
              <th>&emsp;音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>不知道</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(x, i) in $store.state.gedanlist"
              :key="x.id"
              @mouseenter="bianse(x.id)"
              :class="dq == x.id ? 'ttr' : ''"
            >
              <td>
                &emsp;<span v-if="$store.state.dqge.id !== x.id">{{
                  i < 9 ? "0" + (i + 1) : i + 1
                }}</span>
                <span v-else>
                  <svg class="icon" aria-hidden="true" @click="mvv(x)">
                    <use xlink:href="#icon-laba1"></use>
                  </svg>
                </span>
                &ensp;<span @click="chuan(x)"
                  ><a href="#">{{ x.name }}</a>
                </span>
                <span>
                  <svg class="icon" aria-hidden="true" @click="zan(x)">
                    <use
                      :xlink:href="
<<<<<<< HEAD
                        $store.state.tt.indexOf(x) !== -1
=======
                        tt.indexOf(x.id) !== -1
>>>>>>> e436518 (second)
                          ? '#icon-aixin'
                          : '#icon-56aixin'
                      "
                    ></use>
                  </svg> </span
                >&nbsp;
                <span :class="x.mv == 0 ? 'isyin' : ''">
                  <svg class="icon" aria-hidden="true" @click="mvv(x)">
                    <use xlink:href="#icon-MV"></use>
                  </svg> </span
                >&nbsp;
                <span :class="x.fee == 1 ? '' : 'isyin'">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-vip"></use>
                  </svg>
                </span>
              </td>
              <td>{{ x.ar[0].name }}</td>
              <td>{{ x.al.name }}</td>
              <td>...</td>
            </tr>
          </tbody>
        </n-table>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @prev-click="shangye"
        @next-click="xiaye"
      />
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dq: "",
<<<<<<< HEAD
=======
      tt: "",
      load: true,
>>>>>>> e436518 (second)
    };
  },
  methods: {
    mvv(can) {
      if (can.mv !== 0) {
        this.$router.push("mvd");
        this.$store.commit("dqmv", { id: can.mv });
      }
    },
    bianse(x) {
      this.dq = x;
    },
    async chuan(can) {
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
  },
  async created() {
    let tt = [];
<<<<<<< HEAD
    for (let i = 0; i < this.$store.state.lsong.length; i++) {
      this.$store.state.gedanlist.map((x) => {
        if (x.id === this.$store.state.lsong[i].id) {
          tt.push(x);
        }
      });
    }

    this.$store.commit("tt", tt);
=======
    tt = this.$store.state.lsong.map((x) => {
      return x.id;
    });
    this.tt = tt;
    // while(this.$store.state.gedanlist){
    //
    // }
    // console.log(this.$store.state.gedanxin);
  },
  mounted() {
    this.load = false;
>>>>>>> e436518 (second)
  },
};
</script>

<style lang="less" scoped>
.tou {
  // border: 1px solid red;
  margin: 10px 20px;
  display: flex;
  // justify-content: space-evenly;
}
.tou img {
  // flex: 1;
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.tr {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  //   border: 1px solid red;
}
.biao .tags {
  display: flex;
  flex-direction: row;
}
.tags div {
<<<<<<< HEAD
  color: rgb(34, 34, 211);
=======
  color: rgb(15, 44, 158);
>>>>>>> e436518 (second)
}
.biao {
  font-size: 13px;
  font-weight: 200;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.shuju {
  margin: 10px 0;
}
.hong {
  display: flex;
  flex-direction: row;
}
.hong div {
  width: 120px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid rgb(72, 72, 72);
}
.hong div:nth-child(2) {
  margin: 0 20px;
}
.hong div:nth-child(1) {
  background-color: red;
  border: 1px solid rgb(255, 255, 255);
}
.jianjie {
  max-width: 65vw;
  width: 100%;
  // height:30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
<<<<<<< HEAD
.tags div:nth-child(1) ~ div {
}
=======

>>>>>>> e436518 (second)
.jian {
  font-size: 19px;
  font-weight: 600;
}
.biaoge {
<<<<<<< HEAD
=======
  // position: relative;
>>>>>>> e436518 (second)
  width: 100% !important;
  // margin:10px 20px;
}
.biaoge td {
  font-size: 15px;
  color: rgb(99, 100, 101);
  white-space: nowrap;
  overflow: hidden;
  // width:100%;
}
.ttr td {
  background-color: rgb(190, 190, 193) !important;
}
.wen {
  display: flex;
  margin: 20px 20px;
  font-size: 19px;
}
.wen div:nth-child(2) {
  margin: 0 20px;
}
.isyin {
  display: none;
}
<<<<<<< HEAD
=======
.zuo {
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}
.zuo > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.zuo > span {
  font-size: 13.5px;
  color: rgb(120, 121, 122);
}
>>>>>>> e436518 (second)
</style>

