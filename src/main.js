import Vue from 'vue'
import App from './App'
import 'mpvue-weui/src/style/weui.css';
Vue.config.productionTip = false
App.mpType = 'app'  //挂载整个小程序必须！

const app = new Vue(App)
app.$mount()//挂载整个小程序
