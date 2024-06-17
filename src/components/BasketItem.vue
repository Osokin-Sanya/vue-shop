<template>
  <div class="flex items-center w-full p-4 border border-slate-100 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Product Image" />
    <div class="flex flex-col justify-between w-full">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }}</b>
        <img
          @click="removeFromCart"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="Remove from cart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { defineProps } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})

const store = useStore()

const removeFromCart = () => {
  store.dispatch('basket/removeToBasket', props.id)
}
</script>
