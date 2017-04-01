<template>
 <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">DouBan Movie</a>
            </div>
		<form class="navbar-form navbar-right" v-on:submit.prevent >
	        <div class="form-group">
	          		<input type="text" class="form-control" placeholder="Search" v-model="searchContent">
	        </div>
	        <router-link :to="'/search?q='+searchContent" >
	        <button type="submit" class="btn btn-default">搜索</button>
	        </router-link>
      	</form>
        </div>
  </nav>

</template>
<script>
import axios from 'axios'
export default{
    name:'nav',
    data(){
    	return {
    		searchContent: ''
    	}
    },
    methods:{

  	}
  }
</script>
