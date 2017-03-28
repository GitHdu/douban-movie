<template>
<div class="container-fluid subject">

    <h2 class="page-header" v-text="movies.title"></h2>
    <div class="list-group">
        <div class="media">
                                <div class="media-left">
                                    <img :src=movies.images.large >
                                </div>
                                <div class="media-body">
                                <div class="head">
 <h2 class="media-heading">导演：<em  v-for="(item, index) in movies.directors">{{item.name}}</em></h2> <h3>上映时间：{{movies.year}}</h3>
                                    <p class="type">类型：<strong>{{movies.genres.join('、')}}</strong></p>
                                </div>

                                    <div class="content">
                                          <p class="summary">{{movies.summary}}</p>

                                    </div>

                                </div>
                            </div>
    </div>
</div>

</template>
<script>
import axios from 'axios'
export default {
  name:"Subject",
  data(){
    return {
      movies:{}
    }
  },
  mounted(){
    this.getData(this.$route.params.id)
  },
  watch:{
      $route(to){
        //console.log(to);
        var reg=/subject\/\d+/;
        if(reg.test(to.path)){
          var Id=this.$route.params.id || 0;
          this.getData(Id);
        }
      }
    },
  methods:{
    getData(id){
      var _this=this;
      axios.get('/movie/subject/'+id).then(function(res){
        console.log(res.data)
        _this.movies = res.data

      })
    }
  }
}
</script>
<style scoped>
.subject{
  max-width:1200px;
}
.type{
  font-size:20px;
  margin: 10px 2px;
}
.head{
  padding: 12px;
}
.content{
  padding: 20px;
  font-size: 16px;
}
.summary{
    text-indent: 2em;
}
</style>
