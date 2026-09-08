import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product, Order, CheckoutData } from '@/types'

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([])
    const lastOrder = ref<Order | null>(null)

    // Computed
    const itemCount = computed(() =>
      items.value.reduce((total, item) => total + item.quantity, 0),
    )

    const subtotal = computed(() =>
      items.value.reduce((total, item) => total + item.product.price * item.quantity, 0),
    )

    const shippingCost = computed(() => {
      if (subtotal.value === 0) return 0
      return subtotal.value >= 2000000 ? 0 : 50000
    })

    const tax = computed(() => Math.round(subtotal.value * 0.11))

    const total = computed(() => subtotal.value + shippingCost.value + tax.value)

    const isEmpty = computed(() => items.value.length === 0)

    // Actions
    const addItem = (product: Product, quantity: number = 1) => {
      const existing = items.value.find((item) => item.product.id === product.id)
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock)
        existing.quantity = newQty
      } else {
        items.value.push({ product, quantity: Math.min(quantity, product.stock) })
      }
    }

    const removeItem = (productId: number) => {
      items.value = items.value.filter((item) => item.product.id !== productId)
    }

    const updateQuantity = (productId: number, quantity: number) => {
      const item = items.value.find((i) => i.product.id === productId)
      if (!item) return
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = Math.min(quantity, item.product.stock)
      }
    }

    const clearCart = () => {
      items.value = []
    }

    const isInCart = (productId: number): boolean =>
      items.value.some((item) => item.product.id === productId)

    const getItemQuantity = (productId: number): number => {
      const item = items.value.find((i) => i.product.id === productId)
      return item?.quantity ?? 0
    }

    const placeOrder = (checkout: CheckoutData): Order => {
      const order: Order = {
        id: `ARC-${Date.now().toString(36).toUpperCase()}`,
        items: [...items.value],
        shipping: { ...checkout.shipping },
        payment: { ...checkout.payment },
        subtotal: subtotal.value,
        shippingCost: shippingCost.value,
        tax: tax.value,
        total: total.value,
        createdAt: new Date(),
        status: 'pending',
      }
      lastOrder.value = order
      clearCart()
      return order
    }

    return {
      items,
      lastOrder,
      itemCount,
      subtotal,
      shippingCost,
      tax,
      total,
      isEmpty,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
      placeOrder,
    }
  },
  {
    persist: true,
  },
)
