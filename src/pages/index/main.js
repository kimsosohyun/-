import Vue from 'vue'
import Index from './index'
Vue.config.productionTip = false
const index = new Vue(Index)
index.$mount() //挂载当前页面
