<template>
  <div class="notification-system">
    <transition-group name="notification" tag="div" class="notification-container">
      <div 
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', `notification-${notification.type}`]"
        @click="removeNotification(notification.id)"
      >
        <div class="notification-content">
          <span class="notification-icon">{{ getIcon(notification.type) }}</span>
          <span class="notification-message">{{ notification.message }}</span>
        </div>
        <button class="notification-close" @click.stop="removeNotification(notification.id)">
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { useAppStore } from '@/stores/app.js'
import { storeToRefs } from 'pinia'

export default {
  name: 'NotificationSystem',
  setup() {
    const appStore = useAppStore()
    const { notifications } = storeToRefs(appStore)
    
    const removeNotification = (id) => {
      appStore.removeNotification(id)
    }
    
    const getIcon = (type) => {
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      }
      return icons[type] || icons.info
    }

    return {
      notifications,
      removeNotification,
      getIcon
    }
  }
}
</script>

<style scoped>
.notification-system {
  position: fixed;
  top: 80px;
  right: 1rem;
  z-index: 1000;
  pointer-events: none;
}

.notification-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  pointer-events: all;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 400px;
  word-wrap: break-word;
}

.notification:hover {
  transform: translateX(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.notification-success {
  border-left-color: #10b981;
  background: #f0fdf4;
}

.notification-error {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.notification-warning {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.notification-info {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.notification-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.notification-message {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #374151;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.notification-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #374151;
}

/* Transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* Dark theme support */
[data-theme="dark"] .notification {
  background: #374151;
  color: #e5e7eb;
}

[data-theme="dark"] .notification-message {
  color: #e5e7eb;
}

[data-theme="dark"] .notification-success {
  background: #064e3b;
}

[data-theme="dark"] .notification-error {
  background: #7f1d1d;
}

[data-theme="dark"] .notification-warning {
  background: #78350f;
}

[data-theme="dark"] .notification-info {
  background: #1e3a8a;
}

/* Responsive */
@media (max-width: 768px) {
  .notification-system {
    left: 1rem;
    right: 1rem;
    top: 70px;
  }
  
  .notification-container {
    max-width: none;
  }
  
  .notification {
    max-width: none;
  }
}
</style>