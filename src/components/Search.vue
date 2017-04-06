<template>
<div class="container-fluid ">
    <h2 class="page-header" v-text="movies.title"></h2>
    <div class="list-group">
        <router-link :to="'/subject/'+item.id" v-for="(item,index) in movies.subjects" :key="item.id" active-class="active">
            <a class="list-group-item" href="javascript:;">
                <span class="badge">{{ item.rating.average }}</span>
                <div class="media">
                    <div class="media-left">
                        <img class="media-object" :src="item.images.small" >
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
<Page @movies="getMovies"></Page>
</div>

</template>
<script>
import axios from 'axios'
import Page from './Pages'
export default {
  name:"Search",
  data(){
    return {
      movies:{}
    }
  },
  components:{
    Page
  },
  methods:{
    getMovies(value){
      this.movies=value
    }
  },
  watch:{
      $route(to){
        var reg=/\/search\?q=\S+/;
        if(reg.test(to.fullPath)){
          location.reload()
        }
      }
  }

}
</script>
<style>

</style>
