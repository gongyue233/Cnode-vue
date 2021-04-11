<template>
    <div id="pagination">
        <button class="pagebtn" @click="ChangeBtn">首页</button>
        <button class="pagebtn" @click="ChangeBtn">上一页</button>
        <button v-for="btn in pagebtn" :key="btn" 
        :class="[{current_page: btn === currentPage},'pagebtn']" 
        @click="ChangeBtn(btn)">
            {{btn}}
        </button>
        <button class="pagebtn" @click="ChangeBtn">下一页</button>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name:'Pagination',
    data(){
        return {
            pagebtn: JSON.parse(localStorage.getItem('page_btn')) || [1,2,3,4,5],
            currentPage:Number(localStorage.getItem('page_number'))  || 1,
        }
    },
    methods:{
        ChangeBtn(page){             
            if(typeof page !== 'number'){
                switch(page.target.innerText){
                    case "上一页":
                        $('button.current_page').prev().click();
                        break;
                    case "下一页":
                        $('button.current_page').next().click();
                        break;
                    case '首页':
                        this.pagebtn=[1,2,3,4,5];
                        this.ChangeBtn(1); 
                        //这里可能是为了能够首页的时候1能被选中，因为该函数对 currentPage进行了运算
                        break;
                    default:
                        break;
                }            

            }else{
                this.currentPage = page;               
                if(page === this.pagebtn[4]){
                    this.pagebtn.splice(0,1);
                    this.pagebtn.splice(4,0,this.pagebtn[3]+1)
                }
                if(page===this.pagebtn[0] && page !== 1){
                    //当点击第一个元素，先增加元素再减去元素
                    this.pagebtn.unshift(this.pagebtn[0]-1);
                    this.pagebtn.splice(5,1);
                }

            }
            window.localStorage.setItem('page_number',String(page));
            window.localStorage.setItem('page_btn',JSON.stringify(this.pagebtn));
            this.$emit('handli',this.currentPage);        
            
        }
    },
    beforeMount(){
        this.ChangeBtn(this.currentPage)
    }
}
</script>
<style scoped>
#pagination .pagebtn{
    display: inline-block;
	border:1px solid gray;
	outline:none;
    background-color: transparent;
    width: 60px;
    height: 30px;    
    border-radius: 6px;
    margin-left: 12px;
    text-align: center;
    vertical-align: text-bottom;
}
#pagination .current_page{
    border: 1px solid white;
    background-color: #444;
    color: #fff;
}

#pagination{
    font-size: 14px;   
    padding-bottom: 18px;
    background: #fff;
    text-align: center;
    margin-right: 12px;

}
</style>