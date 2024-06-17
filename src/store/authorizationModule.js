import supabase from '../supabaseClient'

export default {
  namespaced: true,
  openLoginMenu: false,
  state: {
    user: null,
    response: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_RESPONSE(state, response) {
      state.response = response
    },

    CLEAR_AUTH(state) {
      state.user = null
    },
    TOGGLE_MENU(state) {
      state.openLoginMenu = !state.openLoginMenu
    }
  },
  actions: {
    login({ commit }, { user, token }) {
      commit('SET_USER', user)
    },
    logout({ commit }) {
      commit('CLEAR_AUTH')
    },

    async signUp({ commit }, userData) {
      const [email, password, name] = userData
      const data = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name
          }
        }
      })
      commit('SET_RESPONSE', data)
    },
    async logIn({ commit, dispatch }, data) {
      const [email, password] = data

      try {
        const data = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        })
        dispatch('login', { user: data.data.user, token: data.data.access_token })
        if (error) {
          console.error('Login failed:', error.message)
          return
        }
        console.log('User logged in:')
      } catch (error) {
        console.error('Login error:', error.message)
      }
    },
    async Logout({ commit, dispatch }, data) {
      const { error } = await supabase.auth.signOut()
      commit('TOGGLE_MENU')
      commit('CLEAR_AUTH')
    },

    async initializeAuth({ commit }) {
      const token = localStorage.getItem('sb-jlfspvmmitgyiuzekkas-auth-token')
      const user = JSON.parse(token)
      if (user) {
        commit('SET_USER', user.user)
      }
    },

    toggleLoginMenu({ commit }) {
      commit('TOGGLE_MENU')
    }
  },
  getters: {
    getUser: (state) => state.user,
    getResponse: (state) => state.response
  }
}
