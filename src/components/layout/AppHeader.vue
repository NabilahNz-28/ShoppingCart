<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="header-logo">
        <span class="logo-mark">A</span>
        <span class="logo-text">rcen</span>
      </RouterLink>

      <!-- Navigation -->
      <nav class="header-nav hide-mobile">
        <RouterLink to="/" class="nav-link" :class="{ active: route.name === 'home' }">
          Home
        </RouterLink>
        <RouterLink to="/products" class="nav-link" :class="{ active: route.name === 'products' }">
          Shop
        </RouterLink>
      </nav>

      <!-- Actions -->
      <div class="header-actions">
        <!-- Search toggle -->
        <button
          class="btn btn-ghost btn-icon hide-mobile"
          aria-label="Search"
          @click="toggleSearch"
        >
          <Search :size="18" />
        </button>

        <!-- Cart -->
        <RouterLink to="/cart" class="cart-btn" aria-label="Shopping cart">
          <ShoppingBag :size="18" />
          <span v-if="cartStore.itemCount > 0" class="cart-badge">
            {{ cartStore.itemCount > 99 ? '99+' : cartStore.itemCount }}
          </span>
        </RouterLink>

        <!-- Mobile menu -->
        <button class="btn btn-ghost btn-icon show-mobile-only" aria-label="Menu" @click="toggleMenu">
          <Menu v-if="!menuOpen" :size="20" />
          <X v-else :size="20" />
        </button>
      </div>
    </div>

    <!-- Search overlay -->
    <Transition name="search">
      <div v-if="searchOpen" class="header-search">
        <div class="container">
          <div class="search-inner">
            <Search :size="16" class="search-icon" />
            <input
              id="header-search"
              ref="searchInputRef"
              v-model="searchQuery"
              type="search"
              placeholder="Search products..."
              class="search-input"
              @keydown.esc="toggleSearch"
              @keydown.enter="onSearch"
            />
            <button class="btn btn-ghost btn-icon" @click="toggleSearch">
              <X :size="16" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <nav v-if="menuOpen" class="mobile-menu">
        <RouterLink to="/" class="mobile-nav-link" @click="menuOpen = false">Home</RouterLink>
        <RouterLink to="/products" class="mobile-nav-link" @click="menuOpen = false">
          Shop All
        </RouterLink>
        <RouterLink to="/cart" class="mobile-nav-link" @click="menuOpen = false">
          Cart ({{ cartStore.itemCount }})
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Search, ShoppingBag, Menu, X } from '@lucide/vue'
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const productStore = useProductStore()

const isScrolled = ref(false)
const searchOpen = ref(false)
const menuOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

// Scroll detection
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}

// Close menu on route change
watch(route, () => {
  menuOpen.value = false
  searchOpen.value = false
})

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInputRef.value?.focus()
  } else {
    searchQuery.value = ''
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const onSearch = () => {
  if (searchQuery.value.trim()) {
    productStore.setSearch(searchQuery.value.trim())
    router.push('/products')
    searchOpen.value = false
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition:
    border-color var(--transition-base),
    background-color var(--transition-base);
}

.app-header.scrolled {
  border-bottom-color: var(--color-border-subtle);
  background: rgba(10, 10, 10, 0.95);
}

.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  gap: var(--space-8);
}

/* Logo */
.header-logo {
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: var(--weight-semibold);
  font-size: var(--text-xl);
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.logo-mark {
  color: var(--color-accent);
}

.logo-text {
  color: var(--color-text-primary);
}

/* Nav */
.header-nav {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex: 1;
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: var(--space-1) 0;
  position: relative;
  transition: color var(--transition-base);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform var(--transition-base);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text-primary);
}

.nav-link.active::after,
.nav-link:hover::after {
  transform: scaleX(1);
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  transition: color var(--transition-base), background-color var(--transition-base);
}

.cart-btn:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-2);
}

.cart-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: var(--color-accent);
  color: var(--color-text-inverse);
  font-size: 10px;
  font-weight: var(--weight-bold);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Search */
.header-search {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: var(--space-4) 0;
}

.search-inner {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-2);
}

.search-icon {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--color-text-primary);
  font-size: var(--text-base);
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

/* Mobile menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: var(--space-4) 0;
}

.mobile-nav-link {
  display: block;
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.mobile-nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-2);
}

/* Transitions */
.search-enter-active,
.search-leave-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
