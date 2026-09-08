<template>
  <article class="product-card" @click="navigate">
    <!-- Image -->
    <div class="card-image-wrap">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="card-image"
        loading="lazy"
        @error="onImgError"
      />
      <!-- Badges -->
      <div class="card-badges">
        <span v-if="product.isNew" class="badge badge-new">New</span>
        <span v-if="isOnSale" class="badge badge-sale">Sale</span>
      </div>
      <!-- Quick add overlay -->
      <div class="card-overlay">
        <button
          class="btn btn-primary btn-sm overlay-btn"
          @click.stop="handleAddToCart"
          :disabled="product.stock === 0"
        >
          <ShoppingCart :size="14" />
          {{ inCart ? 'In Cart' : 'Quick Add' }}
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="card-body">
      <div class="card-meta">
        <span class="card-brand">{{ product.brand }}</span>
        <div class="card-rating">
          <Star :size="11" fill="currentColor" />
          <span>{{ product.rating }}</span>
        </div>
      </div>
      <h3 class="card-name">{{ product.name }}</h3>
      <div class="card-price">
        <span class="price">{{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice" class="price-original">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, Star } from '@lucide/vue'
import type { Product } from '@/types'
import { useCartStore } from '@/stores/cartStore'
import { useToastStore } from '@/stores/toastStore'
import { formatPrice } from '@/utils/format'

const props = defineProps<{ product: Product }>()

const router = useRouter()
const cartStore = useCartStore()
const toastStore = useToastStore()

const isOnSale = computed(
  () => props.product.originalPrice && props.product.originalPrice > props.product.price,
)
const inCart = computed(() => cartStore.isInCart(props.product.id))

const navigate = () => router.push(`/products/${props.product.id}`)

const handleAddToCart = () => {
  cartStore.addItem(props.product, 1)
  toastStore.addToast(`${props.product.name} added to cart`, 'success')
}

const onImgError = (e: Event) => {
  ;(e.target as HTMLImageElement).src =
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'
}
</script>

<style scoped>
.product-card {
  cursor: pointer;
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    border-color var(--transition-base),
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.product-card:hover {
  border-color: var(--color-border);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Image */
.card-image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-surface-2);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .card-image {
  transform: scale(1.06);
}

/* Badges */
.card-badges {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

/* Overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.5);
  display: flex;
  align-items: flex-end;
  padding: var(--space-4);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.product-card:hover .card-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 100%;
  backdrop-filter: blur(4px);
}

/* Body */
.card-body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-brand {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-xs);
  color: var(--color-accent);
}

.card-name {
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-price {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.card-price .price {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
}

.price-original {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}
</style>
