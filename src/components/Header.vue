<template>
    <div class="header">
        <router-link :to="{name:'root'}">
            <img alt="" src="../assets/cnodejs_light.svg">
        </router-link>
        <ul>
            <li><router-link :to="{name:'root'}">首页</router-link></li>
            
            <li><router-link :to="{name:'novice'}">新手入门 </router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
         name:'Header'
    }
</script>
<style scoped>
.header{
    background: #333;
    height: 50px;
    margin-bottom: 0;
    width: 100%;    
    position: relative;
    background: #444;
    
}
img{
    height: 28px;
    margin-top: 10px;
    margin-left: 50px;
}
ul{
    list-style: none;
    float: right;
    height: 20px;
    margin-top: 6px;
}
li{   
    text-shadow: none;
    display:inline-block;   
    padding: 10px 15px; 
}
a{
    text-decoration: none;
    color: #ccc;
    font-size: 16px;
}
</style>