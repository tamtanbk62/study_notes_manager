<template>
  <div class="container">
    <h2>Các ghi chú</h2>

    <!-- thêm ghi chú -->
    <form @submit.prevent="createNote" class="note-form">
      <input v-model="newNote.title" placeholder="Tiêu đề" required />
      <input v-model="newNote.description" placeholder="Mô tả" />
      <input v-model="newNote.deadline" type="date" />
      <label>
        <input type="checkbox" v-model="newNote.completed" />
        Đã hoàn thành
      </label>
      <button>Thêm</button>
    </form>

    <!--bảng các ghi chú-->
    <table v-if="notes.length" class="notes-table">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Mô tả</th>
          <th>Deadline</th>
          <th>Đã hoàn thành</th>
          <th>Tuỳ chỉnh</th>
        </tr>
      </thead>
      <tbody>
        <NoteItem
          v-for="note in notes"
          :key="note._id"
          :note="note"
          @refresh="getNotes"
        />
      </tbody>
    </table>

    <p v-else>Không có ghi chú nào</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import NoteItem from '../components/NoteItem.vue'
import '../assets/notes.css'

const notes = ref([])
const newNote = ref({ title: '', description: '', deadline: '', completed: false })

const getNotes = async () => {
  const res = await api.get('/notes')
  notes.value = res.data
}

const createNote = async () => {
  await api.post('/notes', newNote.value)
  newNote.value = { title: '', description: '', deadline: '', completed: false }
  getNotes()
}

onMounted(getNotes)
</script>

