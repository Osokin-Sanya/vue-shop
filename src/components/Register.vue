<template>
  <div
    class="register max-w-[360px] mx-auto border border-slate-300 rounded-xl top-1/4 p-8 bg-slate-100 shadow-lg relative max-w-md mx-auto"
  >
    <button class="absolute top-4 right-4 text-slate-500 hover:text-slate-700" @click="closeMenu">
      X
    </button>

    <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label class="block text-sm font-medium text-slate-700 mb-1" for="name">Name:</label>
        <input
          class="border border-slate-300 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          v-model="name"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-slate-700 mb-1" for="email">Email:</label>
        <input
          class="border border-slate-300 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-slate-700 mb-1" for="password"
          >Password:</label
        >
        <input
          class="border border-slate-300 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          v-model="password"
          required
        />
        <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-slate-700 mb-1" for="confirmPassword"
          >Confirm Password:</label
        >
        <input
          class="border border-slate-300 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          v-model="confirmPassword"
          required
        />
        <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">
          {{ confirmPasswordError }}
        </p>
        <p class="text-red-500 text-sm mt-1">
          {{ textResponse }}
        </p>
      </div>
      <button
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Register
      </button>
    </form>
    <button class="w-full mt-4 text-blue-500 hover:underline" @click="$emit('show-login')">
      Back to Login
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

defineProps({
  closeMenu: Function
})

const email = ref('')
const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const textResponse = ref('')
const store = useStore()
const response = computed(() => store.getters['authorization/getResponse'])

const emit = defineEmits(['show-login'])

watch(response, () => {
  textResponse.value = response.value?.error?.message
  if (response.value.data.user) {
    emit('show-login')
  }
})

const handleRegister = async () => {
  passwordError.value = ''
  confirmPasswordError.value = ''

  if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters long!'
    return
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match!'
    return
  }

  store.dispatch('authorization/signUp', [email.value, password.value, name.value])
}
</script>

example@email.com example-password
