const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/OnboardingIAPage.vue'),
        meta: { fullWidth: true },
      },
      {
        path: 'onboarding-chat',
        component: () => import('pages/OnboardingChatPage.vue'),
        meta: { fullWidth: true },
      },
      {
        path: 'agente-ia',
        component: () => import('pages/AgenteIAPage.vue'),
        meta: { fullWidth: true },
      },
      { path: 'mi-supervisor', component: () => import('pages/MiSupervisorPage.vue') },
      /* 'proximos-pasos' removed - Next Steps now opens inside Onboarding page */
      { path: 'enlaces-utiles', component: () => import('pages/UsefulLinksPage.vue') },
    ],
  },

  // No tocar esto ↓
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
