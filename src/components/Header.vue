<template>
  <header class="flex justify-between border-b-2 px-8 py-4">
    <div class="flex items-center gap-4">
      <router-link to="/">
        <img class="w-10" src="/logo.png" alt="logo" />
      </router-link>

      <div>
        <h2 class="text-xl font-bold uppercase">Bumbus</h2>
        <p class="text-slate-500">Магазин кросівок</p>
      </div>
    </div>
    <ul class="flex items-center gap-10">
      <li
        v-show="getUser"
        @click="toggleDrawer"
        class="cursor-pointer flex items-center gap-3 hover:text-sky-700"
      >
        <img src="/cart.svg" alt="" />
        <b> {{ getBasketIds.length }}</b>
      </li>
      <li class="cursor-pointer flex items-center gap-3 hover:text-sky-700">
        <img src="/heart.svg" alt="" />
        <router-link to="/favorites">Закладки</router-link>
      </li>
      <li class="cursor-pointer flex items-center gap-3 hover:text-sky-700">
        <img src="/profile.svg" alt="" />
        <span v-show="!getUser" @click="openMenu">Профіль</span>
        <div class="relative inline-block text-left">
          <button
            @click="toggleDropdown"
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            v-show="getUser"
          >
            {{ name }}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div
            v-if="isOpen"
            class="origin-top-right absolute right-0 mt-2 text-center w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div class="py-1" role="none">
              <span href="#" class="text-gray-700 block px-4 py-2 text-sl" @click="selectLogout"
                >logout</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
  </header>
</template>
<script setup>
import { calculateTotalPrice } from '@/store/utils'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const getBasketIds = computed(() => store.getters['basket/getBasketIds'])
const getUser = computed(() => store.getters['authorization/getUser'])

const name = ref(getUser.value?.user_metadata.name)

let totalPrice = ref(0)

watch(getUser, () => {
  name.value = getUser.value?.user_metadata.name
})

watch(getBasketIds, (newVal) => {
  totalPrice.value = calculateTotalPrice(newVal)
})

const toggleDrawer = async () => {
  await store.dispatch('basket/fetchBasketItems')
  await store.dispatch('basket/toggleDrawer')
}
const openMenu = async () => {
  store.dispatch('authorization/toggleLoginMenu')
}

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLogout = () => {
  isOpen.value = false
  store.dispatch('authorization/Logout')
}
</script>
