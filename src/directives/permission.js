import { useAuthStore } from 'src/stores/auth'

export default {
  mounted(el, binding) {
    const value = binding.value
    const store = useAuthStore()
    const role = store.role || localStorage.getItem('role') || null

    const allowed = Array.isArray(value) ? value.includes(role) : value === role
    if (!allowed) {
      el.style.display = 'none'
    }
  },
}
