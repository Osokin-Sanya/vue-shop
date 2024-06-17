<template>
  <div
    class="login max-w-[360px] mx-auto border border-slate-300 rounded-xl p-8 top-1/4 bg-slate-100 shadow-lg relative max-w-md mx-auto"
  >
    <button class="absolute top-4 right-4 text-slate-500 hover:text-slate-700" @click="closeMenu">
      X
    </button>
    <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block text-sm font-medium text-slate-700 mb-1" for="email">Email:</label>
        <input
          class="border border-slate-300 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-slate-700 mb-1" for="password"
          >Password:</label
        >
        <input
          class="border border-slate-300 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          v-model="password"
          required
        />
      </div>
      <button
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Confirm
      </button>
    </form>
    <button class="w-full mt-4 text-blue-500 hover:underline" @click="$emit('show-register')">
      Register New Account
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

defineProps({
  closeMenu: Function
})
const email = ref('')
const password = ref('')
const store = useStore()

const handleLogin = async () => {
  await store.dispatch('authorization/logIn', [email.value, password.value])
}
</script>
