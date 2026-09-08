export interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  description: string
  details: string[]
  images: string[]
  stock: number
  rating: number
  reviewCount: number
  tags: string[]
  isNew?: boolean
  isFeatured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export interface ShippingForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface PaymentForm {
  method: 'credit_card' | 'bank_transfer' | 'e_wallet'
  cardNumber?: string
  cardName?: string
  cardExpiry?: string
  cardCVV?: string
}

export interface CheckoutData {
  shipping: ShippingForm
  payment: PaymentForm
}

export interface Order {
  id: string
  items: CartItem[]
  shipping: ShippingForm
  payment: PaymentForm
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  createdAt: Date
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
export type FilterCategory = 'all' | 'apparel' | 'footwear' | 'accessories' | 'electronics'

export interface ProductFilters {
  category: FilterCategory
  priceMin: number
  priceMax: number
  sort: SortOption
  search: string
}

export interface ToastNotification {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number
}
