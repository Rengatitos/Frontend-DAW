<template>
  <div class="chat-row" :class="isUser ? 'chat-row--user' : 'chat-row--bot'">
    <div class="chat-bubble" :class="isUser ? 'chat-bubble--user' : 'chat-bubble--bot'">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({ isUser: Boolean })
</script>

<style scoped>
.chat-row {
  padding: 0.5rem 0.75rem;
}
.chat-row--user {
  text-align: right;
}
.chat-row--bot {
  text-align: left;
}
.chat-bubble {
  display: inline-block;
  max-width: 78%;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
  font-size: 0.98rem;
  line-height: 1.3;
}
.chat-bubble--user {
  background: linear-gradient(90deg, #3a8dff, #2c6ef8);
  color: white;
  border-bottom-right-radius: 6px;
}
.chat-bubble--bot {
  background: #f7f9fb;
  color: #102030;
  border-bottom-left-radius: 6px;
}
</style>
