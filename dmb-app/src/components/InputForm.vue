<template>
  <label
    :class="data === value ? 'selected' : ''"
    :for="type == 'radio' ? `Inp${value}` : ''"
    v-if="type == 'radio'"
  >
    {{ label }}
  </label>
  <label v-else>
    {{ label }}
  </label>
  <input
    type="text"
    v-model="data"
    v-if="type == 'text' || view"
    :maxlength="maxlength"
    :disabled="!(disabled === 'false' || !disabled)"
  />
  <input
    type="password"
    v-model="data"
    v-if="type == 'password' && !view"
    :maxlength="maxlength"
    :disabled="!(disabled === 'false' || !disabled)"
  />
  <input
    type="date"
    v-model="data"
    v-if="type == 'date'"
    :maxlength="maxlength"
    :disabled="!(disabled === 'false' || !disabled)"
  />
  <input
    type="email"
    v-model="data" v-if="type == 'email'"
    :disabled="!(disabled === 'false' || !disabled)"
  />
  <input
    :id="`Inp${value}`"
    type="radio"
    v-model="data"
    :name="name"
    :value="value"
    v-if="type == 'radio'"
    :disabled="!(disabled === 'false' || !disabled)"
  />
  <span
    class="view-password"
    :class="view ? 'close' : 'open'"
    @click="TogglePassword"
    v-if="showPassword"
  >
    {{ view ? 'Ocultar' : 'Ver' }}
  </span>
  <span
    class="error"
    v-if="valid"
    v-html="valid"
  >
  </span>
</template>
<script setup>
  import { computed, ref } from 'vue'
  const props = defineProps({
    value: {},
    label: {
      type: String,
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    valid: {
      type: String,
      default: null
    },
    maxlength: {
      type: String,
      default: ''
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  })
  const data = defineModel()
  const label = computed(() => props.label)
  const valid = computed(() => props.valid)
  const name = computed(() => props.name)
  const type = computed(() => props.type)
  const value = computed(() => props.value)
  const maxlength = computed(() => props.maxlength)
  const showPassword = computed(() => props.showPassword)
  const view = ref(false)
  const TogglePassword = () => view.value = !view.value
</script>
