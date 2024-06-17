<template>
  <div class="flex items-center gap-5 mb-4">
    <div @click="toggleDrawer" class="p-2">
      <svg
        class="opacity-60 transition hover:-translate-x-1 hover:opacity-100 rotate-180 cursor-pointer"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <h2 class="text-2xl font-bold">Кошик</h2>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const toggleDrawer = () => {
  store.dispatch('basket/toggleDrawer')
}
</script>
