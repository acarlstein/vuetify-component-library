import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
/* webpackChunkName: "about" */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile.vue')
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import('../views/configuration/configuration.vue')
  },
  {
    path: '/configuration/palette',
    name: 'palette-configuration',
    component: () => import('../views/configuration/palette-configuration.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
