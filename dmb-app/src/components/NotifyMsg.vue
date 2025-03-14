<template>
  <div class="notify" :class="status" v-if="status">
    <span>{{ message }}</span>
  </div>
</template>
<script setup>
import { computed, watch } from 'vue'
  const data = defineModel()
  const status = computed(() => (data.value || {}).status || '')
  const message = computed(() => (data.value || {}).message || '')
  watch(
    data,
    () => {
      setTimeout(() => {
        data.value = {}
      }, 5000);
    }, {
    deep: true
  })
</script>
