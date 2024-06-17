import supabase from '../supabaseClient'

export default {
  namespaced: true,
  state: {
    drawerOpen: false,
    basket: [],
    basketIds: []
  },
  mutations: {
    SET_BASKET(state, items) {
      state.basket = items
    },
    TOGGLE_DRAWER(state) {
      state.drawerOpen = !state.drawerOpen
    },
    REMOVE_CART_ITEM(state, itemId) {
      state.basket = state.basket.filter((basketItem) => basketItem.id !== itemId)
    },
    SET_BASKET_ITEMS_ID(state, basketItemsId) {
      state.basketIds = basketItemsId
    }
  },
  actions: {
    async fetchBasketItems({ commit, state }) {
      const basketIds = state.basketIds

      try {
        const { data, error } = await supabase.from('shopItems').select().in('id', basketIds)

        if (error) {
          console.error('Error retrieving basket:', error.message)
        } else {
          commit('SET_BASKET', data)
        }
      } catch (error) {
        console.error('Error retrieving basket:', error.message)
      }
    },
    async toggleDrawer({ commit }) {
      commit('TOGGLE_DRAWER')
    },
    async addToBasket({ state, commit, dispatch, rootState }, itemId) {
      const userId = rootState.authorization.user.id
      const setItemIds = state.basketIds
      if (!setItemIds.includes(itemId)) {
        setItemIds.push(itemId)
        try {
          const { data, error } = await supabase
            .from('users')
            .upsert({ id: userId, basket: setItemIds })
            .select()
          if (error) {
            console.error('Add to basket failed:', error.message)
          } else {
            commit('SET_BASKET_ITEMS_ID', setItemIds)
            dispatch('favorites/updateFavorite', null, { root: true })
            dispatch('items/updateItems', { basket: setItemIds }, { root: true })
            console.log('Item added to basket')
          }
        } catch (error) {
          console.error('Add to basket error:', error.message)
        }
      }
    },
    async removeToBasket({ state, commit, dispatch, rootState }, itemId) {
      const userId = rootState.authorization.user.id
      const basketItemsIds = state.basketIds
      const setItemIds = basketItemsIds.filter((id) => id !== itemId)

      try {
        const { data, error } = await supabase
          .from('users')
          .upsert({ id: userId, basket: setItemIds })

        if (error) {
          console.error('Remove from basket failed:', error.message)
        } else {
          commit('REMOVE_CART_ITEM', itemId)
          commit('SET_BASKET_ITEMS_ID', setItemIds)
          dispatch('items/updateItems', { basket: setItemIds }, { root: true })
          dispatch('favorites/updateFavorite', null, { root: true })
          console.log('Item removed from basket')
        }
      } catch (error) {
        console.error('Remove from basket error:', error.message)
      }
    }
  },
  getters: {
    getBasketItems: (state) => state.basket,
    getBasketIds: (state) => state.basketIds
  }
}
