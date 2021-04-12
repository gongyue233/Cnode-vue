<template>
    <div id="poslt">
        <!--加载时出现的图片 -->
        <div class="loading" v-if="isloading">
            <img src="../assets/loading.svg" alt="">
        </div>
        <!--下面是主题列表需要使用cnode的API-->
        <div class="topic_list" v-else>
            <ul>
                <li class="tab_list">  
                    <router-link :to="{name:'root'}">                  
                        <span :class="[{currentab:current_tab===''},'tab']" @click="Changetab('')">
                            全部
                        </span>
                    </router-link>
                    <router-link :to="{name:'root_tab',params:{tab:'good'}}">
                        <span :class="[{currentab:current_tab==='good'},'tab']" @click="Changetab('good')">
                            精华
                        </span>
                    </router-link>
                    <router-link :to="{name:'root_tab',params:{tab:'share'}}">
                        <span :class="[{currentab:current_tab==='share'},'tab']" @click="Changetab('share')">
                            分享
                        </span>
                    </router-link>
                    <router-link :to="{name:'root_tab',params:{tab:'ask'}}">
                        <span :class="[{currentab:current_tab==='ask'},'tab']" @click="Changetab('ask')">
                            问答
                        </span>
                    </router-link>
                    <router-link :to="{name:'root_tab',params:{tab:'job'}}">
                        <span :class="[{currentab:current_tab==='job'},'tab']" @click="Changetab('job')">
                            招聘
                        </span>
                    </router-link>

                </li>
                <li v-for="post in posts" :key="post.id" class="cell">
                    <!--头像-->
                    <img :src="post.author.avatar_url">
                    <!--回复 和 浏览-->
                    <span class="reply_all">
                        <span class="reply_count">{{post.reply_count}}</span>/{{post.visit_count}}                        
                    </span>
                    <!--帖子分类-->
                    <span class="topic_title_wrapper">
                    <span :class="[{put_good:(post.good === true)},{put_top:(post.top===true)},
                            {topiclist_tab:(post.good !== true && post.top !== true)}]">{{post | tabFormatter}}</span>
                    </span>
                    
                    <!--标题-->
                    <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}">
                    <span class="topic_title">{{post.title}}</span>
                    </router-link>
                    <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
                </li>
            </ul>
        </div>
        <pagination @handli='renli'></pagination>
    </div>
</template>

<script>
import Pagination from './Pagination.vue';
export default {
    name:'PosltList',
    data(){
        return {
            isloading:false,
            posts:[],
            postpage:1,
            current_tab:window.localStorage.getItem('tab') || '',           
        }
    },
    watch:{
        '$route':function(to,from){
            this.getData();
        }
    },
    components:{
        Pagination
    },
    methods:{
        getData(){
            const self = this;
            self.$http.get('https://cnodejs.org/api/v1/topics',{
                params:{
                    page:this.postpage,
                    limit: 30,
                    tab:this.$route.params.tab
                }
            })
            .then(res=>{
                self.isloading = false; //成功后不显示缓冲图片
                this.posts = res.data.data
            })
            .catch(function(err){
                //处理返回失败的问题
                console.log(err)
            })
        },
        renli(value){
            this.postpage=value;
            this.getData();
        },
        Changetab(string){
            this.current_tab=string;
            window.localStorage.setItem('tab',this.current_tab);
        }
        
    },
    beforeMount(){
        this.isloading = true ;//成功之前显示    
    },    
}
</script>

<style scoped>
a{
    color: #80bd01;
    text-decoration: none;
}
img{
    width: 30px;
    height: 30px;
    border-radius: 3px;
    vertical-align: middle;
    max-width: 100%;    
}
ul{
    list-style: none;
}

#poslt{
    background-color: #fff;
    margin: 0 5px;
    margin-bottom: 13px;
    margin-right: 305px;
}
ul > .cell > .reply_all{
    width: 70px;
    display: inline-block;
    text-align: center;
} 
ul > .cell > .reply_all .reply_count{
    color: #9e78c0;
}

ul > li > span{
    font-size: 14px;    
}
#poslt > .topic_list > ul > .tab_list > a {
    margin: 0 10px;
    color: #80bd01;
}
ul > .cell{
    position: relative;
    line-height: 2em;
    width: 810px;
    padding: 10px;
}
#poslt > .topic_list{
    margin: 0;
    background: #fff;
    position: relative;
    font-size: 14px;
}
#poslt > .topic_list > ul > .cell .last_reply{
    float: right;
    text-align: right;
    min-width: 50px;
    white-space: nowrap;
    color: #778087;
    font-size: 11px;    
}
#poslt > .topic_list > ul > .cell .topic_title{
    color: #333;
    vertical-align:middle;
    position: absolute;
    display: inline-block;
    max-width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    font-size: 16px;
    padding-left: 50px;
    margin: 0;
}
.put_good,.put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px
}
.topiclist_tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px
}
#poslt > .topic_list > ul > .cell .topic_title_wrapper {
    position: absolute;
    padding: 2px 4px;
}

#poslt > .topic_list > ul .tab_list{
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0
}

#poslt > .topic_list > ul .tab_list .currentab{
    color: white;
    padding: 2px 4px;
    background: #80bd01;
    border-radius: 3px;
}


#poslt > .topic_list > ul{
    padding: 0;
}



</style>