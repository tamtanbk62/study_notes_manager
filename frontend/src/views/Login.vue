<template>
  <div class="auth-container">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button class = "login-button" type="submit">Đăng nhập</button>
    </form>
    <p class="message" v-if="error">{{ error }}</p>
    <router-link to="/register">Đăng ký</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'
import '../assets/login.css'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await api.post('/login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    router.push('/notes')
  } catch (err) {
    error.value = 'Đăng nhập thất bại'
  }
}
</script>
