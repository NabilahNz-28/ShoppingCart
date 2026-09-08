<template>
  <main class="checkout-view page-top">
    <div class="container">
      <!-- Header -->
      <div class="checkout-header animate-fade-up">
        <RouterLink to="/cart" class="back-link">
          <ArrowLeft :size="16" /> Back to Cart
        </RouterLink>
        <h1 class="heading-1">Checkout</h1>
        <!-- Steps -->
        <div class="checkout-steps">
          <div
            v-for="(step, i) in steps"
            :key="step.id"
            :class="['step', { active: currentStep === i, done: currentStep > i }]"
          >
            <div class="step-circle">
              <Check v-if="currentStep > i" :size="14" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="step-label">{{ step.label }}</span>
            <div v-if="i < steps.length - 1" class="step-line"></div>
          </div>
        </div>
      </div>

      <div class="checkout-layout">
        <!-- Form Area -->
        <div class="checkout-form-area">

          <!-- Step 1: Shipping -->
          <Transition name="step-transition" mode="out-in">
            <section v-if="currentStep === 0" key="shipping" class="form-section">
              <h2 class="heading-3 form-section-title">Shipping Information</h2>
              <form id="form-shipping" @submit.prevent="nextStep">
                <div class="form-grid-2">
                  <div class="form-group">
                    <label class="form-label" for="first-name">First Name *</label>
                    <input id="first-name" v-model="form.shipping.firstName" class="form-input" required placeholder="John" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="last-name">Last Name *</label>
                    <input id="last-name" v-model="form.shipping.lastName" class="form-input" required placeholder="Doe" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="email">Email Address *</label>
                    <input id="email" v-model="form.shipping.email" class="form-input" type="email" required placeholder="john@example.com" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="phone">Phone Number *</label>
                    <input id="phone" v-model="form.shipping.phone" class="form-input" type="tel" required placeholder="+62 812 3456 7890" />
                  </div>
                  <div class="form-group form-col-2">
                    <label class="form-label" for="address">Street Address *</label>
                    <input id="address" v-model="form.shipping.address" class="form-input" required placeholder="Jl. Sudirman No. 123" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="city">City *</label>
                    <input id="city" v-model="form.shipping.city" class="form-input" required placeholder="Jakarta" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="province">Province *</label>
                    <select id="province" v-model="form.shipping.province" class="form-input form-select" required>
                      <option value="">Select province...</option>
                      <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="postal">Postal Code *</label>
                    <input id="postal" v-model="form.shipping.postalCode" class="form-input" required placeholder="12345" maxlength="5" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="country">Country</label>
                    <input id="country" v-model="form.shipping.country" class="form-input" readonly />
                  </div>
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary btn-lg">
                    Continue to Payment <ArrowRight :size="16" />
                  </button>
                </div>
              </form>
            </section>

            <!-- Step 2: Payment -->
            <section v-else-if="currentStep === 1" key="payment" class="form-section">
              <h2 class="heading-3 form-section-title">Payment Method</h2>
              <form id="form-payment" @submit.prevent="nextStep">
                <div class="payment-methods">
                  <label
                    v-for="method in paymentMethods"
                    :key="method.id"
                    :class="['payment-method', { active: form.payment.method === method.id }]"
                  >
                    <input
                      type="radio"
                      name="payment"
                      :value="method.id"
                      v-model="form.payment.method"
                      class="sr-only"
                    />
                    <component :is="method.icon" :size="20" />
                    <div class="pm-info">
                      <span class="pm-name">{{ method.name }}</span>
                      <span class="pm-desc">{{ method.desc }}</span>
                    </div>
                    <div class="pm-check">
                      <Check :size="14" />
                    </div>
                  </label>
                </div>

                <!-- Credit card fields -->
                <div v-if="form.payment.method === 'credit_card'" class="cc-fields animate-fade-up">
                  <div class="form-grid-2">
                    <div class="form-group form-col-2">
                      <label class="form-label" for="card-num">Card Number *</label>
                      <input
                        id="card-num"
                        v-model="form.payment.cardNumber"
                        class="form-input"
                        placeholder="1234 5678 9012 3456"
                        maxlength="19"
                        required
                      />
                    </div>
                    <div class="form-group form-col-2">
                      <label class="form-label" for="card-name">Cardholder Name *</label>
                      <input id="card-name" v-model="form.payment.cardName" class="form-input" required placeholder="JOHN DOE" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="card-expiry">Expiry *</label>
                      <input id="card-expiry" v-model="form.payment.cardExpiry" class="form-input" required placeholder="MM/YY" maxlength="5" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="card-cvv">CVV *</label>
                      <input id="card-cvv" v-model="form.payment.cardCVV" class="form-input" required placeholder="123" maxlength="4" type="password" />
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="button" class="btn btn-secondary" @click="currentStep--">
                    <ArrowLeft :size="16" /> Back
                  </button>
                  <button type="submit" class="btn btn-primary btn-lg">
                    Review Order <ArrowRight :size="16" />
                  </button>
                </div>
              </form>
            </section>

            <!-- Step 3: Review -->
            <section v-else key="review" class="form-section">
              <h2 class="heading-3 form-section-title">Review Your Order</h2>

              <!-- Shipping summary -->
              <div class="review-card">
                <div class="review-card-header">
                  <p class="review-card-title">Shipping to</p>
                  <button class="btn btn-ghost btn-sm" @click="currentStep = 0">Edit</button>
                </div>
                <p class="review-value">{{ form.shipping.firstName }} {{ form.shipping.lastName }}</p>
                <p class="review-sub">{{ form.shipping.address }}, {{ form.shipping.city }}, {{ form.shipping.province }} {{ form.shipping.postalCode }}</p>
                <p class="review-sub">{{ form.shipping.email }} · {{ form.shipping.phone }}</p>
              </div>

              <!-- Payment summary -->
              <div class="review-card">
                <div class="review-card-header">
                  <p class="review-card-title">Payment via</p>
                  <button class="btn btn-ghost btn-sm" @click="currentStep = 1">Edit</button>
                </div>
                <p class="review-value">{{ paymentMethodLabel }}</p>
              </div>

              <!-- Items -->
              <div class="review-card">
                <p class="review-card-title" style="margin-bottom: var(--space-3)">Items ({{ cartStore.itemCount }})</p>
                <div class="review-items">
                  <div v-for="item in cartStore.items" :key="item.product.id" class="review-item">
                    <img :src="item.product.images[0]" :alt="item.product.name" class="review-item-img" />
                    <div class="review-item-info">
                      <p class="review-item-name">{{ item.product.name }}</p>
                      <p class="review-item-qty">Qty: {{ item.quantity }}</p>
                    </div>
                    <p class="review-item-price">{{ formatPrice(item.product.price * item.quantity) }}</p>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button class="btn btn-secondary" @click="currentStep--">
                  <ArrowLeft :size="16" /> Back
                </button>
                <button class="btn btn-primary btn-lg" :disabled="placing" @click="placeOrder">
                  <span v-if="placing">Processing...</span>
                  <span v-else>Place Order</span>
                </button>
              </div>
            </section>
          </Transition>
        </div>

        <!-- Order Summary Sidebar -->
        <aside class="order-sidebar animate-slide-right">
          <h2 class="heading-3">Summary</h2>
          <div class="summary-items">
            <div v-for="item in cartStore.items" :key="item.product.id" class="mini-item">
              <div class="mini-img-wrap">
                <img :src="item.product.images[0]" :alt="item.product.name" class="mini-img" />
                <span class="mini-qty">{{ item.quantity }}</span>
              </div>
              <p class="mini-name">{{ item.product.name }}</p>
              <p class="mini-price">{{ formatPrice(item.product.price * item.quantity) }}</p>
            </div>
          </div>
          <div class="divider"></div>
          <div class="summary-lines">
            <div class="summary-line">
              <span>Subtotal</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="summary-line">
              <span>Shipping</span>
              <span>{{ cartStore.shippingCost === 0 ? 'Free' : formatPrice(cartStore.shippingCost) }}</span>
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
          <div class="sidebar-trust">
            <Lock :size="13" />
            <span>SSL Encrypted & Secure</span>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, Check, CreditCard, Building2, Wallet, Lock } from '@lucide/vue'
import { useCartStore } from '@/stores/cartStore'
import { useToastStore } from '@/stores/toastStore'
import { formatPrice } from '@/utils/format'
import type { CheckoutData } from '@/types'

const router = useRouter()
const cartStore = useCartStore()
const toastStore = useToastStore()

const currentStep = ref(0)
const placing = ref(false)

const steps = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]

const form = ref<CheckoutData>({
  shipping: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Indonesia',
  },
  payment: {
    method: 'credit_card',
  },
})

const paymentMethods = [
  { id: 'credit_card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, JCB', icon: CreditCard },
  { id: 'bank_transfer', name: 'Bank Transfer', desc: 'BCA, Mandiri, BNI, BRI', icon: Building2 },
  { id: 'e_wallet', name: 'E-Wallet', desc: 'GoPay, OVO, Dana, ShopeePay', icon: Wallet },
]

const paymentMethodLabel = computed(
  () => paymentMethods.find((m) => m.id === form.value.payment.method)?.name ?? '',
)

const nextStep = () => {
  currentStep.value++
}

const placeOrder = async () => {
  placing.value = true
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 1200))
  cartStore.placeOrder(form.value)
  toastStore.addToast('Order placed successfully!', 'success')
  router.push('/order-success')
  placing.value = false
}

const provinces = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'DI Yogyakarta',
  'Banten', 'Bali', 'Sumatera Utara', 'Sumatera Selatan', 'Kalimantan Timur',
  'Sulawesi Selatan', 'Papua', 'Riau', 'Lampung', 'Aceh',
]
</script>

<style scoped>
.checkout-view {
  min-height: 100vh;
  padding-bottom: var(--space-20);
}

.page-top {
  padding-top: calc(var(--header-height) + var(--space-8));
}

.checkout-header {
  margin-bottom: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  width: fit-content;
}

.back-link:hover {
  color: var(--color-text-primary);
}

/* Steps */
.checkout-steps {
  display: flex;
  align-items: center;
}

.step {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  transition: all var(--transition-base);
}

.step.active .step-circle {
  border-color: var(--color-accent);
  background: var(--color-accent-muted);
  color: var(--color-accent);
}

.step.done .step-circle {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-text-inverse);
}

.step-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  transition: color var(--transition-base);
}

.step.active .step-label,
.step.done .step-label {
  color: var(--color-text-primary);
}

.step-line {
  flex: 1;
  min-width: 40px;
  height: 1px;
  background: var(--color-border);
  margin: 0 var(--space-2);
}

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-8);
  align-items: start;
}

@media (max-width: 1024px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}

/* Form sections */
.form-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.form-section-title {
  margin-bottom: var(--space-6);
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .form-grid-2 { grid-template-columns: 1fr; }
}

.form-col-2 {
  grid-column: 1 / -1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border-subtle);
}

/* Payment methods */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.payment-method {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.payment-method.active {
  border-color: var(--color-accent);
  background: var(--color-accent-muted);
}

.payment-method.active > svg {
  color: var(--color-accent);
}

.pm-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pm-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
}

.pm-desc {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

.pm-check {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  color: transparent;
}

.payment-method.active .pm-check {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-text-inverse);
}

.cc-fields {
  padding: var(--space-4);
  background: var(--color-surface-2);
  border-radius: var(--radius-md);
  margin-top: var(--space-1);
}

/* Review */
.review-card {
  background: var(--color-surface-2);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
}

.review-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.review-card-title {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.review-value {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

.review-sub {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  margin-top: 2px;
}

.review-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.review-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.review-item-img {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  background: var(--color-surface-3);
}

.review-item-info {
  flex: 1;
}

.review-item-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

.review-item-qty {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

.review-item-price {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
}

/* Sidebar */
.order-sidebar {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  position: sticky;
  top: calc(var(--header-height) + var(--space-4));
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.mini-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.mini-img-wrap {
  position: relative;
  flex-shrink: 0;
}

.mini-img {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  background: var(--color-surface-2);
}

.mini-qty {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  background: var(--color-accent);
  color: var(--color-text-inverse);
  font-size: 10px;
  font-weight: var(--weight-bold);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.mini-name {
  flex: 1;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: var(--leading-snug);
}

.mini-price {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
}

.summary-lines {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.summary-total {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
}

.sidebar-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

/* Transition */
.step-transition-enter-active,
.step-transition-leave-active {
  transition: all 0.3s ease;
}

.step-transition-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.step-transition-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
