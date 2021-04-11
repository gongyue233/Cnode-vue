import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';
import router from './router/index.js'


Vue.prototype.$http = Axios;
Vue.config.productionTip = false

new Vue({
  el:'#app',
  router:router,
  render(h){
    return h(App)
  }
})

Vue.filter('formatDate',function(str){
  if (!str)return'';
  var date = new Date(str);
  var time = new Date().getTime() - date.getTime();
  if(time<0){
    return '时间出错'
  }else if(time/1000 < 30){
    return '刚刚'
  }else if(time/1000 < 60){
    return parseInt(time/1000) + ' 秒前'
  }else if(time/60000 < 60){
    return parseInt(time/60000) + ' 分钟前'
  }else if(time/3600000 < 24){
    return parseInt(time/3600000) + ' 小时前'
  }else if(time/86400000 < 31){
    return parseInt(time/86400000) + ' 天前'
  }else if(time/2592000000 < 12){
    return parseInt(time/2592000000) + ' 月前'
  }else{
    return parseInt(time/31536000000) + ' 年前'
  }
});
//tabFormatter——处理帖子分类的过滤器
Vue.filter('tabFormatter',function(post){
  if(post.good===true){
    return '精华'
  }else if(post.top===true){
    return '置顶'
  }else if(post.tab === 'ask'){
    return '问答'
  }else if(post.tab === 'share'){
    return '分享'
  }else {
    return '招聘'
  }
})