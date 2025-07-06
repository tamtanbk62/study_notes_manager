import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Notes from '../views/Notes.vue'

const routes = [
  { path: '/notes', component: Notes },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})