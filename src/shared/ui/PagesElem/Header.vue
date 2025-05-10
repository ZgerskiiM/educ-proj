<template>
  <v-layout class="mb-16">
    <v-app-bar class="upper-wrapper justify-center" elevation="0" height="80" app>
      <v-container :width="mdAndDown ? '100vw' : '60vw'">
        <div class="header-content">
          <div class="left-section">
            <div class="logo">
              <img :src="mdAndDown ? '/school_вектор.png' : '/school_вектор_полный_w.png'" class="logo__img" />
            </div>
            <div class="divider" v-if="!mdAndDown"></div>
            <div class="nav-links" v-if="!mdAndDown">
              <v-btn color="white" to="/catalog" class="nav-btn" variant="text">Каталог</v-btn>
              <v-btn color="white" to="/about" class="nav-btn" variant="text">О нас</v-btn>
              <v-btn color="white" to="/support" class="nav-btn" variant="text">Поддержка</v-btn>
            </div>
          </div>
          
          <!-- Меню-бургер для мобильных устройств -->
          <v-menu v-if="mdAndDown" offset-y>
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props" 
                icon 
                variant="text"
                color="white"
                class="burger-menu-btn"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/catalog">
                <v-list-item-title>Каталог</v-list-item-title>
              </v-list-item>
              <v-list-item to="/about">
                <v-list-item-title>О нас</v-list-item-title>
              </v-list-item>
              <v-list-item to="/support">
                <v-list-item-title>Поддержка</v-list-item-title>
              </v-list-item>
              <v-list-item to="/profile">
                <v-list-item-title>Профиль</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <div class="profile-container" @click="handleProfileClick" v-if="!mdAndDown">
            <v-avatar class="profile-avatar" rounded>
              <v-img src="/user.png" class="black-icon"></v-img>
            </v-avatar>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </v-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()

const router = useRouter()

const handleProfileClick = () => {
  router.push('/profile')
}
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

.profile-container {
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.profile-avatar {
  height: 40px;
  width: 40px;
}

.black-icon {
  filter: invert(1);
}

.burger-menu-btn {
  margin-left: auto;
}

/* Дополнительные стили для адаптивности уже не нужны, 
   так как используется v-if с mdAndDown из Vuetify */
</style>
