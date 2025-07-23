<template>
  <div class="about">
    <!-- Header Section -->
    <section class="about-header">
      <h1 class="page-title">About Vue Hybrid App</h1>
      <p class="page-subtitle">
        A modern, lightweight hybrid application built with cutting-edge technologies
      </p>
    </section>

    <!-- Technology Stack -->
    <section class="tech-stack">
      <h2 class="section-title">Technology Stack</h2>
      <div class="tech-grid">
        <div 
          v-for="tech in technologies" 
          :key="tech.name"
          class="tech-card"
          @mouseenter="playAnimation(tech.name)"
        >
          <div class="tech-icon" :class="{ animated: tech.animated }">
            {{ tech.icon }}
          </div>
          <h3 class="tech-name">{{ tech.name }}</h3>
          <p class="tech-description">{{ tech.description }}</p>
          <div class="tech-version">{{ tech.version }}</div>
        </div>
      </div>
    </section>

    <!-- App Info -->
    <section class="app-info">
      <div class="info-grid">
        <div class="info-card">
          <h3>🎯 Purpose</h3>
          <p>
            This hybrid Vue.js application demonstrates modern web development practices
            with a focus on performance, user experience, and maintainability.
          </p>
        </div>
        <div class="info-card">
          <h3>⚡ Performance</h3>
          <p>
            Built with Vite for lightning-fast development and optimized builds.
            Features code splitting, lazy loading, and PWA capabilities.
          </p>
        </div>
        <div class="info-card">
          <h3>📱 Responsive</h3>
          <p>
            Fully responsive design that works seamlessly across all devices,
            from mobile phones to desktop computers.
          </p>
        </div>
        <div class="info-card">
          <h3>🔧 Maintainable</h3>
          <p>
            Clean architecture with Vue 3 Composition API, TypeScript support,
            and modular component structure.
          </p>
        </div>
      </div>
    </section>

    <!-- Development Timeline -->
    <section class="timeline">
      <h2 class="section-title">Development Features</h2>
      <div class="timeline-container">
        <div 
          v-for="(milestone, index) in milestones" 
          :key="milestone.id"
          class="timeline-item"
          :class="{ completed: milestone.completed }"
        >
          <div class="timeline-marker">
            <span v-if="milestone.completed">✅</span>
            <span v-else>⏳</span>
          </div>
          <div class="timeline-content">
            <h4>{{ milestone.title }}</h4>
            <p>{{ milestone.description }}</p>
            <small class="timeline-date">{{ milestone.date }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact/Links Section -->
    <section class="contact">
      <h2 class="section-title">Get Started</h2>
      <div class="contact-content">
        <p>Ready to build your own Vue hybrid app? Here are some resources:</p>
        <div class="links-grid">
          <a href="https://vuejs.org/" target="_blank" class="link-card">
            <div class="link-icon">📚</div>
            <div class="link-content">
              <h4>Vue.js Documentation</h4>
              <p>Official Vue.js documentation and guides</p>
            </div>
          </a>
          <a href="https://vitejs.dev/" target="_blank" class="link-card">
            <div class="link-icon">⚡</div>
            <div class="link-content">
              <h4>Vite Documentation</h4>
              <p>Next generation frontend tooling</p>
            </div>
          </a>
          <a href="https://pinia.vuejs.org/" target="_blank" class="link-card">
            <div class="link-icon">🍍</div>
            <div class="link-content">
              <h4>Pinia Store</h4>
              <p>The Vue Store that you will enjoy using</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'About',
  setup() {
    const technologies = reactive([
      {
        name: 'Vue 3',
        icon: '💚',
        description: 'Progressive JavaScript framework with Composition API',
        version: 'v3.4.21',
        animated: false
      },
      {
        name: 'Vite',
        icon: '⚡',
        description: 'Next generation frontend build tool',
        version: 'v5.1.6',
        animated: false
      },
      {
        name: 'Vue Router',
        icon: '🛣️',
        description: 'Official router for Vue.js applications',
        version: 'v4.2.5',
        animated: false
      },
      {
        name: 'Pinia',
        icon: '🍍',
        description: 'Intuitive state management for Vue',
        version: 'v2.1.7',
        animated: false
      },
      {
        name: 'PWA',
        icon: '📱',
        description: 'Progressive Web App capabilities',
        version: 'Latest',
        animated: false
      },
      {
        name: 'Modern CSS',
        icon: '🎨',
        description: 'CSS Grid, Flexbox, and custom properties',
        version: 'CSS3+',
        animated: false
      }
    ])

    const milestones = [
      {
        id: 1,
        title: 'Project Setup',
        description: 'Initial Vue 3 + Vite project configuration',
        date: 'Day 1',
        completed: true
      },
      {
        id: 2,
        title: 'Router Integration',
        description: 'Vue Router setup with multiple views',
        date: 'Day 1',
        completed: true
      },
      {
        id: 3,
        title: 'State Management',
        description: 'Pinia store integration for global state',
        date: 'Day 1',
        completed: true
      },
      {
        id: 4,
        title: 'PWA Features',
        description: 'Service worker and manifest configuration',
        date: 'Day 1',
        completed: true
      },
      {
        id: 5,
        title: 'Responsive Design',
        description: 'Mobile-first responsive layout implementation',
        date: 'Day 1',
        completed: true
      },
      {
        id: 6,
        title: 'Performance Optimization',
        description: 'Code splitting and lazy loading',
        date: 'Ongoing',
        completed: false
      }
    ]

    const playAnimation = (techName) => {
      const tech = technologies.find(t => t.name === techName)
      if (tech) {
        tech.animated = true
        setTimeout(() => {
          tech.animated = false
        }, 600)
      }
    }

    return {
      technologies,
      milestones,
      playAnimation
    }
  }
}
</script>

<style scoped>
.about {
  padding: 0;
}

/* Header Section */
.about-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
  font-weight: 800;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Technology Stack */
.tech-stack {
  margin: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--secondary-color);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tech-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.tech-icon.animated {
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.tech-name {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
  font-weight: 600;
}

.tech-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tech-version {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: inline-block;
  font-weight: 500;
}

/* App Info */
.app-info {
  margin: 4rem 0;
  padding: 3rem 0;
  background: var(--background-color);
  border-radius: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.info-card h3 {
  margin-bottom: 1rem;
  color: var(--secondary-color);
  font-size: 1.2rem;
}

.info-card p {
  color: #666;
  line-height: 1.6;
}

/* Timeline */
.timeline {
  margin: 4rem 0;
}

.timeline-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
}

.timeline-item {
  position: relative;
  padding-left: 5rem;
  margin-bottom: 3rem;
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 4rem;
  height: 4rem;
  background: white;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.timeline-item.completed .timeline-marker {
  border-color: var(--primary-color);
  background: var(--primary-color);
}

.timeline-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.timeline-content h4 {
  margin-bottom: 1rem;
  color: var(--secondary-color);
  font-size: 1.2rem;
}

.timeline-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.timeline-date {
  color: var(--primary-color);
  font-weight: 500;
}

/* Contact Section */
.contact {
  margin: 4rem 0;
  text-align: center;
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
}

.contact-content > p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.link-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  color: inherit;
  text-decoration: none;
}

.link-icon {
  font-size: 2rem;
  margin-right: 1.5rem;
}

.link-content {
  text-align: left;
}

.link-content h4 {
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
}

.link-content p {
  color: #666;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .tech-grid,
  .info-grid,
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    padding: 0 1rem;
  }
  
  .timeline-container::before {
    left: 1.5rem;
  }
  
  .timeline-item {
    padding-left: 4rem;
  }
  
  .timeline-marker {
    width: 3rem;
    height: 3rem;
    font-size: 1.2rem;
  }
  
  .link-card {
    flex-direction: column;
    text-align: center;
  }
  
  .link-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>