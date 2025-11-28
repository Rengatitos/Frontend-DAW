<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <div class="text-h2 text-negative">403</div>
      <div class="text-h6 q-mt-sm">Acceso denegado</div>
      <div class="q-mt-md">No tienes permisos para ver esta página.</div>
      <q-btn class="q-mt-lg" color="primary" label="Ir al inicio" @click="$router.push('/dashboard')" />
    </div>
  </q-page>
</template>

<script setup>
// simple static forbidden page
</script>

<style scoped>
.q-page { height: 100%; }
</style>
