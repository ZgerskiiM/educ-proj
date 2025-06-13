<template>
  <section class="contact-section" :id="id">
    <div class="contact-wrapper">
      <div class="image-left">
        <img src="/image1.png" alt="Декоративное изображение" class="decoration-image">
      </div>

      <div class="contact-container">
        <h2 class="text-center">Остались вопросы?</h2>
        <p class="text-center mb-2">Мы всегда на связи</p>
        <div class="text-center">
          <v-btn
            class="font-weight-medium text-none"
            size="large"
          >
            Служба поддержки
          </v-btn>
        </div>
      </div>

      <div class="image-right">
        <img src="/image2.png" alt="Декоративное изображение" class="decoration-image">
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id?: string
}>()
</script>

<style scoped>
.contact-section {
  padding: 4vh 0;
  background-color: #FFF8F0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
  overflow: visible;
}

.contact-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100%;
  position: relative;
}

.contact-container {
  text-align: center;
  color: #333132;
  width: 40vw;
  z-index: 2;
  position: relative;
  margin: 0 auto;
}

.contact-container p {
  color: #646464;
  font-size: 1.8rem;
  font-weight: 600;
}

.image-left, .image-right {
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
}

.image-left {
  position: absolute;
  left: 0;
}

.image-right {
  position: absolute;
  right: 0;
}

.decoration-image {
  width: auto;
  height: 80vh;
  object-fit: contain;
  display: block;
}

.v-btn {
  color: #FFF8F0;
  background-color: #F58C24;
}

h2 {
  font-size: 2.5rem;
  font-weight: 600;
}

p {
  font-size: 2vw;
}

/* Для мобильных экранов */
@media (max-width: 960px) {
  .contact-section {
    padding: 5vh 3vw;
  }

  .contact-wrapper {
    flex-direction: column;
  }

  .contact-container {
    width: 80vw;
  }

  h2 {
    font-size: 5vw;
  }

  p {
    font-size: 3vw;
  }

  .image-left, .image-right {
    display: none;
  }
}
</style>
