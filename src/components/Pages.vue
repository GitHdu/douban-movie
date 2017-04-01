<template>
  <ul class="pagination" v-if="show">
            <li v-show="current != 1" @click="current-- && goto(current)" ><a href="javascript:;">上一页</a></li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="javascript:;" >{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="javascript:;" >下一页</a></li>
</ul>
</template>
<script>
import axios from 'axios'
export default {
  name:"Page",
  data(){
    return {
      show:false,
      current:1,
      showItem:5,
      allpage:13
    }
  },
    computed:{
      pages:function(){
            var pag = [];
              if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                   //总页数和要显示的条数那个大就显示多少条
                   var i = Math.min(this.showItem,this.allpage);
                   while(i){
                       pag.unshift(i--);
                   }
               }else{ //当前页数大于显示页数了
                   var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                       i = this.showItem;
                   if( middle >  (this.allpage - this.showItem)  ){
                       middle = (this.allpage - this.showItem) + 1
                   }
                   while(i--){
                       pag.push( middle++ );
                   }
               }
             return pag
           }
  },
  mounted(){
    this.getData(0);
    let _this = this
    // vue在定时器函数里this上下文指向不一样
    setTimeout(function() {
      _this.show = true
    }, 2000)
  },
  methods:{
    goto:function(index){
      if(index == this.current) return;
        this.current = index;
        //这里可以发送ajax请求
        this.getData(this.current)
    },
    getData(id){
      var _this=this;
      axios.get('/movie/search?q='+this.$route.query.q+'&start='+id+'&count=10').then(function(res){
        //console.log(res.data)
         _this.$emit('movies',res.data)
        _this.allpage =res.data.total

      })
    }
  }

}
</script>
<style>
  body{
      font-family:"Segoe UI";
    }
    li{
      list-style:none;
    }
    a{
      text-decoration:none;
    }
    .pagination {
        position: relative;
        float: right;
      }
      .pagination li{
        display: inline-block;
        margin:0 5px;
      }
      .pagination li a{
        padding:.5rem 1rem;
        display:inline-block;
        border:1px solid #ddd;
        background:#fff;

        color:#0E90D2;
      }
      .pagination li a:hover{
        background:#eee;
      }
      .pagination li.active a{
        background:#0E90D2;
        color:#fff;
      }
  </style>
