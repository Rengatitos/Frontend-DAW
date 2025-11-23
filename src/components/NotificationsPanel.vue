<template>
  <q-dialog v-model="store.abierta" persistent position="right">
    <q-card style="width: 420px; max-width: 90vw">
      <q-card-section class="row items-center q-pa-sm">
        <div class="text-h6">🔔 Notificaciones</div>
        <q-space />
        <q-btn flat round dense icon="close" @click="store.cerrarPanel()" />
      </q-card-section>

      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-pa-sm">
          Tienes {{ store.totalPendientes }} tareas pendientes
        </div>

        <!-- Pendientes -->
        <div v-for="n in store.pendientes" :key="n.id">
          <q-item clickable v-ripple @click="verDetalle(n.id)">
            <q-item-section avatar>
              <q-icon name="notifications_active" color="blue" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ n.titulo }}</q-item-label>
              <q-item-label caption>{{ n.descripcion }}</q-item-label>
              <q-item-label caption> 📅 Fecha límite: {{ n.fechaLimite }} </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip color="red" text-color="white" size="sm">Vencida</q-chip>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>

        <!-- Completadas -->
        <div class="text-subtitle2 q-pa-sm">Completadas</div>

        <div v-for="n in store.completadas" :key="n.id">
          <q-item clickable v-ripple @click="verDetalle(n.id)">
            <q-item-section avatar>
              <q-icon name="check_circle" color="green" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ n.titulo }}</q-item-label>
              <q-item-label caption>{{ n.descripcion }}</q-item-label>
              <q-item-label caption> 📅 Fecha límite: {{ n.fechaLimite }} </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip color="green" text-color="white" size="sm">Completada</q-chip>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useNotificationsStore } from 'src/stores/notifications'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useNotificationsStore()

function verDetalle(id) {
  store.marcarComoLeida(id)

  $q.dialog({
    title: 'Detalle',
    message: 'Aquí puedes mostrar más información o enlaces según la notificación',
  })
}
</script>
