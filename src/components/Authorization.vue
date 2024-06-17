<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/10 z-10">
    <component
      :is="currentComponent"
      :close-menu="closeMenu"
      @show-register="showRegister"
      @show-login="showLogin"
    ></component>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Login from './Login.vue'
import Register from './Register.vue'
import { useStore } from 'vuex'

const store = useStore()
const getUser = computed(() => store.getters['authorization/getUser'])

const currentComponent = ref('Login')

const showRegister = () => {
  currentComponent.value = 'Register'
}

const showLogin = () => {
  currentComponent.value = 'Login'
}

const closeMenu = () => {
  store.dispatch('authorization/toggleLoginMenu')
}

watch(getUser, () => {
  store.dispatch('authorization/toggleLoginMenu')
})
</script>

<script>
export default {
  components: {
    Login,
    Register
  }
}
</script>
