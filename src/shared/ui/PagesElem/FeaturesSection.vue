<template>
  <section class="cards-section" ref="sectionRef">
    <v-container
      class="cards-container"
      :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
      :style="containerStyle"
    >
      <h2 class="section-title mb-8">Что вас ждет</h2>
      <div class="cards-grid">
        <v-card class="card card-1" :style="cardStyle(0)">
          <v-card-title>Постоянная поддержка</v-card-title>
          <v-card-text class="d-flex align-center equal-height-text">
            <p>Научитесь печь различные виды хлеба с нуля. Изучите основы ферментации и работы с закваской.</p>
          </v-card-text>
        </v-card>

        <v-card class="card card-2" :style="cardStyle(1)">
          <v-card-title>Удобная платформа для обучения</v-card-title>
          <v-card-text class="d-flex align-center equal-height-text">
            <p>Продвинутый курс по кондитерскому искусству. Муссовые торты, антреме и многое другое.</p>
          </v-card-text>
        </v-card>

        <v-card class="card card-3" :style="cardStyle(2)">
          <v-card-title>Понятное обучение</v-card-title>
          <v-card-text class="d-flex align-center equal-height-text">
            <p>Постоянная связь с Максимом Бабичем и командой</p>
          </v-card-text>
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
.cards-section {
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.cards-container {
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
  border-radius: 0.7vw;
  background-color: white;
  will-change: transform;
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Уникальные фоновые паттерны для каждой карточки */
.card-1::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 138, 4, 0.18) 0%, transparent 40%),
    linear-gradient(45deg, rgba(255, 138, 4, 0.12) 0%, transparent 50%);
  border-radius: 0 0.7vw 0 100%;
  z-index: 1;
}

.card-1::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(255, 138, 4, 0.15), rgba(248, 162, 31, 0.15));
  border-radius: 50%;
  z-index: 1;
}

.card-2::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  background:
    conic-gradient(from 45deg, rgba(255, 138, 4, 0.18), transparent, rgba(255, 138, 4, 0.12), transparent);
  border-radius: 50%;
  z-index: 1;
}

.card-2::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: 80px solid transparent;
  border-bottom: 80px solid rgba(255, 138, 4, 0.14);
  z-index: 1;
}

.card-3::before {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 138, 4, 0.25), rgba(248, 162, 31, 0.20), rgba(255, 161, 67, 0.15));
  border-radius: 50%;
  z-index: 1;
}

.card-3::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 20px;
  width: 60px;
  height: 30px;
  background: linear-gradient(90deg, rgba(255, 138, 4, 0.18), transparent);
  border-radius: 50px 50px 0 0;
  z-index: 1;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
}

.equal-height-text {
  min-height: 80px;
}

.card .v-card-title {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  hyphens: auto;
  position: relative;
  z-index: 2;
}

.card .v-card-text {
  flex-grow: 1;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  /* Уменьшаем размеры декоративных элементов на мобильных */
  .card-1::before {
    width: 80px;
    height: 80px;
  }

  .card-1::after {
    width: 40px;
    height: 40px;
  }

  .card-2::before {
    width: 70px;
    height: 70px;
  }

  .card-2::after {
    border-left-width: 50px;
    border-bottom-width: 50px;
  }

  .card-3::before {
    width: 60px;
    height: 60px;
  }

  .card-3::after {
    width: 40px;
    height: 20px;
  }
}
</style>
