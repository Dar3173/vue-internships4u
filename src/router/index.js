import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import jobView from '../views/JobView.vue'
import CSearchView from '../views/CSearchView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/job/:id',
    name: 'jobView',
    component: jobView,
    props: true,
  },
  {
    path: '/CSearch',
    name: 'CSearch',
    component: CSearchView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
