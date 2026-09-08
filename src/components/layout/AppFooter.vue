<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            <span class="logo-mark">A</span>rcen
          </RouterLink>
          <p class="footer-tagline">
            Considered design.<br />Uncompromising quality.
          </p>
        </div>

        <!-- Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Shop</h4>
          <ul class="footer-links">
            <li><RouterLink to="/products">All Products</RouterLink></li>
            <li><RouterLink to="/products?category=apparel">Apparel</RouterLink></li>
            <li><RouterLink to="/products?category=footwear">Footwear</RouterLink></li>
            <li><RouterLink to="/products?category=accessories">Accessories</RouterLink></li>
            <li><RouterLink to="/products?category=electronics">Electronics</RouterLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Company</h4>
          <ul class="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Support</h4>
          <ul class="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Size Guide</a></li>
          </ul>
        </div>
      </div>

      <div class="divider" style="margin: var(--space-10) 0;"></div>

      <div class="footer-bottom">
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Arcen. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.app-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border-subtle);
  padding: var(--space-16) 0 var(--space-8);
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-12);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}

.footer-logo {
  display: inline-block;
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
}

.footer-logo .logo-mark {
  color: var(--color-accent);
}

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.footer-heading {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-4);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-links a {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-text-primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer-copy {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

.footer-legal {
  display: flex;
  gap: var(--space-6);
}

.footer-legal a {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  transition: color var(--transition-fast);
}

.footer-legal a:hover {
  color: var(--color-text-secondary);
}
</style>
