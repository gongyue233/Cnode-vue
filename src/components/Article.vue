<template>
<div>
        <!--加载时出现的图片 -->
        <div class="loading" v-if="isloading">
            <img src="../assets/loading.svg" alt="">
        </div>
        <div id="article" v-else>        
        <div class="topic_hcon panel">
            <div class="topic_header">
                <div class="topic_title">{{post.title}}</div>
                <ul class="changes">
                    <li> 发布于 {{post.create_at | formatDate}} </li>
                    <li> 作者 {{post.author.loginname}} </li>
                    <li> {{post.visit_count}} 次浏览 </li>
                    <li> 来自 {{post | tabFormatter}} </li>
                </ul>
                <hr style="height:1px;border: none;border-top:1px solid #ddd;margin:15px 0;"/>
            </div>
            <div v-html="post.content" class="topic-content"></div>
        </div>
        <!--回复-->
        <div class="topic_reply panel">
            <div class="header">{{post.reply_count}} 回复</div>
            <div class="reply_list">
                <div v-for="(reply,index) in post.replies" :key="reply.id">
                    <div class="reply cell">
                        <router-link :to="{name:'user_info',params:{
                            name:reply.author.loginname
                        }}">
                        <img :src="reply.author.avatar_url" alt="">
                         <span class="reply_name">{{reply.author.loginname}} </span>
                        </router-link>                       
                        <span class="reply_index"> {{index+1}}楼•{{reply.create_at | formatDate}}</span>
                        <span v-if="reply.ups.length > 0" class="reply_ups"> {{reply.ups.length}} </span>
                        
                        <div class="reply-content"><p v-html="reply.content" ></p> </div>                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'Article',
    data(){
        return{
            isloading:false,
            post:{},
        }
    },
    methods:{
        getArticleData(){
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
            .then(res=>{
                if(res.data.success===true){
                this.isloading = false; //成功后不显示缓冲图片
                this.post = res.data.data;
                }
            })
            .catch(function(err){
                //处理返回失败的问题
                console.log(err)
            })
        }
    },
    watch:{
        '$route':function(to,from){
            this.getArticleData();   
        }
    },
    beforeMount(){
        this.isloading = true ;//成功之前显示
        this.getArticleData();        
    }
}
</script>

<style>
@import url('../assets/markdown2.css');
div{
    display: block;
}
#article .panel{    
    margin-bottom: 13px;
    background-color: #fff;
    padding: 10px;
}

#article{
    margin: 0 5px;
    margin-bottom: 13px;
    margin-right: 305px;
}
#article > .topic_hcon > .topic_header{
    border-radius: 3px 3px 0 0;
}
#article > .topic_hcon > .topic_header .topic_title{
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%
}
li{
    list-style: none;
}
#article > .topic_hcon > .topic_header .changes{
    overflow: hidden;
    font-size: 12px;
    color: #838383;
    padding: 0;
}
#article > .topic_hcon > .topic_header ul li::before{
    content: "•"; 
}
#article > .topic_hcon > .topic_header ul li{
    margin: 0;
    float: left;

}
#article .topic_reply .header{
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 3px 3px 0 0;
}
#article .topic_reply .reply_list .cell{    
    padding: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;  
    overflow: hidden;
    font-size: 14px;
    display: inline-block;

}
#article .topic_reply .reply_list > div .reply > a > span{
    margin-left: 10px;
}
#article .topic_reply .reply_list > div .reply > a{    
    color: #666;
    text-decoration: none;    
    text-overflow: ellipsis;
    font-size: 12px;  
    display: inline-block;
}
#article .topic_reply .reply_list > div .reply > a > img{
    width: 30px;
    height: 30px;    
    border-radius: 3px;
    vertical-align: middle;
}
#article .topic_reply .reply_list > div .reply .reply_index{
        font-size: 11px;
}
#article .topic_reply .reply_list > div .reply .reply-content{
    padding-left: 50px;
    color: #333;
    
}
</style>