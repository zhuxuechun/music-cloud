import { createRouter, createWebHistory } from 'vue-router'
import Index from '../components/index/index.vue'
import Like from '../components/like/like.vue'
import Bofang from '../components/bofang/bofang.vue'
import Sou from '../components/sousuo/sou.vue'
import Login from "../components/login/login.vue"
import Zhuce from "../components/zhuce/zhuce.vue"
import Geshou from "../components/geshou/geshou.vue"
import Gedan from "../components/gedan/gedan.vue"
import Mv from '../components/mv/mv.vue'
import Mvd from '../components/mv/mvd.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: Index },
    { path: '/like', component: Like },
    { path: '/bofang', component: Bofang },
    { path: '/login', component: Login, name: 'login' },
    { path: '/sou', name: 'sou', component: Sou },
    { path: '/zhuce', name: 'zhuce', component: Zhuce },
    { path: '/geshou', name: 'geshou', component: Geshou },
    { path: '/gedan', name: 'gedan', component: Gedan },
    { path: '/mv', name: 'mv', component: Mv },
    { path: '/mvd', name: 'mvd', component: Mvd },




    // {path:'/kuang',name:'kuang',component:Kuang}

  ]
})

export default router
