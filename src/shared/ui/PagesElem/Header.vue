<template>
  <v-layout class="mb-16">
    <v-app-bar class="upper-wrapper justify-center" elevation="0" height="80" app>
      <v-container :width="mdAndDown ? '100vw' : '60vw'">
        <div class="header-content">
          <div class="logo">
            <img src="/school_вектор_полный_w.png" class="logo__img" />
          </div>

          <v-btn color="white" @click="handleProfileClick" class="profile-btn" variant="text">
            <div class="d-flex align-center">
              <span class="profile-text mr-2 font-weight-regular">Профиль</span>
              <v-img src="/user.png" height="35" width="35" class="black-icon"></v-img>
            </div>
          </v-btn>
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

.logo {
  display: flex;
  align-items: center;
}

.logo__img {
  height: 4vh;
}

.black-icon {
  filter: invert(1);
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
