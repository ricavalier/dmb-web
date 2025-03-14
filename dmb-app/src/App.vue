<template>
  <main>
      <header>
          <p v-if="tab < 5"> Etapa <span>{{ tab }}</span> de 4</p>
          <p v-else> Finalizado</p>
          <h1>{{ stepCurrent.title }}</h1>
        </header>
        <section v-if="stepCurrent">
          <component :is="steps[stepCurrent.name]" v-model="register" @error="ValidError" v-if="stepCurrent.name !== stepLast.name" />
          <component :is="steps[stepLast.name]" v-model="regData" v-else />
      </section>
      <section v-else>
          Aguarde...
      </section>
      <footer>
          <button
              class="primary-border"
              @click="GetPrevStep(stepCurrent.prevStep)"
              v-if="stepCurrent.name !== stepFirst.name && !sendTo"
          >
              Voltar
          </button>
          <button
              class="primary"
              :class="stepCurrent.name === stepFirst.name ? 'block' : ''"
              :disabled="!stepCurrent.validButton"
              @click="GetNextStep(stepCurrent.nextStep)"
              v-if="stepCurrent.name !== 'TabReview' && !sendTo"
          >
              Continuar
          </button>
          <button
              class="primary"
              :disabled="!stepCurrent.validButton"
              @click="SetRegister()"
              v-if="stepCurrent.name == 'TabReview' && !sendTo"
              >
              Cadastrar
          </button>
          <button
              class="primary block"
              @click="GetRegister()"
              v-if="stepCurrent.name == 'TabReview' && sendTo"
          >
              Visualizar Dados
          </button>
          <button
              class="primary block"
              @click="GetStarStep(stepFirst.name)"
              v-if="stepCurrent.name == 'TabViewData' && sendTo"
          >
              Início
          </button>
      </footer>
  </main>
  <notify-msg v-model="notify" />
</template>
<script setup>
import { createApp, onBeforeMount, ref, watch } from 'vue'
import TabHome from '@/components/TabHome.vue'
import TabData from '@/components/TabData.vue'
import TabPassword from '@/components/TabPassword.vue'
import TabReview from '@/components/TabReview.vue'
import TabViewData from '@/components/TabViewData.vue'
import NotifyMsg from '@/components/NotifyMsg.vue'
import Providers from '@/providers'
const comp = createApp({})
comp.component([
  TabHome,
  TabData,
  TabPassword,
  TabReview,
  TabViewData,
  NotifyMsg
])
const tab = ref(0)
const steps = {
  TabHome,
  TabData,
  TabPassword,
  TabReview,
  TabViewData,
}
const register = ref({})
const stepCurrent = ref({})
const stepList = ref([
  {
      name: 'TabHome',
      title: 'Seja benvindo(a)',
      validButton: false,
      prevStep: null,
      nextStep: 'TabData'
  },
  {
      name: 'TabData',
      title: register.value.docType == 1 ? 'Pessoa Física' : 'Pessoa Jurídica',
      validButton: false,
      prevStep: 'TabHome',
      nextStep: 'TabPassword'
  },
  {
      name: 'TabPassword',
      title: 'Senha de Acesso',
      validButton: false,
      prevStep: 'TabData',
      nextStep: 'TabReview'
  },
  {
      name: 'TabReview',
      title: 'Revise Suas Informações de Acesso',
      validButton: false,
      prevStep: 'TabPassword',
      nextStep: 'TabViewData'
  },
  {
      name: 'TabViewData',
      title: 'Visualize os Dados',
      validButton: false,
      prevStep: null,
      nextStep: null
  }
])
watch(register, () => {
  stepList.value[1].title = register.value.docType == 1 ? 'Pessoa Física' : 'Pessoa Jurídica'
})
const stepFirst = ref(stepList.value[0])
const stepLast = ref({})
const GetLastStep = () => {
  const count = stepList.value.length - 1
  if(count < 0) {
      stepLast.value = stepList.value[0]
  } else {
      stepLast.value = stepList.value[count]
  }

}
const GetNextStep = (val) => {
  stepCurrent.value = stepList.value.find(obj =>  obj.name === val)
  tab.value = tab.value + 1
}
const GetPrevStep = (val) => {
  stepCurrent.value = stepList.value.find(obj => obj.name === val)
  tab.value = tab.value - 1
}
const GetStarStep = (val) => {
  stepCurrent.value = stepList.value.find(obj => obj.name === val)
  register.value = {}
  sendTo.value =  false
  tab.value = 1
}
const ValidError = (val) => {
  stepList.value.map(obj => {
      if(obj.name == stepCurrent.value.name) {
          obj.validButton = val
      }
      return obj
  })
}
const sendTo = ref(false)
const regId = ref(1)
const regData = ref({})
const notify = ref({})
const SetRegister = async () => {
  register.value.typePerson = register.value.docType == 1 ? 'Pessoa Física' : 'Pessoa Jurídica'
      await Providers.SetRegistration(register.value)
      .then((res) => {
          res.json().then((data) => {
              if (data.code == '200') {
                  regId.value = data.data.id
                  sendTo.value = true
                  notify.value = {
                      message: data.data.message,
                      status: 'success'
                  }
              } else {
                  const error = (data.data && data.data.message) || res.status;
                  sendTo.value = false
                  notify.value = {
                      message: data.data.message || res.status,
                      status: 'error'
                  }
                  return Promise.reject(error);
              }
          })
      })
}
const GetRegister = async () => {
  await Providers.GetRegistration(regId.value)
      .then((res) => {
          res.json().then((data) => {
              regData.value = data.data
              if (data.code == '200') {
                  sendTo.value = true
                  register.value = {}
                  GetNextStep(stepLast.value.name)
              } else {
                  const error = (data.data && data.data.message) || res.status;
                  sendTo.value = false
                  notify.value = {
                      message: data.data.message || res.status,
                      status: 'error'
                  }
                  return Promise.reject(error);
              }
          })
      })
}
onBeforeMount(() => {
  GetNextStep(stepFirst.value.name)
  GetLastStep()
})
</script>
