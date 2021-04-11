import Vue from 'vue';
import router from 'vue-router';
import Article from '@/components/Article.vue';
import SlideBar from '../components/SlideBar.vue';
import PosltList from '../components/PosltList.vue';
import UserInfo from '../components/UserInfo.vue';
import Novice from '../components/Novice.vue';
Vue.use(router)
export default new router({
    routes:[
        {
            name:'root',
            path:'/',
            components:{
                main:PosltList
            }
        },
        {
            name:'post_content',
            path:'/topic/:id&author=:name',
            components:{
                main:Article,
                slide:SlideBar                
            }
        },
        {
            name:'user_info',
            path:'/user_info/:name',
            components:{
                main:UserInfo
            }
        },
        {
            name:'novice',
            path:'/novice',
            components:{
                main:Novice
            }
        }
    ]
})