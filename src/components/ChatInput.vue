<template>
  <div class="chat-input-wrap">
    <div class="chat-input-inner">
      <q-input
        dense
        rounded
        filled
        v-model="message"
        placeholder="Escribe palabras clave como 'ver intranet'..."
        @keyup.enter="send"
      >
        <template #append>
          <q-btn color="primary" unelevated rounded icon="send" @click="send" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const emit = defineEmits(['send'])

function send() {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}
</script>

<style scoped>
.chat-input-wrap {
  padding: 0.75rem;
  background: linear-gradient(180deg, rgba(250, 250, 252, 0.6), rgba(245, 247, 250, 0.9));
}
.chat-input-inner {
  max-width: 1000px;
  margin: 0 auto;
}
.q-input__control {
  min-height: 44px;
}
</style>
