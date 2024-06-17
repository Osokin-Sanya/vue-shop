import { createApp } from 'vue'
import Vuex from 'vuex'
import itemsModule from './itemsModule'
import favoritesModule from './favoritesModule'
import filtersModule from './filtersModule'
import cartModule from './basketModule'
import authorizationModule from './authorizationModule'

const app = createApp({})
app.use(Vuex)
export default Vuex.createStore({
  modules: {
    items: itemsModule,
    favorites: favoritesModule,
    filters: filtersModule,
    basket: cartModule,
    authorization: authorizationModule
  }
})
