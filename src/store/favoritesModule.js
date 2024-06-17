import supabase from '../supabaseClient'

export default {
  namespaced: true,
  state: {
    favoriteItemsIds: [],
    favoriteItems: []
  },
  mutations: {
    SET_FAVORITE_ITEMS_ID(state, favoriteItemsId) {
      state.favoriteItemsIds = favoriteItemsId
    },
    SET_FAVORITE_ITEMS(state, favoriteItems) {
      state.favoriteItems = favoriteItems
    },
    REMOVE_FAVORITE_ITEM(state, itemId) {
      state.favoriteItems = state.favoriteItems.filter((favoriteItem) => favoriteItem.id !== itemId)
    }
  },
  actions: {
    async fetchFavoriteItems({ commit, state, rootState }) {
      const favoriteIds = state.favoriteItemsIds

      try {
        const { data, error } = await supabase.from('shopItems').select().in('id', favoriteIds)

        if (error) {
          console.error('Error retrieving favorites:', error.message)
        } else {
          const items = data.map((item) => ({
            ...item,
            isFavorite: true,
            isAdded: rootState.basket.basketIds.some((basketItem) => basketItem === item.id)
          }))

          commit('SET_FAVORITE_ITEMS', items)
        }
      } catch (error) {
        console.error('Error retrieving favorites:', error.message)
      }
    },
    async addToFavorite({ state, commit, dispatch, rootState }, itemId) {
      const userId = rootState.authorization.user.id
      let setItemIds = state.favoriteItemsIds

      if (!setItemIds.includes(itemId)) {
        setItemIds.push(itemId)

        try {
          const { data, error } = await supabase
            .from('users')
            .upsert({ id: userId, favorites: setItemIds })
            .select()

          if (error) {
            console.error('Error adding to favorites:', error.message)
          } else {
            dispatch('items/updateItems', { favorites: setItemIds }, { root: true })
            console.log('Item added to favorites')
          }
        } catch (error) {
          console.error('Error adding to favorites:', error.message)
        }
      }
    },
    async removeFromFavorite({ state, commit, dispatch, rootState }, itemId) {
      const userId = rootState.authorization.user.id
      const favoriteItemsIds = state.favoriteItemsIds || []
      const setItemIds = favoriteItemsIds.filter((id) => id !== itemId)

      try {
        const { data, error } = await supabase
          .from('users')
          .upsert({ id: userId, favorites: setItemIds })

        if (error) {
          console.error('Error when deleting from favorites:', error.message)
        } else {
          commit('REMOVE_FAVORITE_ITEM', itemId)
          commit('SET_FAVORITE_ITEMS_ID', setItemIds)
          dispatch('items/updateItems', { favorites: setItemIds }, { root: true })
        }
      } catch (error) {
        console.error('Error when deleting from favorites:', error.message)
      }
    },
    async updateFavorite({ state, commit, dispatch, rootState }) {
      const updatedItems = state.favoriteItems.map((item) => {
        const isAdded = rootState.basket.basketIds.includes(item.id)
        return {
          ...item,
          isAdded: isAdded
        }
      })

      commit('SET_FAVORITE_ITEMS', updatedItems)
    }
  },
  getters: {
    getFavoriteItems: (state) => state.favoriteItems
  }
}
