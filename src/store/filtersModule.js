import supabase from '../supabaseClient'

export default {
  namespaced: true,
  state: {
    filters: {
      sortBy: '',
      searchQuery: ''
    }
  },
  mutations: {
    SET_FILTERS(state, filters) {
      state.filters = { ...state.filters, ...filters }
    }
  },
  actions: {
    async updateFilters({ commit, dispatch }, filters) {
      let query = supabase.from('shopItems').select('*')

      if (filters.sortBy === 'name') {
        query = query.order('title', { ascending: true })
      } else {
        query = query.order('price', { ascending: filters.sortBy === '-price' })
      }
      query = query.ilike('title', `%${filters.searchQuery}%`)

      const { data, error } = await query

      commit('items/SET_ITEMS', data, { root: true })
      dispatch('items/fetchFavoriteIds', data, { root: true })
      dispatch('items/fetchBasketIds', data, { root: true })
    }
  }
}
