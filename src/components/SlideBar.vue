<template>
    <div id="authorinfo">
        <div class="loading" v-if="isloading">
            <img src="../assets/loading.svg" alt="">
        </div>
        <div class="slide_bar" v-else>
            <div class="header panel">
                <p>作者</p>
                <div class="inner">
                    <router-link :to="{name:'user_info',params:{name:user.loginname}}">
                        <img :src="user.avatar_url" alt="">
                        <span class="user_name">  {{user.loginname}} </span>
                    </router-link>            
                    <div class="big"> 积分{{user.score}} </div>
                </div>
            </div>
            <div class="slide_topic panel">
                <p>作者其他话题</p>
                <div class="inner">
                    <ul>
                        <li v-for="topic in topiclimit5" :key="topic.id">
                            <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
                                <div class="title">{{topic.title}}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="slide_reply panel">
                <p>作者最近回复</p>
                <div class="inner">
                    <ul>
                        <li v-for="topic in replylimit5" :key="topic.id">
                            <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}" :title="topic.title">
                                <div class="title">{{topic.title}}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'SlideBar',
    data(){
        return {
            isloading:false,
            user:{}
        }
    },
    methods:{
       getUserInfo(){
          this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(res=>{
                this.isloading = false; //成功后不显示缓冲图片
                this.user = res.data.data
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
    computed:{//以下计算属性将回复和话题数控制在了5条以内
        topiclimit5(){
            let tl=[];
            if(this.user.recent_topics){ //保证话题数组存在，否则还没得到的时候数组是空会报错
                for(let i = 0;i < this.user.recent_topics.length ; i++){
                if(this.$route.params.id !== this.user.recent_topics[i].id){
                    tl.push( this.user.recent_topics[i])
                }
                if(tl.length >= 5){
                    break;
                }
                }
            }            
            return tl;
            //if(this.user.recent_topics.length > 5){
            //    return this.user.recent_topics.slice(0,4)
            //}else{
            //    return this.user.recent_topics
            //}
        },
        replylimit5(){
            if(this.user.recent_replies.length){
                return  this.user.recent_replies.slice(0,4)
            }
        }
    },
    beforeMount(){
        this.isloading = true ;//成功之前显示
        this.getUserInfo();      
    }
}
</script>
<style scoped>
li{
    list-style: none;
}
#authorinfo{
    width: 290px;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;
}
#authorinfo .slide_bar .panel{    
    display: block;    
    margin: 0;
    padding: 0;
    margin-bottom: 13px;
} 
#authorinfo .slide_bar .panel p{
    margin: 0;
    color: #51585c;
    border-radius: 3px 3px 0 0;
    padding: 10px;
    background-color: #f6f6f6;
}
#authorinfo .slide_bar .panel a{
    text-decoration: none;
    color: #778087;
}
#authorinfo .slide_bar .panel .inner{
    padding: 10px;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
}
#authorinfo .slide_bar .panel img{
    width: 48px;
    height: 48px;
    border-radius: 3px;
    max-width: 100%;
    vertical-align: middle;
    border: 0;
    margin-right: .5em;
}
#authorinfo .slide_bar .panel a .user_name{
    font-size: 16px;
    max-width: 120px;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
}
#authorinfo .slide_bar .panel .big{
    margin-top: 10px;
    width: 80%;
    font-size: 14px;
}
#authorinfo .slide_bar .panel ul{
    margin: 0 0 10px 25px;
    margin-left: 0;
    list-style: none;
    padding: 0;
}
#authorinfo .slide_bar .panel ul li{
    line-height: 2em;
}
#authorinfo .slide_bar .panel ul li .title{
    max-width: 270px;
    font-size: 14px;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    line-height: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
}


</style>