<template>
  <main class="cart-view page-top">
    <div class="container">
      <h1 class="heading-1 page-title animate-fade-up">Your Cart</h1>

      <div v-if="!cartStore.isEmpty" class="cart-layout">
        <!-- Items -->
        <div class="cart-items">
          <CartItemRow
            v-for="item in cartStore.items"
            :key="item.product.id"
            :item="item"
          />

          <!-- Continue shopping -->
          <div class="cart-continue">
            <RouterLink to="/products" class="btn btn-ghost btn-sm">
              <ArrowLeft :size="16" />
              Continue Shopping
            </RouterLink>
          </div>
        </div>

        <!-- Summary sidebar -->
        <aside class="cart-summary animate-slide-right">
          <h2 class="heading-3">Order Summary</h2>

          <div class="summary-lines">
            <div class="summary-line">
              <span>Subtotal ({{ cartStore.itemCount }} items)</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="summary-line">
              <span>Shipping</span>
              <span :class="{ 'text-success': cartStore.shippingCost === 0 }">
                {{ cartStore.shippingCost === 0 ? 'Free' : formatPrice(cartStore.shippingCost) }}
              </span>
            </div>
            <div class="summary-line">
              <span>Tax (11%)</span>
              <span>{{ formatPrice(cartStore.tax) }}</span>
            </div>
            <div class="divider"></div>
            <div class="summary-line summary-total">
              <span>Total</span>
              <span>{{ formatPrice(cartStore.total) }}</span>
            </div>
          </div>

          <!-- Free shipping notice -->
          <div v-if="cartStore.subtotal < 2000000" class="free-shipping-notice">
            <Truck :size="14" />
            <p>
              Add {{ formatPrice(2000000 - cartStore.subtotal) }} more for
              <strong>free shipping</strong>
            </p>
          </div>

          <RouterLink to="/checkout" class="btn btn-primary btn-full btn-lg">
            Proceed to Checkout
          </RouterLink>

          <div class="summary-trust">
            <Lock :size="14" />
            <span>Secure SSL encrypted checkout</span>
          </div>
        </aside>
      </div>

      <!-- Empty cart -->
      <div v-else class="empty-cart animate-fade-up">
        <div class="empty-cart-icon">
          <ShoppingCart :size="48" />
        </div>
        <h2 class="heading-2">Your cart is empty</h2>
        <p class="body-large">Looks like you haven't added anything yet.</p>
        <RouterLink to="/products" class="btn btn-primary btn-lg">
          Start Shopping
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, ShoppingCart, Truck, Lock } from '@lucide/vue'
import CartItemRow from '@/components/ui/CartItemRow.vue'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/utils/format'

const cartStore = useCartStore()
</script>

<style scoped>
.cart-view {
  min-height: 100vh;
  padding-bottom: var(--space-20);
}

.page-top {
  padding-top: calc(var(--header-height) + var(--space-8));
}

.page-title {
  margin-bottom: var(--space-8);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-8);
  align-items: start;
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

/* Items */
.cart-items {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-5) var(--space-6);
}

.cart-continue {
  padding-top: var(--space-5);
}

/* Summary */
.cart-summary {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: sticky;
  top: calc(var(--header-height) + var(--space-4));
}

.summary-lines {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.summary-total {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  padding-top: var(--space-1);
}

.text-success {
  color: var(--color-success);
}

.free-shipping-notice {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--color-accent-muted);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  color: var(--color-accent);
}

.free-shipping-notice p {
  line-height: var(--leading-relaxed);
}

.summary-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

/* Empty */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--space-5);
  text-align: center;
}

.empty-cart-icon {
  width: 96px;
  height: 96px;
  border-radius: var(--radius-full);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
}

.empty-cart .body-large {
  margin-bottom: var(--space-2);
}
</style>
