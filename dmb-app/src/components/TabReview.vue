<template>
  <article>
    <p>
      <input-form label="E-mail" type="text" v-model="data.email"
        :valid="!error.email && data.email !== null ? 'Esse e-mail não é válido!' : ''" maxlength="100" />
    </p>
    <p>
      <input-form :label="docType == 1 ? 'Nome' : 'Razão Social'" type="text" v-model="data.name"
        :valid="!error.name && data.name !== null ? 'Esse campo é necessário!' : ''" maxlength="100" />
    </p>
    <p>
      <input-form :label="docType == 1 ? 'CFP' : 'CNPJ'" type="text" v-model="data.document"
        :valid="!error.document && data.document ? 'Documento não é válido!' : ''"
        :maxlength="docType == 1 ? '14' : '18'" />
    </p>
    <p>
      <input-form :label="docType == 1 ? 'Data de Nascimento' : 'Data de Abertura'" type="date" v-model="data.date"
        :valid="!error.date && data.date ? 'Data não é válida!' : ''" maxlength="10" />
    </p>
    <p>
      <input-form label="Telefone" type="text" v-model="data.phone"
        :valid="!error.phone && data.phone ? 'Telefone ou Celular não é válido!' : ''" maxlength="15" />
    </p>
    <p>
      <input-form label="Senha" type="password" v-model="data.password" show-password
        :valid="!error.password && data.password ? `A senha deve ter:<br> no mínimo 8 caracteres, números, letras,<br> caracteres especiais (!#$%¨&*-_+=§^~:;,.)<br> e sem caracteres com sequência repetida.` : ''" />
    </p>
  </article>
</template>
<script setup>
  import { createApp, onMounted, ref, watch, computed } from 'vue'
  import Utils from '@/utils/utils'
  import InputForm from "@/components/InputForm.vue"
  const comp = createApp({})
  comp.component([
    InputForm
  ])
  const emit = defineEmits(['input', 'error'])
  const data = defineModel()
  const docType = computed(() => data.value.docType)
  const error = ref({
    name: false,
    document: false,
    date: false,
    phone: false,
  })
  const ValidError = () => {
    error.value.email = data.value.email ? !!Utils.ValidEmail(data.value.email) : false
    error.value.docType = !!data.value.docType
    error.value.name = ((data.value || {}).name || "").length > 0
    data.value.document = docType.value == 1 ? Utils.MaskCpf(data.value.document) : Utils.MaskCnpj(data.value.document)
    error.value.document = docType.value == 1 ? Utils.ValidCpf(data.value.document) : Utils.ValidCnpj(data.value.document)
    error.value.date = Utils.ValidDate(data.value.date)
    data.value.phone = Utils.MaskPhone(data.value.phone)
    error.value.phone = Utils.ValidPhone(data.value.phone)
    error.value.password = data.value.password ? Utils.ValidPassword(data.value.password) : false
  }
  watch(data, () => {
    ValidError()
  }, {
    deep: true
  })
  const chkError = () => {
    if (
      (error.value || {}).email &&
      (error.value || {}).docType &&
      (error.value || {}).name &&
      (error.value || {}).document &&
      (error.value || {}).date &&
      (error.value || {}).password &&
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
    ValidError()
  })
</script>
