import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/dashboard/species",
    name: "Species",
    component: () => import("../views/Species.vue"),
  },
  {
    path: "/dashboard/people",
    name: "People",
    component: () => import("../views/People.vue"),
  },

  {
    path: "/dashboard/starships",
    name: "Starships",
    component: () => import("../views/Starships.vue"),
  },

  {
    path: "/dashboard/:single/:id",
    component: () => import("../views/Single.vue"),
    name: "Single",
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
