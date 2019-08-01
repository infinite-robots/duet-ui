import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Onboarding from './pages/Onboarding.vue'
import Swiper from './pages/Swiper.vue'
import Chat from './pages/Chat.vue'
import { requireAuth } from './services/auth';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: Swiper,
      // beforeEnter: requireAuth
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      // beforeEnter: requireAuth
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
