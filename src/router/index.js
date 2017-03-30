import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Coming from '../components/Coming.vue'
import Theaters from '../components/Theaters.vue'
import TOP250 from '../components/TOP250.vue'
import Subject from '../components/Subject.vue'

Vue.use(Router)

export default new Router({
  routes: [
/*    {
      path: '/',
      name: 'App',
      component: App
    },*/
    {
      path: '/',
      name: 'Theaters',
      component: Theaters
    },
    {
      path: '/in_theaters',
      component: Theaters
    },
    {
      path: '/coming_soon*',
      name: 'Coming',
      component: Coming
    },
    {
      path: '/top250',
      name: 'TOP250',
      component: TOP250
    },
    {
    path:'/subject/:id',
    component:Subject,
    /*children:[
      {
        path:'/:id',
        component:Article
      }
    ]*/
  }
  ]
})
