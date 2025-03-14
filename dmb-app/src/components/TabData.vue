<template>
  <article>
    <p>
      <input-form :label="data.docType == 1 ? 'Nome' : 'Razão Social'" type="text" v-model="data.name"
        :valid="!error.name && data.name !== null ? 'Esse campo é necessário!' : ''" maxlength="100" />
    </p>
    <p>
      <input-form :label="data.docType == 1 ? 'CFP' : 'CNPJ'" type="text" v-model="data.document"
        :valid="!error.document && data.document ? 'Documento não é válido!' : ''"
        :maxlength="data.docType == 1 ? '14' : '18'" />
    </p>
    <p>
      <input-form :label="data.docType == 1 ? 'Data de Nascimento' : 'Data de Abertura'" type="date" v-model="data.date"
        :valid="!error.date && data.date ? 'Data não é válida!' : ''" maxlength="10" />
    </p>
    <p>
      <input-form label="Telefone" type="text" v-model="data.phone"
        :valid="!error.phone && data.phone ? 'Telefone ou Celular não é válido!' : ''" maxlength="15" />
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
    name: (data.value || {}).name || null,
    document: (data.value || {}).document || null,
    date: (data.value || {}).date || null,
    phone: (data.value || {}).phone || null,
  }
  const error = ref({
    name: false,
    document: false,
    date: false,
    phone: false,
  })
  watch(data, () => {
    error.value.name = ((data.value || {}).name || "").length > 0
    data.value.document = data.value.docType == 1 ? Utils.MaskCpf(data.value.document) : Utils.MaskCnpj(data.value.document)
    error.value.document = data.value.docType == 1 ? Utils.ValidCpf(data.value.document) : Utils.ValidCnpj(data.value.document)
    error.value.date = Utils.ValidDate(data.value.date)
    data.value.phone = Utils.MaskPhone(data.value.phone)
    error.value.phone = Utils.ValidPhone(data.value.phone)
  }, {
    deep: true
  })
  const chkError = () => {
    if (
      (error.value || {}).name &&
      (error.value || {}).document &&
      (error.value || {}).date &&
      (error.value || {}).phone
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
