import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'

// Import views
import Home from './views/Home.vue'
import About from './views/About.vue'

// Import stores
import { useAppStore } from './stores/app.js'

// Routes configuration
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create pinia store
const pinia = createPinia()

// Create and mount app
const app = createApp(App)

app.use(router)
app.use(pinia)

// Initialize app after mounting
app.mount('#app')

// Initialize app store
const appStore = useAppStore()
appStore.initializeTheme()

// PWA update prompt
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
