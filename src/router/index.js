import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "@/views/Home";
// import { component } from "vue/types/umd";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/poi',
    name: 'poieditor',
    component: () => import('@/views/poieditor')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
