<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />

    <q-page-container>
      <q-page class="q-pa-lg">
        <ChatBubble :isUser="false">
          <div class="text-h6">Enlaces Útiles</div>
          <div class="text-grey text-caption">Accesos directos a recursos importantes</div>
        </ChatBubble>

        <div class="q-mt-md">
          <q-list bordered>
            <q-item v-for="(l, i) in links" :key="i">
              <q-item-section>
                <q-item-label>{{ l.title }}</q-item-label>
                <q-item-label caption>{{ l.url }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn flat dense color="primary" :to="l.url" target="_blank">Abrir</q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/NavBar.vue'
import ChatBubble from 'src/components/ChatBubble.vue'
import { ref } from 'vue'

const links = ref([
  { title: 'Intranet TCS', url: 'https://intranet.tcs.com' },
  { title: 'Políticas', url: 'https://docs.tcs.com/politicas' },
  { title: 'Formularios RRHH', url: 'https://rrhh.tcs.com/formularios' },
])
</script>
