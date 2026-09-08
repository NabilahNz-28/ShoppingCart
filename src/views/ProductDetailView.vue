<template>
  <main class="detail-view page-top">
    <div v-if="product" class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb animate-fade-up">
        <RouterLink to="/">Home</RouterLink>
        <ChevronRight :size="14" />
        <RouterLink to="/products">Shop</RouterLink>
        <ChevronRight :size="14" />
        <span>{{ product.name }}</span>
      </nav>

      <div class="detail-layout">
        <!-- Image Gallery -->
        <div class="gallery animate-fade-up">
          <div class="gallery-main">
            <img
              :src="product.images[activeImage]"
              :alt="product.name"
              class="gallery-main-img"
              @error="onImgError"
            />
            <div class="gallery-badges">
              <span v-if="product.isNew" class="badge badge-new">New</span>
              <span v-if="isOnSale" class="badge badge-sale">
                -{{ discountPct }}%
              </span>
            </div>
          </div>
          <div v-if="product.images.length > 1" class="gallery-thumbs">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              :class="['thumb-btn', { active: activeImage === i }]"
              @click="activeImage = i"
            >
              <img :src="img" :alt="`${product.name} view ${i + 1}`" class="thumb-img" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="detail-info animate-slide-right">
          <!-- Header -->
          <div class="info-header">
            <span class="caption">{{ product.brand }}</span>
            <h1 class="heading-1" style="margin: var(--space-2) 0;">{{ product.name }}</h1>
            <div class="info-rating">
              <div class="stars">
                <Star
                  v-for="i in 5"
                  :key="i"
                  :size="14"
                  :fill="i <= Math.round(product.rating) ? 'currentColor' : 'none'"
                />
              </div>
              <span class="rating-value">{{ product.rating }}</span>
              <span class="review-count">({{ product.reviewCount }} reviews)</span>
            </div>
          </div>

          <!-- Price -->
          <div class="info-price">
            <span class="price-lg">{{ formatPrice(product.price) }}</span>
            <span v-if="product.originalPrice" class="price-original-lg">
              {{ formatPrice(product.originalPrice) }}
            </span>
          </div>

          <div class="divider"></div>

          <!-- Description -->
          <p class="info-description">{{ product.description }}</p>

          <!-- Details -->
          <div class="info-details">
            <p class="filter-label" style="margin-bottom: var(--space-3)">Product Details</p>
            <ul class="details-list">
              <li v-for="detail in product.details" :key="detail">
                <Check :size="14" />
                {{ detail }}
              </li>
            </ul>
          </div>

          <div class="divider"></div>

          <!-- Add to cart -->
          <div class="add-to-cart-section">
            <!-- Quantity -->
            <div class="qty-row">
              <label class="form-label">Quantity</label>
              <div class="qty-control">
                <button
                  class="qty-btn"
                  :disabled="qty <= 1"
                  @click="qty = Math.max(1, qty - 1)"
                >
                  <Minus :size="14" />
                </button>
                <span class="qty-value">{{ qty }}</span>
                <button
                  class="qty-btn"
                  :disabled="qty >= product.stock"
                  @click="qty = Math.min(product.stock, qty + 1)"
                >
                  <Plus :size="14" />
                </button>
              </div>
              <span class="stock-info">{{ product.stock }} in stock</span>
            </div>

            <button
              class="btn btn-primary btn-full btn-lg"
              :disabled="product.stock === 0"
              @click="handleAddToCart"
            >
              <ShoppingCart :size="18" />
              {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>

            <RouterLink to="/cart" v-if="inCart" class="btn btn-secondary btn-full">
              View Cart ({{ cartStore.getItemQuantity(product.id) }})
            </RouterLink>
          </div>

          <!-- Trust badges -->
          <div class="trust-badges">
            <div class="trust-item">
              <Shield :size="14" />
              <span>2-year warranty</span>
            </div>
            <div class="trust-item">
              <Package :size="14" />
              <span>Free returns</span>
            </div>
            <div class="trust-item">
              <Zap :size="14" />
              <span>48h delivery</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <section v-if="relatedProducts.length > 0" class="related-section">
        <div class="section-header">
          <p class="caption">You may also like</p>
          <h2 class="heading-2">Related Products</h2>
        </div>
        <div class="grid-4">
          <ProductCard
            v-for="p in relatedProducts"
            :key="p.id"
            :product="p"
          />
        </div>
      </section>
    </div>

    <!-- Not found -->
    <div v-else class="not-found container">
      <PackageSearch :size="64" />
      <h2 class="heading-2">Product not found</h2>
      <RouterLink to="/products" class="btn btn-primary">Back to Shop</RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  ChevronRight,
  Star,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Shield,
  Package,
  Zap,
  PackageSearch,
} from '@lucide/vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useToastStore } from '@/stores/toastStore'
import { formatPrice } from '@/utils/format'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const toastStore = useToastStore()

const id = Number(route.params.id)
const product = computed(() => productStore.getProductById(id))
const activeImage = ref(0)
const qty = ref(1)

const isOnSale = computed(
  () =>
    product.value?.originalPrice && product.value.originalPrice > product.value.price,
)

const discountPct = computed(() => {
  if (!product.value?.originalPrice) return 0
  return Math.round(
    ((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100,
  )
})

const inCart = computed(() => !!product.value && cartStore.isInCart(product.value.id))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter((p) => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 4)
})

const handleAddToCart = () => {
  if (!product.value) return
  cartStore.addItem(product.value, qty.value)
  toastStore.addToast(`${product.value.name} added to cart`, 'success')
}

const onImgError = (e: Event) => {
  ;(e.target as HTMLImageElement).src =
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
}
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
  padding-bottom: var(--space-20);
}

.page-top {
  padding-top: calc(var(--header-height) + var(--space-6));
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  letter-spacing: var(--tracking-wide);
}

.breadcrumb a {
  transition: color var(--transition-fast);
}

.breadcrumb a:hover {
  color: var(--color-text-secondary);
}

/* Layout */
.detail-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-20);
}

@media (max-width: 1024px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

/* Gallery */
.gallery {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  position: sticky;
  top: calc(var(--header-height) + var(--space-4));
}

@media (max-width: 1024px) {
  .gallery { position: static; }
}

.gallery-main {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface);
}

.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-main:hover .gallery-main-img {
  transform: scale(1.03);
}

.gallery-badges {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  display: flex;
  gap: var(--space-2);
}

.gallery-thumbs {
  display: flex;
  gap: var(--space-2);
}

.thumb-btn {
  width: 70px;
  height: 70px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color var(--transition-fast);
  background: none;
  padding: 0;
}

.thumb-btn.active {
  border-color: var(--color-accent);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.info-header { display: flex; flex-direction: column; gap: var(--space-1); }

.info-rating {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.stars {
  display: flex;
  color: var(--color-accent);
}

.rating-value {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
}

.review-count {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

.info-price {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.price-original-lg {
  font-size: var(--text-lg);
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}

.info-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.filter-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.details-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.details-list li svg {
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.add-to-cart-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.qty-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.stock-info {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-left: auto;
}

.trust-badges {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface-2);
  border-radius: var(--radius-md);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  flex: 1;
  justify-content: center;
}

.trust-item svg {
  color: var(--color-accent);
  flex-shrink: 0;
}

/* Related */
.related-section {
  margin-top: var(--space-16);
}

.section-header {
  margin-bottom: var(--space-8);
}

/* Not found */
.not-found {
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
