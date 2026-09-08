<template>
  <main class="products-view page-top">
    <div class="container">
      <div class="products-layout">
        <!-- Sidebar -->
        <aside class="filter-sidebar" :class="{ open: sidebarOpen }">
          <div class="sidebar-header">
            <h2 class="heading-3">Filters</h2>
            <button class="btn btn-ghost btn-icon show-mobile-only" @click="sidebarOpen = false">
              <X :size="18" />
            </button>
          </div>

          <!-- Category -->
          <div class="filter-group">
            <p class="filter-label">Category</p>
            <div class="filter-options">
              <button
                v-for="cat in categoryOptions"
                :key="cat.value"
                :class="['filter-chip', { active: productStore.filters.category === cat.value }]"
                @click="productStore.setCategory(cat.value as any)"
              >
                {{ cat.label }}
              </button>
            </div>
          </div>

          <!-- Price Range -->
          <div class="filter-group">
            <p class="filter-label">Price Range</p>
            <div class="price-inputs">
              <div class="form-group">
                <label class="form-label" for="price-min">Min (IDR)</label>
                <input
                  id="price-min"
                  v-model.number="localPriceMin"
                  type="number"
                  class="form-input"
                  min="0"
                  step="100000"
                  @change="applyPrice"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="price-max">Max (IDR)</label>
                <input
                  id="price-max"
                  v-model.number="localPriceMax"
                  type="number"
                  class="form-input"
                  min="0"
                  step="100000"
                  @change="applyPrice"
                />
              </div>
            </div>
          </div>

          <!-- Reset -->
          <button class="btn btn-secondary btn-full btn-sm" @click="resetFilters">
            Reset Filters
          </button>
        </aside>

        <!-- Overlay (mobile) -->
        <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />

        <!-- Main content -->
        <div class="products-main">
          <!-- Toolbar -->
          <div class="products-toolbar">
            <div class="toolbar-left">
              <button class="btn btn-secondary btn-icon show-mobile-only" @click="sidebarOpen = true">
                <SlidersHorizontal :size="16" />
              </button>
              <p class="results-count">
                <span class="count-num">{{ productStore.filteredProducts.length }}</span>
                products
              </p>
            </div>
            <div class="toolbar-right">
              <!-- Search -->
              <div class="toolbar-search hide-mobile">
                <Search :size="15" class="ts-icon" />
                <input
                  v-model="searchQuery"
                  type="search"
                  placeholder="Search..."
                  class="ts-input"
                  @input="productStore.setSearch(searchQuery)"
                />
              </div>
              <!-- Sort -->
              <select
                v-model="sortValue"
                class="form-input form-select sort-select"
                @change="productStore.setSort(sortValue as any)"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>

          <!-- Grid -->
          <div v-if="productStore.filteredProducts.length > 0" class="grid-4">
            <ProductCard
              v-for="product in productStore.filteredProducts"
              :key="product.id"
              :product="product"
              class="animate-fade-up"
            />
          </div>

          <!-- Empty state -->
          <div v-else class="empty-state">
            <PackageSearch :size="48" />
            <p class="empty-title">No products found</p>
            <p class="empty-sub">Try adjusting your filters or search query.</p>
            <button class="btn btn-secondary" @click="resetFilters">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search, SlidersHorizontal, X, PackageSearch } from '@lucide/vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()
const route = useRoute()

const sidebarOpen = ref(false)
const searchQuery = ref(productStore.filters.search)
const sortValue = ref(productStore.filters.sort)
const localPriceMin = ref(productStore.filters.priceMin)
const localPriceMax = ref(productStore.filters.priceMax)

onMounted(() => {
  const cat = route.query.category as string
  if (cat && cat !== 'featured') {
    productStore.setCategory(cat as any)
  }
})

const applyPrice = () => {
  productStore.setPriceRange(localPriceMin.value, localPriceMax.value)
}

const resetFilters = () => {
  productStore.resetFilters()
  searchQuery.value = ''
  sortValue.value = 'featured'
  localPriceMin.value = 0
  localPriceMax.value = 10000000
}

const categoryOptions = [
  { value: 'all', label: 'All' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'footwear', label: 'Footwear' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'electronics', label: 'Electronics' },
]
</script>

<style scoped>
.products-view {
  min-height: 100vh;
}

.page-top {
  padding-top: calc(var(--header-height) + var(--space-8));
  padding-bottom: var(--space-16);
}

.products-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: var(--space-8);
  align-items: start;
}

@media (max-width: 1024px) {
  .products-layout {
    grid-template-columns: 1fr;
  }
}

/* Sidebar */
.filter-sidebar {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  position: sticky;
  top: calc(var(--header-height) + var(--space-4));
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

@media (max-width: 1024px) {
  .filter-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    border-radius: 0;
    z-index: 200;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform var(--transition-base);
    border: none;
    border-right: 1px solid var(--color-border);
  }

  .filter-sidebar.open {
    transform: translateX(0);
  }
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 199;
  backdrop-filter: blur(2px);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.filter-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.filter-chip {
  padding: 0.35rem 0.85rem;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: transparent;
  cursor: pointer;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    background-color var(--transition-fast);
  letter-spacing: var(--tracking-wide);
}

.filter-chip:hover {
  color: var(--color-text-primary);
  border-color: var(--color-text-secondary);
}

.filter-chip.active {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: var(--color-accent-muted);
}

.price-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

/* Toolbar */
.products-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-subtle);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.results-count {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.count-num {
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
}

.toolbar-search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-2);
}

.ts-icon {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.ts-input {
  background: none;
  border: none;
  outline: none;
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  width: 150px;
}

.ts-input::placeholder {
  color: var(--color-text-tertiary);
}

.ts-input::-webkit-search-cancel-button {
  display: none;
}

.sort-select {
  padding: 0.5rem 2rem 0.5rem 0.875rem;
  font-size: var(--text-sm);
  width: auto;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-24) 0;
  color: var(--color-text-tertiary);
  text-align: center;
}

.empty-title {
  font-size: var(--text-lg);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
}

.empty-sub {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}
</style>
