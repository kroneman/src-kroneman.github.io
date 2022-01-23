import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import GoogleDrivePoc from '../views/GoogleDrivePoc.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/google-drive-poc',
    name: 'GoogleDrivePocPage',
    component: GoogleDrivePoc,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '*',
    redirect: () => '/',
  },
];

const router = new VueRouter({
  // mode: 'history',
  saveScrollPosition: true,
  base: process.env.BASE_URL,
  routes,
});

export default router;
