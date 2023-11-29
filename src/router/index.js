import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import jobView from '../views/JobView.vue'
import CSearchView from '../views/CSearchView.vue'
import SignupView from '../views/SignupView.vue'

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
  },
  {
    path: '/Registro',
    name: 'Signup',
    component: SignupView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
