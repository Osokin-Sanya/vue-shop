<template>
  <div v-auto-animate class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      v-bind="getItemProps(item)"
      @toggle-to-favorite="toggleToFavorite"
      @toggle-to-cart="toggleTocart"
    />
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import Card from './Card.vue'

const store = useStore()
const toggleToFavorite = ({ itemId, isFavorite }) => {
  if (isFavorite) {
    store.dispatch('favorites/removeFromFavorite', itemId)
  } else {
    store.dispatch('favorites/addToFavorite', itemId)
  }
}
const toggleTocart = ({ itemId, isAdded }) => {
  if (isAdded) {
    store.dispatch('basket/removeToBasket', itemId)
  } else {
    store.dispatch('basket/addToBasket', itemId)
  }
}
defineProps({
  items: Array
})

const getItemProps = (item) => {
  return {
    title: item.title,
    price: item.price,
    imageUrl: item.imageUrl,
    isAdded: item.isAdded,
    isFavorite: item.isFavorite,
    id: item.id
  }
}
</script>
