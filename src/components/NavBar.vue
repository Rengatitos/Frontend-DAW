<template>
  <q-header elevated class="bg-white text-dark shadow-2">
    <q-toolbar class="q-px-md" style="height: 64px">
      <!-- Logo -->
      <div class="row items-center q-gutter-sm">
        <q-avatar square size="42px" class="bg-primary text-white">T</q-avatar>
        <div class="text-weight-bold">TCS Onboarding</div>
      </div>
      <div v-if="!hideMenu" class="q-ml-md">
        <q-btn flat dense label="Mi Supervisor" to="/mi-supervisor" class="nav-btn" />
        <q-btn flat dense label="Agente IA" to="/agente-ia" class="nav-btn" />
        <q-btn flat dense label="Chatbot Onboarding" to="/onboarding-chat" class="nav-btn" />
        <q-btn flat dense label="Próximos Pasos" @click="openNextSteps" class="nav-btn" />
        <q-btn flat dense label="Enlaces Útiles" to="/enlaces-utiles" class="nav-btn" />
      </div>

      <q-space />

      <!-- 🔔 Botón de Notificaciones -->
      <q-btn flat dense round icon="notifications" @click="store.togglePanel()">
        <q-badge v-if="store.totalPendientes > 0" color="red" floating>
          {{ store.totalPendientes }}
        </q-badge>
      </q-btn>

      <!-- Avatar del usuario -->
      <q-avatar class="bg-primary q-ml-sm"> C </q-avatar>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useNotificationsStore } from 'src/stores/notifications'
import { useUIStore } from 'src/stores/ui'
import { useRouter } from 'vue-router'

const store = useNotificationsStore()
const ui = useUIStore()
const router = useRouter()

function openNextSteps() {
  // Navigate to onboarding page and ensure the panel is shown
  router.push('/').catch(() => {})
  ui.openNextSteps()
}
</script>

<script>
export default {
  name: 'NavBar',
  props: {
    hideMenu: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.nav-btn {
  margin-left: 6px;
  color: rgba(16, 24, 40, 0.75);
}
.nav-btn.router-link-exact-active {
  color: #0d6efd;
  font-weight: 600;
}
</style>
