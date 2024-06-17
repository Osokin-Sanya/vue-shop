<template>
  <div>
    <CardList v-show="getUser" :items="items" />
    <div
      v-show="!getUser"
      class="bg-red-100 text-red-700 border border-red-300 p-5 my-5 rounded-lg text-center shadow-md transition-opacity duration-300 ease-in-out opacity-90"
    >
      Зайдіть у свій профіль, щоб побачити обрані товари
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect, watch } from 'vue'
import { useStore } from 'vuex'
import CardList from '../components/CardList.vue'

const store = useStore()

const favoriteItems = computed(() => store.getters['favorites/getFavoriteItems'])

const getUser = computed(() => store.getters['authorization/getUser'])

const items = ref([])

watchEffect(() => {
  items.value = favoriteItems.value
})

const fetchData = async () => {
  await store.dispatch('items/fetchFavoriteIds')
  await store.dispatch('items/fetchBasketIds')

  await store.dispatch('favorites/fetchFavoriteItems')
}
watch(getUser, async () => {
  if (getUser.value) return await fetchData()
})
onMounted(async () => {
  if (getUser.value) return await fetchData()
})
</script>
