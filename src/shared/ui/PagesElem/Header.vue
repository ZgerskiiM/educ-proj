<template>
  <v-layout>
    <div class="user-header mb-16">
      <v-app-bar
        class="upper-wrapper justify-center"
        density="default"
        elevation="0"
        scroll-threshold="10"
      >
        <v-container width="80vw">
          <div class="header-content">
            <div class="logo">
              <img src="/school_вектор_полный_w.png" class="logo__img" />
            </div>

            <v-btn
              color="white"
              @click="handleProfileClick"
              class="profile-btn"
              variant="text"
            >
              <div class="d-flex align-center">
                <span class="profile-text mr-2">Профиль</span>
                <v-img
                  src="/user.png"
                  height="35"
                  width="35"
                  class="black-icon"
                ></v-img>
              </div>
            </v-btn>
          </div>
        </v-container>
      </v-app-bar>
    </div>
  </v-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleProfileClick = () => {
  router.push('/LK')
}
</script>

<style lang="scss" scoped>
.upper-wrapper {
  width: 100%;
  background-color: #F48A21;
}

.black-icon {
  filter: invert(1); /* Инвертирует цвета: белый → черный */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.v-icon {
  height: 5vh;
  width: 20vw;
}

.logo {
  display: flex;
  align-items: center;
}

.logo__img {
  height: 40px;
}

.profile-btn {
  text-transform: none;
  letter-spacing: normal;
}

.profile-text {
  color: white;
  font-weight: 500;
}

/* Скрываем текст на мобильных устройствах */
@media (max-width: 600px) {
  .profile-text {
    display: none;
  }
}
</style>
