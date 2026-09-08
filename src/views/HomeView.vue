<template>
  <main class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content container">
        <p class="hero-eyebrow caption animate-fade-up">New Collection — Autumn 2026</p>
        <h1 class="display-1 hero-title animate-fade-up" style="animation-delay: 80ms">
          Designed with<br />
          <em>intention.</em>
        </h1>
        <p class="hero-subtitle body-large animate-fade-up" style="animation-delay: 160ms">
          Essential pieces engineered for clarity. No excess. Only what matters.
        </p>
        <div class="hero-actions animate-fade-up" style="animation-delay: 240ms">
          <RouterLink to="/products" class="btn btn-primary btn-lg">
            Shop Collection
          </RouterLink>
          <RouterLink to="/products?category=featured" class="btn btn-secondary btn-lg">
            Our Story
          </RouterLink>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-image-grid">
          <div class="hig-main">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              alt="Hero fashion"
              class="hero-img"
            />
          </div>
          <div class="hig-secondary">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
              alt="Fashion detail"
              class="hero-img"
            />
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
              alt="Accessories"
              class="hero-img"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Strip -->
    <section class="stats-strip">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section categories-section">
      <div class="container">
        <div class="section-header">
          <p class="caption">Browse by</p>
          <h2 class="heading-1">Category</h2>
        </div>
        <div class="categories-grid">
          <RouterLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="category-card"
            @click="productStore.setCategory(cat.slug as any)"
          >
            <div class="cat-image-wrap">
              <img :src="cat.image" :alt="cat.name" class="cat-image" loading="lazy" />
              <div class="cat-overlay"></div>
            </div>
            <div class="cat-info">
              <h3 class="cat-name">{{ cat.name }}</h3>
              <span class="cat-count">{{ cat.count }} items</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-header">
          <p class="caption">Curated for you</p>
          <div class="section-header-row">
            <h2 class="heading-1">Featured Products</h2>
            <RouterLink to="/products" class="btn btn-ghost">
              View All <ArrowRight :size="16" />
            </RouterLink>
          </div>
        </div>
        <div class="grid-4">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Brand Value Section -->
    <section class="section values-section">
      <div class="container">
        <div class="values-grid">
          <div v-for="val in values" :key="val.title" class="value-card">
            <div class="value-icon">
              <component :is="val.icon" :size="22" />
            </div>
            <h3 class="value-title">{{ val.title }}</h3>
            <p class="value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, Leaf, Shield, Zap, Package } from '@lucide/vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()
const featuredProducts = productStore.featuredProducts.slice(0, 4)

const stats = [
  { value: '12K+', label: 'Happy Customers' },
  { value: '48h', label: 'Average Delivery' },
  { value: '30-day', label: 'Free Returns' },
  { value: '4.9★', label: 'Average Rating' },
]

const categories = [
  {
    slug: 'apparel',
    name: 'Apparel',
    count: 4,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80',
  },
  {
    slug: 'footwear',
    name: 'Footwear',
    count: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    count: 4,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  },
  {
    slug: 'electronics',
    name: 'Electronics',
    count: 2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  },
]

const values = [
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    desc: 'Every material is chosen with environmental responsibility in mind.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    desc: '2-year craftsmanship warranty on all products. No questions asked.',
  },
  {
    icon: Zap,
    title: 'Swift Delivery',
    desc: 'Same-day dispatch. Arrives within 48 hours anywhere in Indonesia.',
  },
  {
    icon: Package,
    title: 'Free Returns',
    desc: '30-day hassle-free returns and exchanges for any reason.',
  },
]
</script>

<style scoped>
/* Hero */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: var(--header-height);
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
  max-width: 600px;
}

.hero-eyebrow {
  margin-bottom: var(--space-4);
}

.hero-title {
  margin-bottom: var(--space-6);
}

.hero-title em {
  font-style: italic;
  color: var(--color-accent);
  font-family: var(--font-serif);
}

.hero-subtitle {
  max-width: 380px;
  margin-bottom: var(--space-10);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  overflow: hidden;
  background: var(--color-surface);
}

@media (max-width: 1024px) {
  .hero-visual {
    height: 60vw;
    max-height: 500px;
  }
}

.hero-image-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100%;
  gap: 2px;
  background: var(--color-bg);
}

.hig-main, .hig-secondary {
  overflow: hidden;
}

.hig-secondary {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.hero-image-grid:hover .hero-img {
  transform: scale(1.04);
}

/* Stats */
.stats-strip {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border-subtle);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: var(--space-8) 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  text-align: center;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-tight);
  color: var(--color-accent);
}

.stat-label {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

/* Section header */
.section-header {
  margin-bottom: var(--space-8);
}

.section-header .caption {
  margin-bottom: var(--space-2);
}

.section-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

/* Categories */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

@media (max-width: 1024px) {
  .categories-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .categories-grid { grid-template-columns: 1fr; }
}

.category-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  display: block;
}

.cat-image-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.cat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.category-card:hover .cat-image {
  transform: scale(1.08);
}

.cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.75) 0%, transparent 55%);
}

.cat-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-4);
}

.cat-name {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
}

.cat-count {
  font-size: var(--text-xs);
  color: rgba(240, 237, 232, 0.6);
  letter-spacing: var(--tracking-wide);
}

/* Values */
.values-section {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border-subtle);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
}

@media (max-width: 1024px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .values-grid { grid-template-columns: 1fr; }
}

.value-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-accent-muted);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: var(--radius-md);
  color: var(--color-accent);
}

.value-title {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
}

.value-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
</style>
