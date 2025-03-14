<template>
  <article>
    <p>
      <strong>Email</strong><br>
      {{ data.email }}
    </p>
    <p>
      <strong>Tipo de Pessoa</strong><br>
      {{ data.typePerson }}
    </p>
    <p>
      <strong>{{ data.docType == 1 ? 'CFP' : 'CNPJ' }}</strong><br>
      {{ data.document }}
    </p>
    <p>
      <strong>{{ data.docType == 1 ? 'Data de Nascimento' : 'Data de Abertura' }}</strong><br>
      {{ Utils.MaskDate(data.date) }}
    </p>
    <p>
      <strong>Telefone</strong><br>
      {{ data.phone }}
    </p>
    <p>
      <strong>Senha</strong><br>
      {{ data.password }}
    </p>
  </article>
</template>
<script setup>
  import { computed } from 'vue'
  import Utils from '@/utils/utils';
  const data = defineModel()
</script>
<style lang="scss" scoped></style>
