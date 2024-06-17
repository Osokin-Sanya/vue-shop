// import axios from 'axios'
// import { updateItemsStatus } from './utils'
// import supabase from '../supabaseClient'
// export default {
//   namespaced: true,
//   state: {
//     items: []
//   },
//   mutations: {
//     SET_ITEMS(state, items) {
//       state.items = items
//     },
//     UPDATE_ITEMS_STATUS(state, data) {
//       state.items = updateItemsStatus(state.items, data)
//     }
//   },
//   actions: {
//     async fetchItems({ commit, rootState, dispatch }) {
//       let { data: shopItems, error } = await supabase.from('shopItems').select('*')
//       if (error) console.error('Ошибка получения товаров:', error)
//       else commit('SET_ITEMS', shopItems)
//     },
//     async fetchFavoriteIds({ commit, rootState, dispatch }) {
//       const userId = rootState?.authorization?.user?.id
//       const { data, error } = await supabase.from('users').select('favorites').eq('id', userId)
//       if (error) {
//         console.error('Error fetching user favorites:', error)
//       } else {
//         const favorites = data.length > 0 ? data[0].favorites : []
//         dispatch('updateItems', { favorites })
//         commit('favorites/SET_FAVORITE_ITEMS_ID', favorites, { root: true })
//       }
//     },
//     async fetchBasketIds({ commit, rootState, dispatch }) {
//       const userId = rootState?.authorization?.user?.id
//       const { data, error } = await supabase.from('users').select('basket').eq('id', userId)
//       if (error) {
//         console.error('Error fetching user basket:', error)
//       } else {
//         const basket = data.length > 0 ? data[0].basket : []
//         dispatch('updateItems', { basket })
//         commit('basket/SET_BASKET_ITEMS_ID', basket, { root: true })
//       }
//     },
//     async updateItems({ commit }, data) {
//       commit('UPDATE_ITEMS_STATUS', data)
//     }
//   },
//   getters: {
//     getItems: (state) => state.items
//   }
// }

import { updateItemsStatus } from './utils'
import supabase from '../supabaseClient'

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    UPDATE_ITEMS_STATUS(state, data) {
      if (data) {
        state.items = updateItemsStatus(state.items, data)
      }
    }
  },
  actions: {
    async fetchItems({ commit, rootState }) {
      try {
        const { data, error } = await supabase.from('shopItems').select('*')
        if (error) {
          console.error('Fetch items error:', error.message)
        } else {
          commit('SET_ITEMS', data)
        }
      } catch (error) {
        console.error('Fetch items error:', error.message)
      }
    },
    async fetchFavoriteIds({ commit, rootState, dispatch }) {
      try {
        const userId = rootState?.authorization?.user?.id
        const { data, error } = await supabase.from('users').select('favorites').eq('id', userId)
        if (error) {
          console.error('Fetch user favorites error:', error.message)
        } else {
          const favorites = data.length > 0 ? data[0].favorites : []
          dispatch('updateItems', { favorites })
          commit('favorites/SET_FAVORITE_ITEMS_ID', favorites, { root: true })
        }
      } catch (error) {
        console.error('Fetch user favorites error:', error.message)
      }
    },
    async fetchBasketIds({ commit, rootState, dispatch }) {
      try {
        const userId = rootState?.authorization?.user?.id
        const { data, error } = await supabase.from('users').select('basket').eq('id', userId)
        if (error) {
          console.error('Fetch user basket error:', error.message)
        } else {
          const basket = data.length > 0 ? data[0].basket : []
          dispatch('updateItems', { basket })
          commit('basket/SET_BASKET_ITEMS_ID', basket, { root: true })
        }
      } catch (error) {
        console.error('Fetch user basket error:', error.message)
      }
    },
    async updateItems({ commit }, data) {
      commit('UPDATE_ITEMS_STATUS', data)
    }
  },
  getters: {
    getItems: (state) => state.items
  }
}
