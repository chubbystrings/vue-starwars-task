import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
  },
  {
    path: '/dashboard/species',
    name: 'Species',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Species.vue')
  },
  {
    path: '/dashboard/people',
    name: 'People',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/People.vue'),
  },

  {
    path: '/dashboard/starships',
    name: 'Starships',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Starships.vue'),
  },

  {
    path: '/dashboard/:single/:id',
    component: () => import(/* webpackChunkName: "about" */ '../views/Single.vue'),
    name: 'Single'
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
