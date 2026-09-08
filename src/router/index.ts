import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Arcen — Modern Essentials' },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductsView.vue'),
      meta: { title: 'Shop All — Arcen' },
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetailView.vue'),
      meta: { title: 'Product — Arcen' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: { title: 'Cart — Arcen' },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
      meta: { title: 'Checkout — Arcen' },
    },
    {
      path: '/order-success',
      name: 'order-success',
      component: () => import('@/views/OrderSuccessView.vue'),
      meta: { title: 'Order Confirmed — Arcen' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to) => {
  document.title = (to.meta?.title as string) ?? 'Arcen'
})

export default router
