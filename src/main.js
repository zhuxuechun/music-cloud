import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import axios from 'axios'
import './assets/iconfont.js'
import './assets/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { Tab,Tabs } from 'vant'


import { create, NCarousel, NRadioButton, NTable, NInput, NIcon, NDropdown, NSpace, NSwitch, NRadioGroup, NCollapse, NCollapseItem } from 'naive-ui'

const naive = create({
    components: [NCarousel, NRadioButton, NTable, NInput, NDropdown, NSpace, NIcon, NSwitch, NRadioGroup, NCollapse, NCollapseItem]
})

const app = createApp(App)

app.config.globalProperties.$host = axios

app.use(naive)

app.use(ElementPlus)
app.use(moment)

app.use(store).use(router).mount('#app')

