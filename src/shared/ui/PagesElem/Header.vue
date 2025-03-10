<template>
  <v-layout>
      <div class="user-header mb-16">
      <v-app-bar
          class="upper-wrapper justify-center rounded-xl ma-2"
          density="default"
          elevation="0"
          scroll-threshold="10"
      >
      <v-container width="80vw">
          <div class="header-content">
              <div class="logo">
                  <img src="/public/school_вектор_полный_w.png" class="logo__img" />
              </div>

              <v-btn
                icon
                color="white"
                @click="handleProfileClick"
              >

                  <v-icon size="x-large">mdi-account-circle-outline</v-icon>

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

</style>
