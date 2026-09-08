<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          :class="['toast', `toast-${toast.type}`]"
          role="alert"
        >
          <component :is="iconMap[toast.type]" :size="16" class="toast-icon" />
          <p class="toast-message">{{ toast.message }}</p>
          <button
            class="toast-close"
            aria-label="Close"
            @click="toastStore.removeToast(toast.id)"
          >
            <X :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X, CheckCircle2, AlertCircle, Info } from '@lucide/vue'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-3);
  max-width: 360px;
  width: 100%;
}

@media (max-width: 480px) {
  .toast-container {
    bottom: var(--space-4);
    right: var(--space-4);
    left: var(--space-4);
    max-width: unset;
  }
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(8px);
}

.toast-success {
  border-left: 3px solid var(--color-success);
}

.toast-success .toast-icon {
  color: var(--color-success);
}

.toast-error {
  border-left: 3px solid var(--color-error);
}

.toast-error .toast-icon {
  color: var(--color-error);
}

.toast-info {
  border-left: 3px solid var(--color-info);
}

.toast-info .toast-icon {
  color: var(--color-info);
}

.toast-icon {
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
}

.toast-close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  transition: color var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: var(--radius-sm);
}

.toast-close:hover {
  color: var(--color-text-primary);
}

/* TransitionGroup */
.toast-enter-active {
  transition: all 0.3s var(--transition-spring);
}

.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
