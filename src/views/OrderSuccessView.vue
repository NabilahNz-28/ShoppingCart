<template>
  <main class="success-view page-top">
    <div class="container">
      <div v-if="order" class="success-content animate-scale-in">
        <!-- Icon -->
        <div class="success-icon">
          <CheckCircle2 :size="48" />
        </div>

        <div class="success-text">
          <p class="caption">Order Confirmed</p>
          <h1 class="display-2">Thank you,<br />{{ order.shipping.firstName }}!</h1>
          <p class="body-large">
            Your order <strong class="order-id">{{ order.id }}</strong> has been placed
            successfully. You'll receive a confirmation email at
            <strong>{{ order.shipping.email }}</strong> shortly.
          </p>
        </div>

        <!-- Order details -->
        <div class="order-details">
          <div class="detail-card">
            <p class="detail-card-title">Shipping to</p>
            <p class="detail-card-value">
              {{ order.shipping.firstName }} {{ order.shipping.lastName }}
            </p>
            <p class="detail-card-sub">
              {{ order.shipping.address }}, {{ order.shipping.city }},
              {{ order.shipping.province }}
            </p>
          </div>
          <div class="detail-card">
            <p class="detail-card-title">Payment via</p>
            <p class="detail-card-value">{{ paymentLabel }}</p>
          </div>
          <div class="detail-card">
            <p class="detail-card-title">Order Total</p>
            <p class="detail-card-value accent">{{ formatPrice(order.total) }}</p>
          </div>
          <div class="detail-card">
            <p class="detail-card-title">Estimated Delivery</p>
            <p class="detail-card-value">{{ estimatedDelivery }}</p>
          </div>
        </div>

        <!-- Items summary -->
        <div class="order-items">
          <p class="section-sub-title">Items Ordered ({{ order.items.length }})</p>
          <div class="items-grid">
            <div
              v-for="item in order.items"
              :key="item.product.id"
              class="ordered-item"
            >
              <img
                :src="item.product.images[0]"
                :alt="item.product.name"
                class="ordered-item-img"
              />
              <div class="ordered-item-info">
                <p class="ordered-item-name">{{ item.product.name }}</p>
                <p class="ordered-item-meta">
                  Qty: {{ item.quantity }} ·
                  {{ formatPrice(item.product.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="success-actions">
          <RouterLink to="/products" class="btn btn-primary btn-lg">
            Continue Shopping
          </RouterLink>
          <RouterLink to="/" class="btn btn-secondary">
            Back to Home
          </RouterLink>
        </div>
      </div>

      <!-- Fallback: no order state -->
      <div v-else class="no-order animate-fade-up">
        <PackageSearch :size="64" />
        <h2 class="heading-2">No order found</h2>
        <RouterLink to="/products" class="btn btn-primary">Go Shopping</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircle2, PackageSearch } from '@lucide/vue'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice, formatDate } from '@/utils/format'

const cartStore = useCartStore()
const order = computed(() => cartStore.lastOrder)

const paymentMethodMap: Record<string, string> = {
  credit_card: 'Credit / Debit Card',
  bank_transfer: 'Bank Transfer',
  e_wallet: 'E-Wallet',
}

const paymentLabel = computed(() =>
  order.value ? paymentMethodMap[order.value.payment.method] ?? '' : '',
)

const estimatedDelivery = computed(() => {
  if (!order.value) return ''
  const d = new Date(order.value.createdAt)
  d.setDate(d.getDate() + 2)
  return formatDate(d)
})
</script>

<style scoped>
.success-view {
  min-height: 100vh;
  padding-bottom: var(--space-20);
}

.page-top {
  padding-top: calc(var(--header-height) + var(--space-8));
}

.success-content {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.success-icon {
  width: 88px;
  height: 88px;
  border-radius: var(--radius-full);
  background: var(--color-success-muted);
  border: 1px solid rgba(74, 222, 128, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-success);
}

.success-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.success-text .caption {
  color: var(--color-success);
}

.order-id {
  color: var(--color-accent);
  font-family: monospace;
  font-size: 0.95em;
}

/* Order details grid */
.order-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .order-details { grid-template-columns: 1fr; }
}

.detail-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.detail-card-title {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.detail-card-value {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
}

.detail-card-value.accent {
  color: var(--color-accent);
  font-size: var(--text-lg);
}

.detail-card-sub {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

/* Items */
.order-items {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.section-sub-title {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-4);
}

.items-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.ordered-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.ordered-item-img {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--color-surface-2);
  flex-shrink: 0;
}

.ordered-item-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

.ordered-item-meta {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

/* Actions */
.success-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* No order */
.no-order {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  color: var(--color-text-tertiary);
  text-align: center;
}
</style>
