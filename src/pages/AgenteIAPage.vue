<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />

    <q-page-container>
      <q-page class="q-pt-sm q-px-lg">
        <ChatBubble :isUser="false">
          <div class="text-h6">AGENTE IA</div>
          <div class="text-grey text-caption">
            Asistente general — diferente del Chatbot Onboarding
          </div>
          <br />
          Hola, soy tu Agente IA general. Puedo ayudarte con dudas operativas, políticas internas, y
          procedimientos.
        </ChatBubble>

        <SuggestedQuestions :class="'q-mt-md'" />

        <div v-for="(msg, i) in messages" :key="i">
          <ChatBubble :isUser="msg.user">{{ msg.text }}</ChatBubble>
        </div>
      </q-page>

      <ChatInput @send="addUserMessage" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/NavBar.vue'
import ChatBubble from 'src/components/ChatBubble.vue'
import SuggestedQuestions from 'src/components/SuggestedQuestions.vue'
import ChatInput from 'src/components/ChatInput.vue'
import { ref } from 'vue'

const messages = ref([])

function addUserMessage(text) {
  messages.value.push({ text, user: true })

  // respuesta simple del Agente IA
  if (text.toLowerCase().includes('horario')) {
    messages.value.push({
      text: 'El horario estándar es de 9:00 a 18:00 con una hora de almuerzo.',
      user: false,
    })
  } else {
    messages.value.push({
      text: 'Recibido. Estoy procesando tu consulta y te respondo en breve.',
      user: false,
    })
  }
}
</script>
