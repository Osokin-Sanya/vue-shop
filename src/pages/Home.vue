<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Усі кросівки</h2>

    <div class="flex gap-4">
      <select
        class="px-4 py-2 border border-slate-300 rounded-xl outline-none focus:border-slate-300"
        @change="updateFilters"
        v-model="sortBy"
      >
        <option value="price">По ціні (від більшої)</option>
        <option value="-price">По ціні (від меньшої)</option>
        <option value="name">По назві</option>
      </select>

      <div class="relative">
        <img class="absolute left-2 top-3" src="/search.svg" alt="Иконка поиска" />
        <input
          class="border border-slate-300 rounded-xl px-4 pl-8 py-2 outline-none focus:border-slate-500"
          type="text"
          placeholder="Пошук..."
          v-model="searchQuery"
          @input="updateFilters"
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import CardList from '../components/CardList.vue'

const store = useStore()

const user = computed(() => store.getters['authorization/getUser'])
const items = computed(() => store.getters['items/getItems'])

const sortBy = ref('price')
const searchQuery = ref('')

const fetchData = async () => {
  await store.dispatch('items/fetchItems')
  if (user.value) {
    await store.dispatch('items/fetchFavoriteIds')
    await store.dispatch('items/fetchBasketIds')
  }
}

const updateFilters = async () => {
  const filters = {
    sortBy: sortBy.value,
    searchQuery: searchQuery.value
  }
  await store.dispatch('filters/updateFilters', filters)
}

watch(user, async (newValue) => {
  if (newValue) {
    await store.dispatch('items/fetchFavoriteIds')
    await store.dispatch('items/fetchBasketIds')
  }
})

onMounted(() => {
  if (Array.from(items.value).length === 0) {
    fetchData()
  }
})
</script>
