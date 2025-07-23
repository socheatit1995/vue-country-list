import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const theme = ref('light')
  const isLoading = ref(false)
  const notifications = ref([])
  const user = ref(null)

  // Getters
  const isDarkTheme = computed(() => theme.value === 'dark')
  const hasNotifications = computed(() => notifications.value.length > 0)
  const isAuthenticated = computed(() => user.value !== null)

  // Actions
  function setTheme(newTheme) {
    theme.value = newTheme
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('vue-hybrid-theme', newTheme)
  }

  function toggleTheme() {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  function setLoading(loading) {
    isLoading.value = loading
  }

  function addNotification(notification) {
    const id = Date.now()
    notifications.value.push({
      id,
      message: notification.message || '',
      type: notification.type || 'info',
      duration: notification.duration || 3000,
      timestamp: new Date()
    })

    // Auto remove notification after duration
    if (notification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration)
    }
  }

  function removeNotification(id) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function clearNotifications() {
    notifications.value = []
  }

  function setUser(userData) {
    user.value = userData
  }

  function logout() {
    user.value = null
    addNotification({
      message: 'Successfully logged out',
      type: 'success'
    })
  }

  // Initialize theme from localStorage
  function initializeTheme() {
    const savedTheme = localStorage.getItem('vue-hybrid-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }

  return {
    // State
    theme,
    isLoading,
    notifications,
    user,
    
    // Getters
    isDarkTheme,
    hasNotifications,
    isAuthenticated,
    
    // Actions
    setTheme,
    toggleTheme,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications,
    setUser,
    logout,
    initializeTheme
  }
})