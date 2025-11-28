import { defineBoot } from '#q-app/wrappers'
import { useAuthStore } from 'src/stores/auth'

export default defineBoot(async ({ router }) => {
  const auth = useAuthStore()

  // Hydrate auth store from localStorage/token
  try {
    await auth.hydrate()
    // try to ensure we have a user object (fetch from API if necessary)
    await auth.ensureUserFromApi()
  } catch {
    // ignore
  }

  // If after init we are on an admin route but not admin, redirect to login
  if (router && router.currentRoute && router.currentRoute.value) {
    const to = router.currentRoute.value
    if (to.matched.some(r => r.meta && r.meta.requiresAdmin)) {
      if (!auth.isLoggedIn || auth.role !== 'Administrador') {
        router.replace('/login')
      }
    }
  }
})
