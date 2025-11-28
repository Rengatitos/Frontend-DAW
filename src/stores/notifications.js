import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    abierta: false,
    loading: false,
  }),

  getters: {
    pendientes: (state) => state.notifications.filter((n) => !n.completed),
    completadas: (state) => state.notifications.filter((n) => n.completed),
    totalPendientes: (state) => state.notifications.filter((n) => !n.completed).length,
  },

  actions: {
    async fetchNotifications() {
      this.loading = true
      try {
        // Obtener actividades en lugar de la ruta obsoleta /Tarea
        const response = await api.get('Actividad')

        // Mapear actividades como notificaciones
        const data = Array.isArray(response.data) ? response.data : response.data.data || []
        this.notifications = data.map((act) => ({
          id: act.id || act._id || null,
          titulo: act.titulo || act.nombre || 'Sin título',
          descripcion: act.descripcion || act.description || 'Actividad pendiente',
          fechaLimite: act.fechaFin || act.fechaFin || '',
          estado: act.estado || 'Pendiente',
          completed: typeof act.estado === 'string' && act.estado.toLowerCase().includes('complet'),
          leida: false,
          prioridad: act.tipo || 'media',
        }))
      } catch (error) {
        console.error('Error fetching activities as notifications:', error)
        // Usar lista vacía si hay error
        this.notifications = []
      } finally {
        this.loading = false
      }
    },

    abrirPanel() {
      this.abierta = true
    },
    togglePanel() {
      this.abierta = !this.abierta
    },
    cerrarPanel() {
      this.abierta = false
    },
    marcarComoLeida(id) {
      const n = this.notifications.find((n) => n.id === id)
      if (n) n.leida = true
    },
    marcarComoCompletada(id) {
      const n = this.notifications.find((n) => n.id === id)
      if (n) {
        n.completed = true
        n.estado = 'completada'
      }
    },
  },
})
