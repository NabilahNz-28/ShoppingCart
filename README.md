# Arcen — Shopping Cart

> A modern, minimalist e-commerce shopping cart built with Vue 3, TypeScript, and Pinia.

![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)
![Pinia](https://img.shields.io/badge/Pinia-2.x-f7cf3a?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=flat-square&logo=vite)

## ✨ Features

- **Product Catalog** — Grid layout with filter by category, price range, and full-text search
- **Product Detail** — Image gallery, ratings, quantity selector, related products
- **Shopping Cart** — Persistent cart with real-time quantity control and order summary
- **Checkout Flow** — Multi-step form (Shipping → Payment → Review)
- **Order Confirmation** — Post-purchase summary with delivery estimation
- **Toast Notifications** — Animated feedback on cart interactions
- **Responsive Design** — Mobile-first layout across all pages

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Language | TypeScript |
| Build Tool | Vite |
| State Management | Pinia (with `persist` plugin) |
| Routing | Vue Router 4 (lazy-loaded routes) |
| Icons | `@lucide/vue` |
| Styling | Vanilla CSS with custom design tokens |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── assets/
│   └── styles/
│       └── main.css          # Design system & tokens
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue     # Sticky glassmorphism header
│   │   └── AppFooter.vue
│   └── ui/
│       ├── ProductCard.vue   # Card with quick-add overlay
│       ├── CartItemRow.vue   # Quantity control + remove
│       └── ToastNotification.vue
├── data/
│   └── products.ts           # Mock product catalog (12 items)
├── router/
│   └── index.ts              # Route definitions + guards
├── stores/
│   ├── cartStore.ts          # Cart state + computed totals
│   ├── productStore.ts       # Products + filter/sort logic
│   └── toastStore.ts         # Toast notification queue
├── types/
│   └── index.ts              # Shared TypeScript interfaces
├── utils/
│   └── format.ts             # Currency & date formatters
└── views/
    ├── HomeView.vue
    ├── ProductsView.vue
    ├── ProductDetailView.vue
    ├── CartView.vue
    ├── CheckoutView.vue
    └── OrderSuccessView.vue
```

## 🎨 Design System

A custom CSS design system built with CSS custom properties (design tokens):

- **Colors**: Monochrome dark palette with warm gold accent (`#c9a84c`)
- **Typography**: Inter (sans-serif) + Playfair Display (serif headings)
- **Spacing**: 4px base grid
- **Transitions**: Consistent easing curves for all animations

## 📝 License

MIT
