<template>
  <div id="app">
    <!-- Navigation Header -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          🚀 Vue Hybrid
        </router-link>
        <div class="nav-menu">
          <router-link to="/" class="nav-link" active-class="active">
            Home
          </router-link>
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
          <ThemeToggle />
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 Vue Hybrid App - Lightweight & Modern</p>
    </footer>

    <!-- Notification System -->
    <NotificationSystem />
  </div>
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue'
import NotificationSystem from './components/NotificationSystem.vue'

export default {
  name: 'App',
  components: {
    ThemeToggle,
    NotificationSystem
  }
}
</script>

<style scoped>
/* Modern CSS Variables */
:root {
  --primary-color: #42b883;
  --secondary-color: #35495e;
  --background-color: #f8f9fa;
  --text-color: #2c3e50;
  --border-color: #e9ecef;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* Dark Theme */
[data-theme="dark"] {
  --primary-color: #42b883;
  --secondary-color: #e2e8f0;
  --background-color: #1a202c;
  --text-color: #e2e8f0;
  --border-color: #4a5568;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
}

/* Navigation Styles */
.navbar {
  background: white;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: var(--primary-color);
  transition: transform 0.2s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  background-color: var(--primary-color);
  color: white;
}

/* Main Content */
.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

/* Footer */
.footer {
  background: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .main-content {
    padding: 1rem;
  }
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}
</style>