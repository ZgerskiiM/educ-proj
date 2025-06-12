<template>
  <section class="for-who-section" ref="sectionRef">
    <v-container
      class="for-who-container"
      :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
      :style="containerStyle"
    >
      <h2 class="section-title mb-8">Кому подойдет обучение?</h2>
      <div class="cards-grid">
        <v-card class="card" :style="cardStyle(0)">
          <div class="card-content">
            <div class="card-image-container">
              <img src="/стандарт.webp" alt="Домашний пекарь" class="card-image" loading="lazy" />
            </div>
            <div class="card-text-content">
              <v-card-title>Домашний пекарь</v-card-title>
              <v-card-text class="equal-height-text">
                <p>Если вы хотите научиться печь хлеб и булочки дома, то этот курс для вас.</p>
              </v-card-text>
            </div>
          </div>
        </v-card>
        <v-card class="card" :style="cardStyle(1)">
          <div class="card-content">
            <div class="card-image-container">
              <img src="/стандарт.webp" alt="Работник кухни или цеха" class="card-image" loading="lazy" />
            </div>
            <div class="card-text-content">
              <v-card-title>Работник кухни или цеха</v-card-title>
              <v-card-text class="equal-height-text">
                <p>Если вы хотите научиться печь хлеб и булочки дома, то этот курс для вас.</p>
              </v-card-text>
            </div>
          </div>
        </v-card>
        <v-card class="card" :style="cardStyle(2)">
          <div class="card-content">
            <div class="card-image-container">
              <img src="/стандарт.webp" alt="Владелец производства" class="card-image" loading="lazy" />
            </div>
            <div class="card-text-content">
              <v-card-title>Владелец производства</v-card-title>
              <v-card-text class="equal-height-text">
                <p>Если вы хотите научиться печь хлеб и булочки дома, то этот курс для вас.</p>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndDown, smAndDown } = useDisplay()

const sectionRef = ref<HTMLElement>()
const isVisible = ref(false)
const hasScrolled = ref(false)

// Стили для контейнера с анимацией
const containerStyle = computed(() => {
  return {
    opacity: isVisible.value ? 1 : 0,
    transform: isVisible.value ? 'translateY(0)' : 'translateY(50px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
  }
})

// Стили для карточек с анимацией и задержкой
const cardStyle = (index: number) => {
  const delay = 0.3 + (index * 0.2)

  return {
    opacity: isVisible.value ? 1 : 0,
    transform: isVisible.value ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`
  }
}

// Функция для проверки, виден ли элемент в области просмотра
const isElementInViewport = (el: HTMLElement) => {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  )
}

// Обработчик события прокрутки
const handleScroll = () => {
  hasScrolled.value = true
  if (sectionRef.value && isElementInViewport(sectionRef.value)) {
    isVisible.value = true
    // Отключаем обработчик после срабатывания
    window.removeEventListener('scroll', handleScroll)
  }
}

onMounted(() => {
  // Проверяем сразу после загрузки, находится ли секция в области видимости
  // Это поможет при перезагрузке страницы, когда пользователь уже проскроллил вниз
  if (sectionRef.value && isElementInViewport(sectionRef.value)) {
    isVisible.value = true
    hasScrolled.value = true
  } else {
    // Запуск с небольшой задержкой для предотвращения срабатывания при загрузке
    setTimeout(() => {
      // Проверяем, была ли уже прокрутка
      if (hasScrolled.value) {
        // Если была прокрутка, проверяем видимость
        if (sectionRef.value && isElementInViewport(sectionRef.value)) {
          isVisible.value = true
        } else {
          window.addEventListener('scroll', handleScroll)
        }
      } else {
        // Если не было прокрутки, добавляем обработчик
        window.addEventListener('scroll', handleScroll)
      }
    }, 200)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.for-who-section {
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.for-who-container {
  margin: 0 auto;
  will-change: opacity, transform;
}

.section-title {
  text-align: left;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 2rem;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 1.5rem;
  will-change: transform;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.card-image-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-text-content {
  width: 100%;
}

.equal-height-text {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card .v-card-title {
  padding: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  hyphens: auto;
}

.card .v-card-text {
  padding: 0;
  flex-grow: 1;
}

.card .v-card-text p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
}
</style> 