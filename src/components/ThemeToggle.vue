<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :class="{ dark: isDarkTheme }"
    title="Toggle theme"
  >
    <span class="theme-icon">{{ isDarkTheme ? '☀️' : '🌙' }}</span>
    <span class="theme-text">{{ isDarkTheme ? 'Light' : 'Dark' }}</span>
  </button>
</template>

<script>
import { useAppStore } from '@/stores/app.js'
import { storeToRefs } from 'pinia'

export default {
  name: 'ThemeToggle',
  setup() {
    const appStore = useAppStore()
    const { isDarkTheme } = storeToRefs(appStore)
    
    const toggleTheme = () => {
      appStore.toggleTheme()
    }

    return {
      isDarkTheme,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--background-color);
  border: 2px solid var(--border-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
}

.theme-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.theme-toggle.dark {
  background: #2d3748;
  color: white;
  border-color: #4a5568;
}

.theme-toggle.dark:hover {
  border-color: var(--primary-color);
}

.theme-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(180deg);
}

.theme-text {
  font-weight: 500;
}

@media (max-width: 768px) {
  .theme-text {
    display: none;
  }
  
  .theme-toggle {
    padding: 0.5rem;
    min-width: 2.5rem;
    justify-content: center;
  }
}
</style>