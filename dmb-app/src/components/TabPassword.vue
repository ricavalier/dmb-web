<template>
  <article>
    <p>
      <input-form
        label="Senha"
        type="password"
        v-model="data.password"
        show-password
        :valid="!error.password && data.password ?
          `A senha deve conter:<br>
          no mínimo 8 caracteres, números, letras ,<br>
          um caractere especial (!#$%¨&*-_+=§^~:;,.)<br>
          e sem caracteres com sequência repetida.`
        :
          ''
        "
      />
    </p>
  </article>
</template>
<script setup>
  import { createApp, onMounted, ref, watch } from 'vue'
  import Utils from '@/utils/utils'
  import InputForm from "@/components/InputForm.vue"
  const comp = createApp({})
  comp.component([
    InputForm
  ])
  const emit = defineEmits(['error'])
  const data = defineModel()
  data.value = {
    ...data.value,
    password: (data.value || {}).password || null
  }
  const error = ref({
    password: false
  })
  watch(data, () => {
    error.value.password = data.value.password ? Utils.ValidPassword(data.value.password) : false
  }, {
    deep: true
  })
  const chkError = () => {
    if (
      (error.value || {}).password
    ) {
      emit('error', true)
    } else {
      emit('error', false)
    }
  }
  watch(error, () => {
    chkError()
  }, {
    deep: true
  })
  onMounted(() => {
    chkError()
  })
</script>
