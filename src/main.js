//导入vue中创建vue实例的方法
import { createApp } from 'vue'
//导入最大组件,以便加载其它组件内容
import App from './App.vue'
//导入自定义路由文件简写from './router'
import router from './router/index.js';
//全局导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8000";

//创建vue实例
const app=createApp(App);
for(const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}

//绑定路由对象
app.use(router);
app.use(ElementPlus);
app.mount('#app');