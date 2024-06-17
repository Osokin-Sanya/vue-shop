<template>
  <Drawer v-show="openDrawer" />
  <Authorization v-show="openLoginMenu" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'

import Header from '@/components/Header.vue'
import Drawer from './components/Drawer.vue'
import Authorization from './components/Authorization.vue'

const store = useStore()
const openDrawer = computed(() => store.state.basket.drawerOpen)
const openLoginMenu = computed(() => store.state.authorization.openLoginMenu)
</script>
