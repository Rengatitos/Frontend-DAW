<template>
  <q-page class="q-pa-lg">
    <ChatBubble :isUser="false">
      <div class="text-h6">Mi Supervisor</div>
      <div class="text-grey text-caption">Información de contacto de tu supervisora</div>
    </ChatBubble>

    <ChatBubble :isUser="false" class="q-mt-md">
      <div class="row items-center">
        <div class="col-auto">
          <q-avatar class="bg-primary text-white"> {{ supervisor.iniciales }} </q-avatar>
        </div>
        <div class="col">
          <div class="text-weight-bold">{{ supervisor.nombre }}</div>
          <div class="text-caption text-grey-7">{{ supervisor.cargo }}</div>
          <div v-if="supervisor.email" class="text-caption text-grey-6 q-mt-xs">
            <q-icon name="email" size="14px" class="q-mr-xs" />
            {{ supervisor.email }}
          </div>
          <div v-if="supervisor.telefono" class="text-caption text-grey-6">
            <q-icon name="phone" size="14px" class="q-mr-xs" />
            {{ supervisor.telefono }}
          </div>
          <div class="q-mt-sm">
            <q-btn
              flat
              icon="email"
              label="Enviar email"
              color="primary"
              :href="`mailto:${supervisor.email}`"
            />
            <q-btn flat icon="event" label="Programar reunión" color="primary" />
          </div>
        </div>
      </div>
    </ChatBubble>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChatBubble from 'src/components/ChatBubble.vue'
import { api } from 'src/boot/axios'

const ROLE_ID_ADMIN_FALLBACK = '6913adbcca79acfd93858d5c'

const supervisor = ref({
  nombre: 'Supervisor',
  cargo: 'RRHH',
  email: 'supervisor@tcs.com',
  telefono: '+51 999 999 999',
  iniciales: 'SV',
})

const loading = ref(true)

const loadSupervisor = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      console.warn('No hay token')
      return
    }

    // Try supervisor endpoint; if it fails, fallback to role-based admin list
    try {
      const supervisorRes = await api.get('Usuario/supervisor')

      if (supervisorRes.data) {
        const s = supervisorRes.data
        supervisor.value = {
          nombre: s.nombre || 'Supervisor',
          cargo: s.cargo || 'RRHH',
          email: s.correo || s.email || '',
          telefono: s.telefono || '',
          iniciales: (s.nombre || 'S')
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase(),
        }
        return
      }
    } catch {
      // fallback: fetch first admin from role list
      try {
        const adminsRes = await api.get(`Usuario/rol/${ROLE_ID_ADMIN_FALLBACK}`)
        const admins = Array.isArray(adminsRes.data) ? adminsRes.data : adminsRes.data?.data || []
        if (admins.length > 0) {
          const s = admins[0]
          supervisor.value = {
            nombre: s.nombre || 'Supervisor',
            cargo: s.cargo || 'RRHH',
            email: s.correo || s.email || '',
            telefono: s.telefono || '',
            iniciales: (s.nombre || 'S')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase(),
          }
        }
      } catch (err2) {
        console.error('Error cargando supervisor (fallback):', err2)
      }
    }
  } catch (error) {
    console.error('Error cargando supervisor:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadSupervisor()
})
</script>
