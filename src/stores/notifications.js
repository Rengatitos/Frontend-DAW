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
        // Obtener actividades del usuario
        const response = await api.get('Actividad')

        // Mapear actividades como notificaciones
        const data = Array.isArray(response.data) ? response.data : response.data.data || []
        this.notifications = data.map((actividad) => ({
          id: actividad._id || actividad.id,
          titulo: actividad.nombre || actividad.name || 'Sin título',
          descripcion: actividad.descripcion || actividad.description || 'Actividad pendiente',
          fechaLimite: actividad.fechaLimite || actividad.dueDate || '',
          estado:
            (actividad.estado || actividad.status) === 'Completada' ? 'completada' : 'pendiente',
          completed:
            (actividad.estado || actividad.status) === 'Completada' || actividad.completed === true,
          leida: false,
          prioridad: actividad.prioridad || actividad.priority || 'media',
        }))
      } catch (error) {
        console.error('Error fetching tasks as notifications:', error)
        // Usar actividades vacías si hay error
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
