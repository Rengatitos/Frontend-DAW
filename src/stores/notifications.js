import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [
      {
        id: 1,
        titulo: 'Completa tu formulario de bienvenida',
        descripcion: 'Por favor, completa el formulario de datos personales antes del viernes.',
        fechaLimite: '2025-11-08',
        estado: 'pendiente', // pendiente | vencida | completada
        leida: false,
      },
      {
        id: 2,
        titulo: 'Firma la política de confidencialidad',
        descripcion: 'Debes revisar y firmar la política de confidencialidad de TCS.',
        fechaLimite: '2025-11-10',
        estado: 'pendiente',
        leida: false,
      },
      {
        id: 3,
        titulo: 'Contrato laboral firmado',
        descripcion: 'Has completado exitosamente la firma y entrega del contrato laboral.',
        fechaLimite: '2025-11-03',
        estado: 'completada',
        leida: true,
      },
    ],
    abierta: false,
  }),

  getters: {
    pendientes: (state) => state.notifications.filter((n) => n.estado !== 'completada'),
    completadas: (state) => state.notifications.filter((n) => n.estado === 'completada'),
    totalPendientes: (state) => state.notifications.filter((n) => n.estado !== 'completada').length,
  },

  actions: {
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
      if (n) n.estado = 'completada'
    },
  },
})
