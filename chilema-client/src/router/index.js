import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/components/Msite'
import Discover from '@/components/Discover'
import Order from '@/components/Order'
import Profile from '@/components/Profile'
import Detail from '@/components/Detail'
import Login from '@/components/Login'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path : '/', redirect: 'msite'},
    {
      path: '/msite',
      name: 'Msite',
      component: Msite
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/detail/:sid',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
