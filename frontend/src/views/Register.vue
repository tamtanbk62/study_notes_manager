<template>
  <div class="auth-container">
    <h2>Đăng ký</h2>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button class = "register-button" type="submit">Đăng ký</button>
    </form>
    <p class="message" v-if="message">{{ message }}</p>
    <router-link to="/login">Đăng nhập</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'
import "../assets/register.css"

const name = ref('')
const email = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

const register = async () => {
  try {
    await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    message.value = 'Đăng ký thành công!'
    setTimeout(() => router.push('/login'), 1000)
  } catch (err) {
    message.value = 'Đăng ký thất bại!'
  }
}
</script>
