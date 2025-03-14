<template>
  <article>
    <p>
      <input-form label="E-mail" type="email" v-model="data.email"
        :valid="!error.email && data.email ? 'Esse e-mail não é válido!' : ''" maxlength="100" />
    </p>
    <p>
      <input-form label="Pessoa Física" type="radio" name="docType" v-model="data.docType" value="1" />
      <input-form label="Pessoa Jurídica" type="radio" name="docType" v-model="data.docType" value="2" />
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
    email: data.value.email || null,
    docType: data.value.docType || null
  }
  const error = ref({
    email: false,
    docType: false
  })
  watch(data, () => {
    error.value.email = data.value.email ? !!Utils.ValidEmail(data.value.email) : false
    error.value.docType = !!data.value.docType
  }, {
    deep: true
  })
  const chkError = () => {
    if (
      (error.value || {}).email &&
      (error.value || {}).docType
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
