<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />

    <q-page-container>
      <q-page class="q-pa-none">
        <!-- Cabecera azul similar a la imagen -->
        <div class="bg-primary text-white q-pa-sm row items-center">
          <div class="col">
            <div class="text-weight-bold">Asistente de Onboarding TCS</div>
            <div class="text-caption">Acceso rápido a recursos corporativos</div>
          </div>
          <div class="col-auto">
            <q-btn flat dense round icon="settings" class="text-white" />
          </div>
        </div>

        <div class="q-pt-sm q-px-lg">
          <!-- Mensaje inicial del asistente -->
          <ChatBubble :isUser="false">
            ¡Bienvenido al Asistente de Onboarding TCS! 👋
            <div class="text-caption text-grey-7 q-mt-sm">
              Escribe palabras clave para acceder a recursos: "intranet", "formularios",
              "políticas", "ver todo"
            </div>
          </ChatBubble>

          <!-- Mensaje con tarjetas (como en tus capturas) -->
          <ChatBubble :isUser="false" class="q-mt-md">
            <div class="text-caption text-green q-mb-sm">✅ Encontré 5 enlaces relevantes:</div>

            <div v-for="(c, idx) in cards" :key="idx" class="q-mb-md">
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
          </ChatBubble>
        </div>

        <ChatInput @send="onSend" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/NavBar.vue'
import ChatBubble from 'src/components/ChatBubble.vue'
import ChatInput from 'src/components/ChatInput.vue'
import { ref } from 'vue'

const cards = ref([
  {
    title: 'Intranet TCS',
    description: 'Portal corporativo con acceso a recursos, noticias y herramientas de la empresa.',
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
])

function onSend(text) {
  // Por ahora sólo añadimos un mensaje de usuario simple en consola
  console.log('Usuario envió:', text)
}
</script>

<style scoped>
.bg-primary {
  background-color: #0d6efd !important;
}
</style>
