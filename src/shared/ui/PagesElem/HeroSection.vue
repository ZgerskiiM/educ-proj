<template>
  <div class="image-container">
    <v-img src="/head-bhg.webp" cover class="bg-image"/>
    <div class="content-overlay">
      <v-container 
        class="content-inner"
        :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
      >
        <h1 class="text-white">BABICH SCHOOL</h1>
        <p class="text-white subtitle mb-6">ОНЛАЙН-ШКОЛА ВЫПЕЧКИ И ХЛЕБА</p>
        <v-btn color="orange" size="large" class="white--text text-none font-weight-regular" to="/catalog">К курсам</v-btn>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { mdAndDown, smAndDown } = useDisplay()
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.content-inner {
  text-align: left;
  padding: 1rem;
  margin: 0 auto;
}



h1 {
  font-size: 5rem;
  font-weight: 800;
}

.subtitle {
  font-size: 3.5rem;
  font-weight: 600;
  width: 50vw;
}

.white--text {
  color: white !important;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 2rem;
    width: 90vw;
  }
}
</style> 