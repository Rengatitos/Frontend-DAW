<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />

    <q-page-container>
      <q-page class="q-pt-sm q-px-lg">
        <!-- Si el panel Próximos Pasos está abierto, mostramos SOLO ese panel -->
        <template v-if="ui.showNextSteps">
          <NextStepsPanel />
        </template>

        <!-- Si no, mostramos el chat normal -->
        <template v-else>
          <!-- Mensaje del bot inicial -->
          <ChatBubble :isUser="false">
            <div class="text-h6">AGENTE IA DE ONBOARDING</div>
            <div class="text-grey text-caption">Siempre disponible para ayudarte</div>
            <br />
            ¡Hola! Soy tu Agente IA de Onboarding de TCS. Estoy aquí para ayudarte con cualquier
            duda sobre tu proceso de incorporación.
          </ChatBubble>

          <!-- Sugerencias -->
          <SuggestedQuestions @select="addUserMessage" />

          <!-- Mensajes dinámicos -->
          <div v-for="(msg, i) in messages" :key="i">
            <ChatBubble :isUser="msg.user">
              <template v-if="msg.cards">
                <div class="text-caption text-green q-mb-sm">
                  ✅ Encontré {{ msg.cards.length }} enlaces relevantes:
                </div>
                <div v-for="(c, idx) in msg.cards" :key="idx" class="q-mb-md">
                  <q-card flat bordered class="q-pa-sm">
                    <div class="row items-center">
                      <div class="col-auto">
                        <q-icon :name="c.icon || 'link'" size="28px" class="text-primary" />
                      </div>
                      <div class="col">
                        <div class="text-weight-bold">{{ c.title }}</div>
                        <div class="text-caption text-grey-7">{{ c.description }}</div>
                      </div>
                      <div class="col-auto">
                        <q-btn
                          dense
                          color="primary"
                          flat
                          :label="'Abrir'"
                          :to="c.url"
                          target="_blank"
                        />
                      </div>
                    </div>
                  </q-card>
                </div>
              </template>

              <template v-else>
                {{ msg.text }}

                <div v-if="msg.botType === 'supervisor'" class="q-mt-sm">
                  <q-btn
                    flat
                    color="primary"
                    icon="email"
                    label="Enviar email a María González Pérez"
                    class="q-mr-md"
                  />
                  <q-btn flat color="primary" icon="event" label="Programar reunión" />
                </div>
              </template>
            </ChatBubble>
          </div>
        </template>
      </q-page>

      <!-- Ocultamos el input cuando el panel está abierto -->
      <ChatInput v-if="!ui.showNextSteps" @send="addUserMessage" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from 'src/components/NavBar.vue'
import ChatBubble from 'src/components/ChatBubble.vue'
import SuggestedQuestions from 'src/components/SuggestedQuestions.vue'
import ChatInput from 'src/components/ChatInput.vue'
import NextStepsPanel from 'src/components/NextStepsPanel.vue'
import { useUIStore } from 'src/stores/ui'

const messages = ref([])
const ui = useUIStore()

function addUserMessage(text) {
  messages.value.push({ text, user: true })

  const t = text.toLowerCase()

  // Respuesta automática para preguntas sobre supervisora
  if (t.includes('supervisora') || t.includes('supervisor')) {
    messages.value.push({
      text: 'Tu supervisora es María González Pérez. Puedes contactarla por correo electrónico o programar una reunión:',
      user: false,
      botType: 'supervisor',
    })
    return
  }

  // Respuesta automática que devuelve una lista de enlaces (como en la captura)
  if (t.includes('intranet') || t.includes('ver todo') || t.includes('ver')) {
    messages.value.push({
      user: false,
      cards: [
        {
          title: 'Intranet TCS',
          description:
            'Portal corporativo con acceso a recursos, noticias y herramientas de la empresa.',
          url: 'https://intranet.tcs.com',
          icon: 'public',
        },
        {
          title: 'Políticas Internas',
          description: 'Documentación oficial sobre políticas, procedimientos y normativas de TCS.',
          url: 'https://docs.tcs.com/politicas',
          icon: 'description',
        },
        {
          title: 'Formularios de RRHH',
          description: 'Acceso a formularios y documentos necesarios para Recursos Humanos.',
          url: 'https://rrhh.tcs.com/formularios',
          icon: 'article',
        },
        {
          title: 'Manual del Empleado',
          description: 'Guía completa para nuevos empleados con información esencial.',
          url: 'https://docs.tcs.com/manual-empleado',
          icon: 'menu_book',
        },
        {
          title: 'Portal de Capacitación',
          description: 'Plataforma de cursos y programas de formación continua.',
          url: 'https://learning.tcs.com',
          icon: 'school',
        },
      ],
    })
    return
  }
}
</script>
