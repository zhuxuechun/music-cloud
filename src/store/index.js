import { createStore } from 'vuex'

export default createStore({
  state: {
    shuru: '',
    slist: '',
    songurl: '',
    song: '',
    user: '',
    lsong: [],
    dqge: '',
    geshouxin: '',
    likesong: '',
    isbo: false,
    isPlay: false,
    currentTime: 0,
    lishi: [],
    isgeshou: false,
    geimg: "",
    isfa: false,
    gedanxin: '',
    cgd: '',
    gedanlist: '',
    bomv: '',
    dqgeid: '',
    isdeng:false,
    tt:'',
    islishi:false,
    isd:false,
  },
  getters: {
  },
  mutations: {
    isd(state,can){
      state.isd=can
    },
    islishi(state,can){
      state.islishi=can
    },
    tt(state,can){
      state.tt=can
    },
    dqmv(state, can) {
      state.bomv = can
    },
    gdlist(state, can) {
      state.gedanlist = can
    },
    chuangge(state, can) {
      state.cgd = can
    },
    gedanye(state, can) {
      state.gedanxin = can
    },
    isfa(state) {
      state.isfa = !state.isfa
    },
    geshouimg(state, can) {
      state.geimg = can
    },
    bxgeshou(state) {
      state.isgeshou = false
    },
    geshou(state) {
      state.isgeshou = true
    },
    qinglishi(state) {
      state.lishi = []
    },
    lishi(state, can) {
      if (state.lishi.indexOf(can) === -1) {
        state.lishi.unshift(can)
        state.lishi = state.lishi.slice(0, 9)
      }
      else {
        return
      }

    },
    islogin(state,can){
      state.isdeng=can
    },
    currentTime(state, can) {
      state.currentTime = can
    },
    isPlay(state, can) {
      state.isPlay = can
    },
    likesong(state, can) {
      state.likesong = can
    },
    qingkong(state) {
      state.lsong = []
    },
    tuichu(state) {
      state.user = ""
    },
    geshouxin(state, can) {
      state.geshouxin = can
    },
    song(state, can) {
      state.song = can

    },
    dqge(state, can) {
      state.dqge = can
    },
    sousuo(state, can) {
      state.shuru = can
    },
    chuan(state, can) {
      state.songurl = can[0]
    },
    user(state, can) {
      state.user = can
    },
    slist(state, can) {
      state.slist = can
    },
    dqid(state, can) {
      state.dqgeid = can
    },
    isbo(state) {
      state.isbo = !state.isbo
    },
    zlove(state, can) {
      state.lsong = can
    }

  },
  actions: {
  },
  modules: {
  }
})
