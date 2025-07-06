<template>
  <tr v-if="editing">
    <td><input v-model="editedNote.title" /></td>
    <td><input v-model="editedNote.description" /></td>
    <td><input v-model="editedNote.deadline" type="date" /></td>
    <td><input type="checkbox" v-model="editedNote.completed" /></td>
    <td>
      <button @click="save">Lưu</button>
      <button @click="cancel">Huỷ</button>
    </td>
  </tr>

  <tr v-else>
    <td :class="{ done: note.completed }">{{ note.title }}</td>
    <td>{{ note.description }}</td>
    <td>{{ note.deadline?.substring(0, 10) }}</td>
    <td>{{ note.completed ? 'Đã Hoàn Thành' : 'Chưa hoàn thành' }}</td>
    <td>
      <button @click="editing = true">Sửa</button>
      <button @click="remove">Xoá</button>
    </td>
  </tr>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import '../assets/noteItem.css'

const props = defineProps(['note'])
const emit = defineEmits(['refresh'])

const editing = ref(false)
const editedNote = ref({ ...props.note })

const save = async () => {
  await api.put(`/notes/${props.note._id}`, editedNote.value)
  editing.value = false
  emit('refresh')
}

const cancel = () => {
  editedNote.value = { ...props.note }
  editing.value = false
}

const remove = async () => {
  await api.delete(`/notes/${props.note._id}`)
  emit('refresh')
}
</script>

