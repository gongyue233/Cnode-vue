<template>
<div>
        <div class="loading" v-if="isloading">
            <img src="../assets/loading.svg" alt="">
        </div>
        <div id="user_info" v-else>
        
        <div class="user_head">
                <ul class="head">
                    <router-link :to="{name:'root'}" class="one-poslt"> 
                    <li>主页/</li>
                    </router-link>
                </ul>
                <div class="user">
                    <img :src="user_info.avatar_url" alt="">
                    <span>{{user_info.loginname}} </span>
                    <p class="big">{{user_info.score}}积分 </p>
                    <p class="sigh_time">注册时间 {{user_info.create_at | formatDate}}  </p>
                </div>
        </div>
        <div class="user_topics">
            <div class="header">最近创建的话题</div>
            <ul class="panel">
                <li v-for="topic in user_info.recent_topics" :key="topic.id" class="cell">
                    <router-link :to="{name:'user_info',params:{
                        name:topic.author.loginname
                    }}">
                    <img :src="topic.author.avatar_url" alt="">
                    </router-link>
                    <router-link :to="{name:'post_content',params:{
                        id:topic.id,name:topic.author.loginname
                    }}" class="topic_title" :title="topic.title">
                       <span> {{topic.title}} </span>
                    </router-link>
                    <span class="last_reply">{{topic.last_reply_at | formatDate}}</span>
                </li>
            </ul>
        </div>

        <div class="user_replies">
           <div class="header">最近参与的话题</div> 
           <ul class="panel">
               <li v-for="item in user_info.recent_replies" :key="item.id" class="cell">
                     <router-link :to="{name:'user_info',params:{
                        name:item.author.loginname
                    }}" >
                    <img :src="item.author.avatar_url" alt="">
                    </router-link>
                   <router-link :to="{name:'post_content',params:{id:item.id,name:item.author.loginname}}">
                      <span> {{item.title}}</span>
                   </router-link>
                   <span class="last_reply">{{item.last_reply_at | formatDate}}</span>
               </li> 
           </ul>
        </div>
        </div>
</div>
</template>

<script>
export default {
    name:'UserInfo',
    data(){
        return {
            isloading:false,
            user_info:{}
        }
    },
    methods:{
       getUserInfo(){
          this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(res=>{
                this.isloading = false; //成功后不显示缓冲图片
                this.user_info = res.data.data
            })
            .catch(function(err){
                //处理返回失败的问题
                console.log(err)
            }) 
       }
    },
    watch:{
      '$route':function(to,from){
            this.getUserInfo();   
      }  
    },
    beforeMount(){
        this.isloading = true ;//成功之前显示
        this.getUserInfo();      
    }
}
</script>

<style scoped>
ul,li{
    list-style: none;
}
#user_info{
    margin: 0 5px;
    margin-bottom: 13px;
    margin-right: 305px;
}
#user_info .user_head{
    margin-bottom: 13px;
    display: block;
}
#user_info .user_head img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 3px;    
    vertical-align: middle;
}
#user_info .user_head .head a{
    text-decoration: none;
    color: #80bd01;
}
#user_info .user_head .head{
    padding: 10px;
    margin: 0;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;    
    line-height: 20px;
}
#user_info .user_head .user{
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    padding: 10px;
    color: #778087;
}
#user_info .user_head .user .big{
    font-size: 14px;
    color: #333;
    padding-left: 40px;
}
#user_info .user_head .user .sign_time{
    color: #ababab;
    word-break: break-word;
    margin: 0 0 10px;
}


#user_info .user_topics .header{
    line-height: 20px;
    background-color: #f6f6f6;
    padding: 10px; 
    font-size: 14px;
}
#user_info .panel{
    display: block;
    
    margin: 0;
    padding: 0;
    margin-bottom: 13px;
    background-color: #fff;
}
#user_info .panel .cell{
    display: block;
    position: relative;
    padding: 10px 10px 10px 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;  
    font-size: 14px;
    line-height: 30px;
}

#user_info .panel .cell img{  
    width: 30px;
    height: 30px;
    border-radius: 3px;
    vertical-align: middle;
    max-width: 100%;    
    padding: 0;
}
#user_info .panel .cell a span{   
    display: inline-block;
    color: #333;
    vertical-align:middle;
    max-width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    font-size: 16px;
    margin: 0;
    padding-left: 50px;
}
#user_info .panel .cell .last_reply{
    float:right;
    text-align: right;
    white-space: nowrap;
    color: #778087;
    font-size: 11px;  
}
#user_info .user_replies .header{
    line-height: 20px;
    background-color: #f6f6f6;
    padding: 10px; 
    font-size: 14px;
}
</style>