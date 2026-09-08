import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductFilters, SortOption, FilterCategory } from '@/types'
import { products as allProducts } from '@/data/products'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>(allProducts)

  const filters = ref<ProductFilters>({
    category: 'all',
    priceMin: 0,
    priceMax: 10000000,
    sort: 'featured',
    search: '',
  })

  const filteredProducts = computed(() => {
    let result = [...products.value]

    // Category filter
    if (filters.value.category !== 'all') {
      result = result.filter((p) => p.category === filters.value.category)
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.value.priceMin && p.price <= filters.value.priceMax,
    )

    // Search filter
    if (filters.value.search.trim()) {
      const q = filters.value.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    // Sort
    switch (filters.value.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
    }

    return result
  })

  const featuredProducts = computed(() => products.value.filter((p) => p.isFeatured))

  const getProductById = (id: number): Product | undefined =>
    products.value.find((p) => p.id === id)

  const setCategory = (category: FilterCategory) => {
    filters.value.category = category
  }

  const setSort = (sort: SortOption) => {
    filters.value.sort = sort
  }

  const setSearch = (search: string) => {
    filters.value.search = search
  }

  const setPriceRange = (min: number, max: number) => {
    filters.value.priceMin = min
    filters.value.priceMax = max
  }

  const resetFilters = () => {
    filters.value = {
      category: 'all',
      priceMin: 0,
      priceMax: 10000000,
      sort: 'featured',
      search: '',
    }
  }

  return {
    products,
    filters,
    filteredProducts,
    featuredProducts,
    getProductById,
    setCategory,
    setSort,
    setSearch,
    setPriceRange,
    resetFilters,
  }
})
