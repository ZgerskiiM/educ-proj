<template>
  <section class="about-section" ref="sectionRef" :id="id">
    <div
      class="about-section-wrapper"
      :style="containerStyle"
    >
      <div class="about-container" :style="textStyle">
        <p class="about-section-subtitle">Шеф-пекарь школы</p>
        <h2 class="about-section-title">Максим Бабич</h2>
        <p class="about-section-description">
          Основатель онлайн-школы Babich School, Бренд-шеф пекарь легендарной Ленинградской пирожковой «Минутка» и ресторана на Бали Joy.
        </p>
        <ul class="achievements-list">
          <li>Лучший пекарь и Лучшие булочки по версии sobaka.ru</li>
          <li>Проходил обучение в Италии, Испании, ОАЭ</li>
          <li>Консультант 60+ пекарен в России</li>
          <li>Постоянный эксперт GASTREET, Moscow Cake Show, PIR EXPO</li>
          <li>Работал в ресторане со звездой Мишлен</li>
        </ul>
        <blockquote class="about-section-quote">
          «Тебе не нужно быть гением, чтобы научиться классно печь, с этим помогу я»
        </blockquote>
      </div>
      <div class="about-image" :style="imageStyle">
        <img class="about-image-img" src="/scale_1200.png" alt="Максим Бабич">
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

// Accept id as a prop
const props = defineProps<{
  id?: string
}>()

const sectionRef = ref<HTMLElement>()
const isVisible = ref(false)
const hasScrolled = ref(false)

// Стили для контейнера с анимацией
const containerStyle = computed(() => {
  return {
    opacity: isVisible.value ? 1 : 0.7,
    transition: 'opacity 0.8s ease-out'
  }
})

// Стили для текстового блока с анимацией
const textStyle = computed(() => {
  return {
    opacity: isVisible.value ? 1 : 0,
    transform: isVisible.value ? 'translateX(0)' : 'translateX(-50px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
  }
})

// Стили для блока изображения с анимацией
const imageStyle = computed(() => {
  return {
    opacity: isVisible.value ? 1 : 0,
    transform: isVisible.value ? 'translateX(0)' : 'translateX(50px)',
    transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
  }
})

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
.about-section {
  background-color: #fff8f0;
  color: #333333;
  width: 100%;
  position: relative;
  overflow: visible;
  padding: 2rem 0;
}

.about-section-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  will-change: opacity;
}

.about-section-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #2c2c2c;
  padding-top: 0;
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.about-section-subtitle {
  font-size: 1.2rem;
  color: #666666;
  font-weight: 500;
  padding-bottom: 0;
  margin-bottom: 0.5rem;
}

.about-section-description {
  font-size: 1.1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.about-section-quote {
  border-left: 4px solid #f8a21f;
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 500;
  color: #2c2c2c;
}

.about-container {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  will-change: opacity, transform;
}

.about-container h2, .about-container ul {
  margin-bottom: 1.5rem;
}

.achievements-list {
  list-style: none;
  padding-left: 0;
  margin-left: 0;
}

.achievements-list li {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #555555;
}

.achievements-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 12px;
  height: 12px;
  background: #f8a21f;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(248, 162, 31, 0.3);
}

.about-image {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 35%;
  min-height: 100%;
  will-change: opacity, transform;
}

.about-image-img {
  width: 100%;
  height: 100%;
  max-height: 600px;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1280px) and (min-width: 961px) {
  .about-section {
    padding: 2rem 0;
  }

  .about-section-title {
    font-size: 2.5rem;
  }

  .about-section-subtitle {
    font-size: 1rem;
  }

  .about-section-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .about-section-quote {
    font-size: 0.95rem;
    padding-left: 1.2rem;
  }

  .achievements-list li {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
}

@media (max-width: 960px) {
  .about-section {
    padding: 1.5rem 0;
  }

  .about-section-wrapper {
    flex-direction: column;
    width: 95%;
    text-align: center;
  }

  .about-container {
    width: 100%;
    margin-bottom: 2rem;
  }

  .about-section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .about-section-subtitle {
    font-size: 1.1rem;
  }

  .about-section-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .about-section-quote {
    font-size: 1rem;
    padding-left: 1.2rem;
    margin: 1.5rem 0;
  }

  .achievements-list {
    text-align: left;
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }

  .achievements-list li {
    font-size: 0.95rem;
    margin-bottom: 0.8rem;
  }

    .about-image {
    width: 100%;
    justify-content: center;
    min-height: 400px;
    align-items: center;
  }

  .about-image-img {
    width: 80%;
    max-width: 350px;
    height: auto;
    max-height: none;
    object-fit: contain;
  }
}
</style>
