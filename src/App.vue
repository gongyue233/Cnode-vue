<template>
  <div id="app">
    <Header></Header>
    <div id="main">
    <router-view name="slide"></router-view>
    <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import PosltList from './components/PosltList.vue';
export default {
    name:'App',
    components:{
      Header,PosltList
    }      
}
</script>

<style>
  body{
        background-color: #e1e1e1;
        margin: 0;
  }
  #main{    
    margin: 15px auto;
        width: 90%;
  }

</style>


