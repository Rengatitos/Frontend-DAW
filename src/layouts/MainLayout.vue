<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <q-header elevated class="bg-dark text-white">
      <q-toolbar class="q-px-md">
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

        <!-- 🔔 BOTÓN DE NOTIFICACIONES -->
        <q-btn flat round dense icon="notifications" class="q-ml-md" @click="store.abrirPanel()" />
      </q-toolbar>
    </q-header>

    <!-- CONTENIDO DE LA PÁGINA -->
    <q-page-container class="bg-white">
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :class="route.meta && route.meta.fullWidth ? 'page-fullwidth' : 'app-content'"
        />
      </router-view>
    </q-page-container>

    <!-- 🔔 PANEL DE NOTIFICACIONES -->
    <q-drawer
      v-model="store.abierta"
      side="right"
      overlay
      behavior="overlay"
      width="350px"
      bordered
      class="bg-grey-1"
    >
      <div class="q-pa-md">
        <q-toolbar class="q-pa-sm items-center">
          <div class="text-h6 text-weight-bold text-primary q-mr-sm">Notificaciones</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="store.cerrarPanel()" />
        </q-toolbar>

        <q-separator spaced />

        <div v-for="noti in store.notifications" :key="noti.id" class="q-mb-md">
          <q-card flat bordered class="q-pa-sm">
            <div class="text-weight-bold text-primary">
              {{ noti.titulo }}
            </div>

            <div class="text-caption text-grey-7 q-mt-xs">
              {{ noti.descripcion }}
            </div>

            <div class="row items-center justify-between q-mt-sm">
              <div class="text-caption">Fecha límite: {{ noti.fechaLimite }}</div>

              <q-badge
                outline
                :color="noti.estado === 'pendiente' ? 'red' : 'green'"
                align="middle"
              >
                {{ noti.estado }}
              </q-badge>
            </div>

            <q-btn
              flat
              dense
              color="primary"
              label="Ver detalle"
              class="q-mt-sm"
              @click="store.marcarComoLeida(noti.id)"
            />
          </q-card>
        </div>
      </div>
    </q-drawer>
  </q-layout>
</template>

<script setup>
import { useNotificationsStore } from 'src/stores/notifications'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useNotificationsStore()
</script>

<style scoped>
.app-content {
  max-width: 1100px;
  margin: 20px auto;
}
.bg-white {
  background: #f8fafc;
}
.page-fullwidth {
  max-width: none !important;
  width: 100%;
  margin: 0;
  padding: 0 12px;
}
</style>
