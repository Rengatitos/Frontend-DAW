import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showNextSteps: false,
  }),
  actions: {
    openNextSteps() {
      this.showNextSteps = true
    },
    closeNextSteps() {
      this.showNextSteps = false
    },
    toggleNextSteps() {
      this.showNextSteps = !this.showNextSteps
    },
  },
})
