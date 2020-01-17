import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '../views/home.vue'
import paletteView from '../views/configuration/palette.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/configuration/palette',
    name: 'configuration-palette',
    component: paletteView
  }
]

const router = new VueRouter({
  routes
})

export default router
