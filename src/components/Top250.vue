<template>
<div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <router-link to="/in_theaters" tag="li" active-class="active">
                        <a href="javascript:;">正在热映</a>
                    </router-link>
                    <router-link to="/coming_soon?start=0&count=10" tag="li" active-class="active">
                        <a href="javascript:;">即将上映</a>
                    </router-link>
                    <router-link to="/top250" tag="li" active-class="active">
                        <a href="javascript:;">TOP250</a>
                    </router-link>
                </ul>
            </div>
            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" >
                <h2 class="page-header" v-text="movies.title"></h2>
                <div class="list-group">
                    <router-link :to="'/subject/'+item.id" v-for="(item,index) in movies.subjects" active-class="active">
                        <a class="list-group-item" href="javascript:;">
                            <span class="badge">{{ item.rating.average }}</span>
                            <div class="media">
                                <div class="media-left">
                                    <img class="media-object" :src=item.images.small >
                                </div>
                                <div class="media-body">
                                    <h3 class="media-heading">{{ item.title }}</h3>
                                    <p>导演：<span v-for="director in item.directors">{{ director.name }}</span></p>
                                    <p>类型：<span>{{ item.genres.join('、') }}</span></p>
                                </div>
                            </div>
                        </a>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
export default {
  name:"TOP250",
  data(){
    return {
      movies:{},
      loading:''
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      var _this=this;
      axios.get('/movie/top250').then(function(res){
        //console.log(res.data)
        _this.movies = res.data

      })
    }
  }
}
</script>
