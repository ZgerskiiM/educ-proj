<template>
  <AppHeader />
  <v-app>
    <v-main>
      <div class="cart-page">
        <div class="cart-image-left">
          <img src="/image1.png" alt="Декоративное изображение" class="decoration-image">
        </div>
        <v-container 
          class="cart-container"
          :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
        >
          <h1 class="cart-title">Корзина</h1>
          
          <div class="back-link mb-4">
            <v-btn 
              variant="outlined" 
              color="black" 
              prepend-icon="mdi-arrow-left"
              class="back-btn"
              @click="$router.push('/catalog')"
            >
              Вернуться в каталог
            </v-btn>
          </div>
          
          <div class="cart-content">
            <div class="cart-items">
              <div v-if="cartItems.length === 0" class="empty-cart">
                <p>Ваша корзина пуста</p>
                <v-btn 
                  color="#ff8a04" 
                  class="white--text mt-4"
                  @click="$router.push('/catalog')"
                >
                  Перейти в каталог
                </v-btn>
              </div>
              
              <div 
                v-for="(item, index) in cartItems" 
                :key="index"
                class="cart-item"
              >
                <div class="cart-item-img">
                  <v-img :src="item.image" width="150" height="100" cover class="rounded-lg"></v-img>
                </div>
                <div class="cart-item-details">
                  <h3 class="cart-item-title">{{ item.title }}</h3>
                </div>
                <div class="cart-item-price">
                  {{ item.price }}
                </div>
                <div class="cart-item-remove">
                  <v-btn icon variant="text" @click="removeFromCart(index)">
                    <v-icon>mdi-close-circle-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
            
            <div class="cart-summary" v-if="cartItems.length > 0">
              <div class="cart-summary-card">
                <h2 class="summary-title">Итог</h2>
                
                <div class="checkout-form">
                  <div class="form-group mb-4">
                    <label class="form-label">Почта</label>
                    <v-text-field
                      v-model="email"
                      variant="outlined"
                      placeholder="your@email.ru"
                      hide-details
                      density="comfortable"
                      class="checkout-input"
                    ></v-text-field>
                  </div>
                  
                  <div class="form-group mb-4">
                    <label class="form-label">Промокод</label>
                    <div class="promo-container">
                      <v-text-field
                        v-model="promoCode"
                        variant="outlined"
                        placeholder="Введите промокод"
                        hide-details
                        density="comfortable"
                        class="checkout-input"
                      ></v-text-field>
                      <v-btn variant="text" class="promo-btn" @click="applyPromoCode">Применить</v-btn>
                    </div>
                  </div>
                  
                  <div class="order-summary">
                    <div class="summary-row">
                      <span>Цена</span>
                      <span>{{ formattedTotalPrice }} ₽</span>
                    </div>
                    <div class="summary-row">
                      <span>Скидка</span>
                      <span>{{ formattedDiscount }} ₽</span>
                    </div>
                    <div class="summary-row total">
                      <span>Итог</span>
                      <span>{{ formattedFinalPrice }} ₽</span>
                    </div>
                  </div>
                  
                  <v-btn 
                    color="#ff8a04" 
                    size="large" 
                    block 
                    class="white--text mt-6 checkout-btn"
                    @click="showAuthDialog = true"
                  >
                    Оплатить
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          
          <v-dialog v-model="showAuthDialog" max-width="400">
            <v-card>
              <v-card-title>Требуется авторизация</v-card-title>
              <v-card-text>Для оплаты заказа необходимо войти в аккаунт.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ff8a04" class="text-none" variant="outlined" @click="goToLogin">Войти</v-btn>
                <v-btn class="text-none" variant="outlined" @click="showAuthDialog = false">Отмена</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </div>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import AppHeader from '@/shared/ui/PagesElem/Header.vue'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'

const router = useRouter()
const { mdAndDown, smAndDown } = useDisplay()

const email = ref('')
const promoCode = ref('')
const discount = ref(0)
const showAuthDialog = ref(false)

interface CartItem {
  title: string
  price: string
  image: string
}

const cartItems = ref<CartItem[]>([])

onMounted(() => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
})

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/\s+/g, '').replace(/[^\d.-]/g, ''))
    return sum + price
  }, 0)
})

const finalPrice = computed(() => {
  return totalPrice.value - discount.value
})

const formattedTotalPrice = computed(() => {
  return totalPrice.value.toLocaleString('ru-RU')
})

const formattedDiscount = computed(() => {
  return discount.value.toLocaleString('ru-RU')
})

const formattedFinalPrice = computed(() => {
  return finalPrice.value.toLocaleString('ru-RU')
})

const removeFromCart = (index: number) => {
  cartItems.value.splice(index, 1)
  saveCart()
  // Отправляем событие об обновлении корзины
  window.dispatchEvent(new Event('cartUpdated'))
}

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

const applyPromoCode = () => {
  if (promoCode.value.toLowerCase() === 'скидка10') {
    discount.value = totalPrice.value * 0.1
  } else if (promoCode.value.toLowerCase() === 'скидка20') {
    discount.value = totalPrice.value * 0.2
  } else {
    discount.value = 0
    alert('Промокод не найден')
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.v-main {
  background-color: #fff8f0;
}

.cart-page {
  min-height: 100vh;
  padding: 2rem 0 4rem;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.cart-image-left {
  position: absolute;
  left: 0;
  top: 8rem;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: flex-start;
}

.cart-image-left .decoration-image {
  width: auto;
  height: 80vh;
  object-fit: contain;
  display: block;
}

.cart-container {
  margin: 0 auto;
  z-index: 2;
}

.cart-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.back-btn {
  text-transform: none;
  font-weight: 400;
}

.cart-content {
  display: flex;
  gap: 2rem;
}

.cart-items {
  flex: 2;
}

.cart-summary {
  flex: 1;
}

.empty-cart {
  background-color: white;
  padding: 3rem;
  text-align: center;
  border-radius: 12px;
  font-size: 1.2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.cart-item-details {
  flex: 2;
  padding: 0 1.5rem;
}

.cart-item-title {
  font-size: 1.1rem;
  font-weight: 500;
}

.cart-item-price {
  font-size: 1.1rem;
  font-weight: 600;
  margin-right: 2rem;
}

.cart-summary-card {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
}

.summary-title {
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.checkout-input {
  background-color: #f9f9f9;
  border-radius: 8px;
}

.promo-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.promo-btn {
  white-space: nowrap;
}

.order-summary {
  margin-top: 1.5rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

.checkout-btn {
  font-weight: 500;
  text-transform: none;
  font-size: 1.1rem;
}

@media (max-width: 960px) {
  .cart-content {
    flex-direction: column;
  }
  
  .cart-page {
    padding-top: 2rem;
    flex-direction: column;
    align-items: stretch;
  }
  
  .cart-title {
    font-size: 2rem;
  }

  .cart-image-left {
    display: none;
  }
}

@media (max-width: 500px) {
  .cart-page {
    padding: 1rem 0 2rem;
  }
  
  .cart-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .cart-content {
    gap: 1rem;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
  }
  
  .cart-item-img {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .cart-item-details {
    flex: none;
    padding: 0;
    width: 100%;
  }
  
  .cart-item-price {
    margin-right: 0;
    font-size: 1.2rem;
  }
  
  .cart-item-remove {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  
  .cart-item {
    position: relative;
  }
  
  .promo-container {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .promo-btn {
    width: 100%;
  }
  
  .cart-summary-card {
    padding: 1rem;
  }
  
  .summary-title {
    font-size: 1.4rem;
  }
}
</style> 