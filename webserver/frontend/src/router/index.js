import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: "/",
    name: "home",
    component: () => import("../components/Home.vue")
  },
  {
    path: '/about',
    name: 'about',
    component: () => import("../components/About.vue")
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import("../components/Dashboard.vue")
  },
  ]
})
