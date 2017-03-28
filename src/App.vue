<template>
  <div id="app">
    <loading v-if=childMsg></loading>
    <NavHeader></NavHeader>
    <router-view class="router-view">
    </router-view>
  </div>
</template>

<script>
import NavHeader from './components/Nav.vue'
//import Coming from './components/Coming.vue'
import Theaters from './components/Theaters.vue'


export default {
  name: 'app',
  data(){
    return {
      //loading:''
    }
  },
  props: ['childMsg'],
/*  watch: {
    loading: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    $route(){
      this.loading=true;
      let that=this
      setTimeout(function() {
      that.loading = false
    }, 2000)
    }
  },
  mounted(){
    let _this = this
    // vue在定时器函数里this上下文指向不一样
    setTimeout(function() {
      _this.loading = false
    }, 3000)
  },*/
  components:{
      NavHeader,
      Theaters
    }
}
</script>

<style>

</style>
