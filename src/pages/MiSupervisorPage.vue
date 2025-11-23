<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />

    <q-page-container>
      <q-page class="q-pa-lg">
        <ChatBubble :isUser="false">
          <div class="text-h6">Mi Supervisor</div>
          <div class="text-grey text-caption">Información de contacto de tu supervisora</div>
        </ChatBubble>

        <ChatBubble :isUser="false" class="q-mt-md">
          <div class="row items-center">
            <div class="col-auto">
              <q-avatar class="bg-primary text-white"> MG </q-avatar>
            </div>
            <div class="col">
              <div class="text-weight-bold">María González Pérez</div>
              <div class="text-caption text-grey-7">Supervisora - RRHH</div>
              <div class="q-mt-sm">
                <q-btn flat icon="email" label="Enviar email" color="primary" />
                <q-btn flat icon="event" label="Programar reunión" color="primary" />
              </div>
            </div>
          </div>
        </ChatBubble>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/NavBar.vue'
import ChatBubble from 'src/components/ChatBubble.vue'
</script>
