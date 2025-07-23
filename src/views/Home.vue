<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Vue Hybrid App</span>
        </h1>
        <p class="hero-subtitle">
          Lightweight, Modern, and Progressive Web App
        </p>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">{{ appStats.components }}</div>
            <div class="stat-label">Components</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ appStats.features }}</div>
            <div class="stat-label">Features</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ appStats.performance }}%</div>
            <div class="stat-label">Performance</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2 class="section-title">Key Features</h2>
      <div class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          class="feature-card"
          @click="toggleFeature(feature.id)"
          :class="{ active: feature.active }"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="feature-status" v-if="feature.active">✨ Active</div>
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="demo">
      <h2 class="section-title">Interactive Demo</h2>
      <div class="demo-container">
        <div class="demo-controls">
          <button 
            v-for="theme in themes" 
            :key="theme.name"
            @click="currentTheme = theme.name"
            :class="{ active: currentTheme === theme.name }"
            class="theme-btn"
          >
            {{ theme.icon }} {{ theme.name }}
          </button>
        </div>
        <div class="demo-preview" :class="`theme-${currentTheme}`">
          <div class="demo-content">
            <h3>Current Theme: {{ currentTheme }}</h3>
            <p>This is a live preview of the {{ currentTheme }} theme.</p>
            <div class="demo-elements">
              <button class="demo-button" @click="showNotification('success')">Success</button>
              <button class="demo-button" @click="showNotification('error')">Error</button>
              <button class="demo-button" @click="showNotification('warning')">Warning</button>
              <button class="demo-button" @click="showNotification('info')">Info</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useAppStore } from '@/stores/app.js'

export default {
  name: 'Home',
  setup() {
    const appStore = useAppStore()
    const appStats = reactive({
      components: 0,
      features: 0,
      performance: 0
    })

    const currentTheme = ref('light')

    const themes = [
      { name: 'light', icon: '☀️' },
      { name: 'dark', icon: '🌙' },
      { name: 'colorful', icon: '🌈' }
    ]

    const features = reactive([
      {
        id: 1,
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Built with Vite for optimal performance and hot reload',
        active: false
      },
      {
        id: 2,
        icon: '📱',
        title: 'Mobile Ready',
        description: 'Responsive design that works perfectly on all devices',
        active: false
      },
      {
        id: 3,
        icon: '🔧',
        title: 'Modern Stack',
        description: 'Vue 3 + Composition API + Pinia + Vue Router',
        active: false
      },
      {
        id: 4,
        icon: '🚀',
        title: 'PWA Support',
        description: 'Progressive Web App with offline capabilities',
        active: false
      }
    ])

    const toggleFeature = (id) => {
      const feature = features.find(f => f.id === id)
      if (feature) {
        feature.active = !feature.active
      }
    }

    const animateStats = () => {
      const targets = { components: 8, features: 12, performance: 95 }
      
      Object.keys(targets).forEach(key => {
        let current = 0
        const target = targets[key]
        const increment = target / 50
        
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            appStats[key] = target
            clearInterval(timer)
          } else {
            appStats[key] = Math.floor(current)
          }
        }, 30)
      })
    }

    const showNotification = (type) => {
      const messages = {
        success: 'Operation completed successfully! 🎉',
        error: 'Something went wrong. Please try again.',
        warning: 'This is a warning message.',
        info: 'Here is some useful information.'
      }
      
      appStore.addNotification({
        message: messages[type],
        type: type,
        duration: 3000
      })
    }

    onMounted(() => {
      animateStats()
    })

    return {
      appStats,
      features,
      currentTheme,
      themes,
      toggleFeature,
      showNotification
    }
  }
}
</script>

<style scoped>
.home {
  padding: 0;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin: -2rem -1rem 3rem -1rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(45deg, #42b883, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Features Section */
.features {
  margin: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--secondary-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: var(--shadow);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-card.active {
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
}

.feature-card.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #42b883, #35495e);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-description {
  opacity: 0.8;
  line-height: 1.6;
}

.feature-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* Demo Section */
.demo {
  margin: 4rem 0;
  padding: 2rem;
  background: var(--background-color);
  border-radius: 16px;
}

.demo-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.theme-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--border-color);
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.theme-btn:hover,
.theme-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.demo-preview {
  padding: 2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.theme-light {
  background: white;
  color: #333;
}

.theme-dark {
  background: #2d3748;
  color: white;
}

.theme-colorful {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.demo-content {
  text-align: center;
}

.demo-elements {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.demo-button {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.demo-card {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .demo {
    padding: 1rem;
  }
}
</style>