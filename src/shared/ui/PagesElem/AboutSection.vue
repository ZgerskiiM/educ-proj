<template>
  <section class="about-section" ref="sectionRef" :id="id">
    <div 
      class="about-section-wrapper"
      :style="containerStyle"
    >
      <div class="about-container" :style="textStyle">
        <p class="about-section-subtitle">Шеф-пекарь школы</p>
        <h2 class="about-section-title">Максим Бабич</h2>
        <ul> 
          <li>Лучший пекарь и Лучшие булочки
              по версии sobaka.ru</li>
          <li>Проходил обучение в Италии, Испании, ОАЭ</li>
          <li>Консультант 60+ пекарен в России</li>
          <li>Постоянный эксперт GASTREET, 
              Moscow Cake Show, PIR EXPO </li>
          <li>Работал в ресторане со звездой Мишлен</li>
        </ul>
        <h2 class="about-section-quote">«Тебе не нужно быть гением, чтобы научиться классно печь, с этим помогу я»</h2>
      </div>
      <div class="about-image" :style="imageStyle">
        <img class="about-image-img" src="/Babich.png" alt="Максим Бабич">
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
  background: linear-gradient(to right, #f8a21f 0%, #ffa143 71%, #ff8104 100%);
  color: white;
  width: 100%;
  position: relative;
  overflow: visible;
  padding: 2rem 0 0 0;
}

.about-section-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  position: relative;
  will-change: opacity;
}

.about-section-title {
  font-size: 3.5rem;
  padding-top: 0;
  margin-top: 0;
}

.about-section-quote {
  font-weight: 500;
}

.about-section-subtitle {
  font-size: 1.2rem;
  padding-bottom: 0;
  margin-bottom: 0;
}

.about-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  will-change: opacity, transform;
}

.about-container h2, .about-container ul {
  margin-bottom: 1.2rem;
}

.about-container p {
  font-size: 1.1rem;
}

.about-container h2:last-of-type {
  font-size: 1.8rem;
}

.about-container ul {
  list-style: none;
  padding-left: 1.5rem;
  margin-left: 1rem;
  position: relative;
}

.about-container ul::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  background-color: white;
  z-index: 0;
}

.about-container li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.about-container li::before {
  content: none;
}

.about-image {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 40vw;
  min-height: 100%;
  will-change: opacity, transform;
}

.about-image-img {
  width: 40vw;
  position: absolute;
  top: -27.8vh;
}

@media (min-width: 961px) {
  .about-image-img {
    bottom: 0;
    top: auto;
  }
}



@media (max-width: 1280px) and (min-width: 961px) {
  .about-section {
    padding: 0.5rem 0 0 0;
  }
  
  .about-section-title {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0.4rem;
  }
  
  .about-section-subtitle {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
  
  .about-container .about-section-quote {
    font-size: 0.825rem !important;
    margin-bottom: 0.1rem;
  }
  
  .about-container {
    justify-content: space-around;
  }
  
  .about-container h2, .about-container ul {
    margin-bottom: 0.4rem;
  }
  
  .about-container p {
    font-size: 0.8rem;
  }
  
  .about-container li {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }
  
  .about-image {
    min-height: 42vh;
  }
  
  .about-image-img {
    bottom: 0;
    top: auto;
    width: 48vw;
    right: 0;
  }
}

@media (max-width: 960px) {
  .about-section {
    padding: 0.5rem 0 0 0;
  }
  
  .about-section-wrapper {
    flex-direction: column;
    width: 95%;
    text-align: center;
  }
  
  .about-container {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .about-container li {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  
  .about-section-title {
    font-size: 2.5rem;
  }
  

  
  .about-image {
    width: 100%;
    justify-content: center;
  }
  
  .about-image-img {
    width: 50vw;
    position: static;
    top: auto;
  }
}
</style> 