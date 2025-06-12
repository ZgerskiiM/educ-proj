<template>
  <v-layout class="mb-16">

    <v-app-bar class="upper-wrapper justify-center" elevation="0" height="80" app>
      <v-container :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'">
        <div class="header-content">
          <!-- Desktop версия -->
          <div v-if="!smAndDown" class="left-section">
            <div class="logo">
              <img src="/school_вектор_полный_w.png" class="logo__img" style="cursor: pointer;" @click="goToHome"/>
            </div>
            <div class="divider"></div>
            <div class="nav-links">
              <v-btn color="white" to="/catalog" class="nav-btn" variant="text">Каталог</v-btn>
              <a href="https://t.me/babichbaker_course" target="_blank" rel="noopener" class="nav-btn support-link">
                <v-btn color="white" variant="text"><span class="nav-btn">Поддержка</span></v-btn>
              </a>
            </div>
          </div>
          
          <!-- Mobile версия -->
          <div v-if="smAndDown" class="mobile-header-content">
            <div class="mobile-logo-section">
              <img src="/school_вектор_полный_w.png" class="mobile-full-logo" @click="goToHome" />
            </div>
            <div class="mobile-right-section">
              <div class="cart-container" @click="goToCart">
                <v-badge :content="cartItemsCount" :model-value="cartItemsCount > 0" color="red" offset-x="8" offset-y="8">
                  <v-btn icon variant="text" color="white" size="small">
                    <v-icon size="20">mdi-cart-outline</v-icon>
                  </v-btn>
                </v-badge>
              </div>
              <v-btn 
                icon 
                variant="text" 
                color="white" 
                @click="toggleMobileMenu"
                class="menu-toggle-btn"
              >
                <v-icon size="24">mdi-menu</v-icon>
              </v-btn>
            </div>
          </div>

          <!-- Desktop right section -->
          <div v-if="!smAndDown" class="right-section">
            <div class="cart-container" @click="goToCart">
              <v-badge :content="cartItemsCount" :model-value="cartItemsCount > 0" color="red" offset-x="10" offset-y="10">
                <v-btn icon variant="text" color="white">
                  <v-icon>mdi-cart-outline</v-icon>
                </v-btn>
              </v-badge>
            </div>
            
            <!-- Кнопки входа и регистрации для неавторизованных пользователей -->
            <div v-if="!isUserLoggedIn" class="auth-buttons">
              <v-btn 
                @click="goToLogin"
                color="white" 
                variant="outlined" 
                class="auth-btn"
                size="small"
              >
                Войти
              </v-btn>
              <v-btn 
                @click="goToRegister"
                color="white" 
                variant="flat" 
                class="auth-btn register-btn"
                size="small"
              >
                Регистрация
              </v-btn>
            </div>
            
            <!-- Профиль для авторизованных пользователей -->
            <div v-if="isUserLoggedIn" class="profile-container" @click="handleProfileClick">
              <div class="user-info">
                <span class="user-name">{{ userData?.firstName || 'Пользователь' }}</span>
              </div>
              <v-avatar class="profile-avatar" rounded>
                <v-img v-if="userData?.imageUrl" :src="userData.imageUrl"></v-img>
                <v-img v-else src="/user.png" class="black-icon"></v-img>
              </v-avatar>
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Mobile Menu Overlay -->
    <v-overlay 
      v-model="isMobileMenuOpen" 
      class="mobile-menu-overlay"
      :z-index="9999"
    >
      <div class="mobile-menu">
        <div class="menu-header">
          <img src="/school_вектор_полный_w.png" class="menu-logo" @click="goToHome" />
          <v-btn 
            icon 
            variant="text" 
            color="white" 
            @click="closeMobileMenu"
            class="close-btn"
          >
            <v-icon size="28">mdi-close</v-icon>
          </v-btn>
        </div>
        
        <div class="menu-content">
          <div class="menu-navigation">
                         <div class="menu-item" @click="navigateAndClose('/catalog')">
               <v-icon color="#f48a21" class="menu-item-icon">mdi-view-grid-outline</v-icon>
               <span>Каталог</span>
             </div>
             <div class="menu-item" @click="navigateAndClose('/about')">
               <v-icon color="#f48a21" class="menu-item-icon">mdi-information-outline</v-icon>
               <span>О нас</span>
             </div>
             <div class="menu-item" @click="navigateAndClose('/support')">
               <v-icon color="#f48a21" class="menu-item-icon">mdi-help-circle-outline</v-icon>
               <span>Поддержка</span>
             </div>
          </div>
          
          <div class="menu-divider"></div>
          
          <!-- User section -->
          <div v-if="isUserLoggedIn" class="user-section">
            <div class="user-avatar-section" @click="navigateAndClose('/profile')">
              <v-avatar class="profile-avatar" rounded>
                <v-img v-if="userData?.imageUrl" :src="userData.imageUrl"></v-img>
                <v-img v-else src="/user.png" class="black-icon"></v-img>
              </v-avatar>
              <div class="user-info-text">
                <span class="user-name">{{ userData?.firstName || 'Пользователь' }}</span>
                <span class="user-action">Перейти в профиль</span>
              </div>
            </div>
          </div>
          
          <!-- Auth buttons for non-authenticated users -->
          <div v-if="!isUserLoggedIn" class="auth-section">
            <v-btn 
              @click="navigateAndClose('/login')"
              color="white" 
              variant="outlined" 
              class="auth-btn mobile-auth-btn"
              block
            >
              Войти
            </v-btn>
            <v-btn 
              @click="navigateAndClose('/register')"
              color="white" 
              variant="flat" 
              class="auth-btn mobile-auth-btn register-btn"
              block
            >
              Регистрация
            </v-btn>
          </div>
        </div>
      </div>
    </v-overlay>

  </v-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'

const { mdAndDown, smAndDown } = useDisplay()

const router = useRouter()
const cartItemsCount = ref(0)
const isAuthenticated = ref(false)
const userData = ref(null)
const isMobileMenuOpen = ref(false)

// Computed для проверки авторизации
const isUserLoggedIn = computed(() => isAuthenticated.value && userData.value)

const goToHome = () => {
  router.push('/');
};

const handleProfileClick = () => {
  router.push('/profile')
}

const goToCart = () => {
  router.push('/cart')
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navigateAndClose = (path) => {
  isMobileMenuOpen.value = false
  router.push(path)
}

const updateCartCount = () => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    const cart = JSON.parse(savedCart)
    cartItemsCount.value = cart.length
  } else {
    cartItemsCount.value = 0
  }
}

const checkAuthStatus = async () => {
  isAuthenticated.value = AuthService.isAuthenticated()
  if (isAuthenticated.value) {
    try {
      userData.value = await AuthService.getUserData()
    } catch (error) {
      console.error('Error fetching user data:', error)
      isAuthenticated.value = false
      userData.value = null
    }
  }
}



onMounted(() => {
  updateCartCount()
  checkAuthStatus()
  
  // Listen for storage changes from other tabs/windows
  window.addEventListener('storage', updateCartCount)
  // Listen for custom cart update events
  window.addEventListener('cartUpdated', updateCartCount)
  // Listen for auth changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'jwt_token') {
      checkAuthStatus()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('storage', updateCartCount)
  window.removeEventListener('cartUpdated', updateCartCount)
})
</script>

<style lang="scss" scoped>
.upper-wrapper {
  width: 100%;
  background-color: #f48a21;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 48px;
  position: relative;
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.logo__img {
  height: 8vh;
  max-height: 40px;
}

.divider {
  height: 30px;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0 16px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-btn {
  text-transform: none;
  letter-spacing: normal;
  margin-right: 8px;
  font-weight: 400;
}

.nav-btn.support-link {
  text-transform: capitalize;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-container {
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background-color 0.3s;


}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
}

.auth-btn {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 400;
  border-radius: 6px;
  
  &.register-btn {
    background-color: rgba(255, 255, 255, 0.9) !important;
    color: #f48a21 !important;
    
    &:hover {
      background-color: rgba(255, 255, 255, 1) !important;
    }
  }
}

.profile-container {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: white;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.profile-avatar {
  height: 40px;
  width: 40px;
}

.black-icon {
  filter: invert(1);
}



/* === MOBILE HEADER STYLES === */
.mobile-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px;
}

.mobile-logo-section {
  flex: 1;
  
  .mobile-full-logo {
    height: 36px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
}

.mobile-right-section {
  display: flex;
  align-items: center;
  gap: 4px;
}

.menu-toggle-btn {
  margin-left: 4px;
}

/* === MOBILE MENU OVERLAY === */
.mobile-menu-overlay {
  background: rgba(0, 0, 0, 0.9) !important;
}

.mobile-menu {
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f48a21 0%, #e8751a 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-logo {
  height: 40px;
  cursor: pointer;
}

.close-btn {
  margin: 0;
}

.menu-content {
  flex: 1;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
}

.menu-navigation {
  flex: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  margin-bottom: 16px;
  background: transparent;
  border: 1px solid #f48a21;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(244, 138, 33, 0.1);
    transform: translateX(8px);
  }
  
  span {
    color: #333;
    font-size: 18px;
    font-weight: 300;
    margin-left: 16px;
  }
}

.menu-item-icon {
  font-size: 24px !important;
}

.menu-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 32px 0;
}

.user-section {
  margin-bottom: 32px;
}

.user-avatar-section {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: rgba(244, 138, 33, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 16px;
  
  &:hover {
    background: rgba(244, 138, 33, 0.2);
  }
}

.user-info-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  
  .user-name {
    color: #333;
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 4px;
  }
  
  .user-action {
    color: rgba(51, 51, 51, 0.7);
    font-size: 14px;
  }
}

.auth-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-auth-btn {
  height: 56px;
  text-transform: none;
  letter-spacing: normal;
  font-weight: 300;
  font-size: 16px;
  border-radius: 12px;
  color: #f48a21 !important;
  border-color: #f48a21 !important;
  
  &.register-btn {
    background-color: #f48a21 !important;
    color: white !important;
    
    &:hover {
      background-color: #e8751a !important;
    }
  }
}

/* CSS */
.support-btn-text {
  text-transform: lowercase;
}
.support-btn-text::first-letter {
  text-transform: uppercase;
}

/* === MEDIUM SCREENS ADJUSTMENTS === */
@media (min-width: 960px) and (max-width: 1279px) {
  .header-content {
    padding: 0 8px;
  }
  
  .logo__img {
    height: 5vh;
    max-height: 30px;
  }
  
  .divider {
    margin: 0 8px;
    height: 25px;
  }
  
  .nav-btn {
    font-size: 14px;
    margin-right: 2px;
    padding: 4px 8px;
  }
  
  .right-section {
    gap: 2px;
  }
  
  .auth-buttons {
    gap: 2px;
    margin-left: 2px;
  }
  
  .auth-btn {
    font-size: 13px;
    padding: 4px 8px;
  }
  
  .user-name {
    font-size: 14px;
  }
  
  .profile-avatar {
    height: 40px;
    width: 40px;
  }
  
  .profile-container {
    padding: 2px 6px;
    gap: 4px;
    margin-left: 2px;
  }
  
  .cart-container {
    padding: 2px;
  }
}

/* === RESPONSIVE IMPROVEMENTS === */
@media (max-width: 480px) {
  .mobile-full-logo {
    height: 32px;
  }
  
  .menu-header {
    padding: 12px 16px;
  }
  
  .menu-logo {
    height: 32px;
  }
  
  .menu-item {
    padding: 16px 20px;
    
    span {
      font-size: 16px;
    }
  }
  
  .menu-footer {
    padding: 24px 20px;
  }
}

@media (max-width: 360px) {
  .mobile-full-logo {
    height: 28px;
  }
  
  .mobile-header-content {
    padding: 0 4px;
  }
  
  .menu-item {
    padding: 14px 16px;
    margin-bottom: 12px;
    
    span {
      font-size: 14px;
    }
  }
  
  .user-avatar-section {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .user-info-text {
    text-align: center;
  }
}
</style>
