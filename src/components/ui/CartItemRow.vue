<template>
  <div class="cart-item animate-fade-up">
    <RouterLink :to="`/products/${item.product.id}`" class="item-image-wrap">
      <img
        :src="item.product.images[0]"
        :alt="item.product.name"
        class="item-image"
        loading="lazy"
      />
    </RouterLink>

    <div class="item-info">
      <div class="item-header">
        <div>
          <p class="item-brand">{{ item.product.brand }}</p>
          <RouterLink :to="`/products/${item.product.id}`" class="item-name">
            {{ item.product.name }}
          </RouterLink>
        </div>
        <button
          class="btn btn-ghost btn-icon remove-btn"
          aria-label="Remove item"
          @click="cartStore.removeItem(item.product.id)"
        >
          <Trash2 :size="15" />
        </button>
      </div>

      <div class="item-footer">
        <!-- Quantity -->
        <div class="qty-control">
          <button
            class="qty-btn"
            aria-label="Decrease quantity"
            @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
          >
            <Minus :size="14" />
          </button>
          <span class="qty-value">{{ item.quantity }}</span>
          <button
            class="qty-btn"
            aria-label="Increase quantity"
            :disabled="item.quantity >= item.product.stock"
            @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
          >
            <Plus :size="14" />
          </button>
        </div>

        <!-- Line total -->
        <span class="item-total">
          {{ formatPrice(item.product.price * item.quantity) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Trash2, Minus, Plus } from '@lucide/vue'
import type { CartItem } from '@/types'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/utils/format'

defineProps<{ item: CartItem }>()

const cartStore = useCartStore()
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--color-border-subtle);
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image-wrap {
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface-2);
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.item-image-wrap:hover .item-image {
  transform: scale(1.05);
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-2);
}

.item-brand {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-1);
}

.item-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  transition: color var(--transition-fast);
}

.item-name:hover {
  color: var(--color-accent);
}

.remove-btn {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.remove-btn:hover {
  color: var(--color-error);
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-total {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
}
</style>
