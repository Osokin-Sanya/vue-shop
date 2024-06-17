import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import store from './store/store'
import './assets/main.css'

const routes = [
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/', name: 'home', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

store.dispatch('authorization/initializeAuth').then(() => {
  app.use(router)
  app.use(autoAnimatePlugin)
  app.use(store)
  app.mount('#app')
})
