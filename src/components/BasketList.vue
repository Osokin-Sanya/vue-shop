<template>
  <div class="flex flex-col gap-5 h-[33rem] overflow-y-scroll no-scrollbar">
    <BasketItem
      v-for="item in items"
      :key="item.id"
      :price="item.price"
      :title="item.title"
      :id="Number(item.id)"
      :imageUrl="item.imageUrl"
    />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup>
import BasketItem from './BasketItem.vue'
defineProps({
  items: Array
})
</script>
