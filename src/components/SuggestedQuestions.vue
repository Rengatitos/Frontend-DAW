<template>
  <div class="q-pa-lg suggested-questions">
    <div class="text-subtitle2 text-grey-7 q-mb-sm">💡 Sugerencias:</div>

    <div class="row q-col-gutter-sm">
      <div class="col-6 col-md-3" v-for="q in questions" :key="q">
        <q-btn
          flat
          unelevated
          rounded
          class="suggestion-btn"
          :label="q"
          @click="$emit('select', q)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const questions = [
  '¿Qué documentos debo presentar?',
  '¿Cómo contacto a mi supervisora?',
  '¿Cuál es el horario de trabajo?',
  '¿Dónde subo mi contrato?',
  '¿Qué beneficios ofrece TCS?',
  '¿Qué formación debo completar?',
  'Ver intranet',
  'Ver todo',
]
</script>

<style scoped>
.suggested-questions {
  max-width: 1000px;
  margin: 0 auto;
}
.suggestion-btn {
  width: 100%;
  text-align: left;
  padding-left: 0.9rem;
  border: 1px solid rgba(16, 24, 40, 0.04);
}
.suggestion-btn:hover {
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
  transform: translateY(-1px);
}
</style>
