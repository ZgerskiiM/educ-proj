<template>
  <AppHeader />
  <v-app>
    <v-main>
      <HeroSection />
      <FeaturesSection />
      <AboutSection id="about" />
      <ForWhoSection />
      
      <section class="courses-section mb-15" ref="coursesSection">
        <v-container 
          class="courses-container"
          :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
          :style="coursesContainerStyle"
        >
          <h2 class="section-title mb-8">Наши курсы</h2>
          <div class="cards-grid">
            <v-card 
              v-for="(course, index) in courses" 
              :key="index"
              class="card"
              :class="{ 'card-visible': isCoursesVisible }"
              :style="getCardAnimationStyle(index)"
            >
              <div class="card-image-container">
                <v-img :src="course.image" height="200" cover class="course-image" loading="lazy"></v-img>
              </div>
              <v-card-title class="course-title">{{ course.title }}</v-card-title>
              <v-card-text class="d-flex align-center course-card-text equal-height-text">
                <p>{{ course.description }}</p>
              </v-card-text>
              <div class="price-container px-4 pb-0 mb-0">
                <span class="course-price">{{ course.price }}</span>
              </div>
              <v-card-actions class="card-actions">
                <v-btn class="cart-btn white--text w-50 text-none" @click="addToCart(course)">В корзину</v-btn>
                <v-btn variant="outlined" class="details-btn w-50 text-none">Подробнее</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </section>

      <!-- Results section -->
      <ResultsSection />

      <!-- Testimonials section -->
      <section class="testimonials-section mb-5">
        <div class="testimonials-full-width">
          <v-container 
            class="testimonials-container"
            :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
          >
            <div class="testimonials-header">
              <h2 class="section-title mb-2">Отзывы</h2>
              <div class="nav-buttons">
                <v-btn icon @click="prevTestimonial">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn icon @click="nextTestimonial">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-container>
          
          <div class="testimonials-slider">
            <div 
              class="testimonials-track" 
              :style="{ transform: `translateX(${-currentSlidePosition}px)` }"
              :key="sliderKey"
            >
              <div 
                v-for="(testimonial, index) in displayedTestimonials" 
                :key="`testimonial-${testimonial.id}-${index}`" 
                class="testimonial-slide"
                ref="testimonialSlides"
              >
                <v-card class="testimonial-card border radius-xl">
                  <div class="testimonial-content">
                    <div class="testimonial-header">
                      <v-avatar size="60">
                        <v-img :src="testimonial.avatar" alt="Аватар" />
                      </v-avatar>
                      <div class="testimonial-info">
                        <h3 class="testimonial-name font-weight-regular">{{ testimonial.name }}</h3>
                        <p class="testimonial-course font-weight-light">Курс: "{{ testimonial.course }}"</p>
                      </div>
                    </div>
                    <p class="testimonial-text font-weight-light">{{ testimonial.text }}</p>
                  </div>
                  <div class="testimonial-result">
                    <v-img 
                      :src="testimonial.resultImage"
                      alt="Результат"
                      class="testimonial-result-image"
                      cover
                    ></v-img>
                  </div>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <ContactSection id="contact" />
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useDisplay } from 'vuetify'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'
import AppHeader from '@/shared/ui/PagesElem/Header.vue'
import HeroSection from '@/shared/ui/PagesElem/HeroSection.vue'
import FeaturesSection from '@/shared/ui/PagesElem/FeaturesSection.vue'
import AboutSection from '@/shared/ui/PagesElem/AboutSection.vue'
import ForWhoSection from '@/shared/ui/PagesElem/ForWhoSection.vue'
import ResultsSection from '@/shared/ui/PagesElem/ResultsSection.vue'
import FAQSection from '@/shared/ui/PagesElem/FAQSection.vue'
import ContactSection from '@/shared/ui/PagesElem/ContactSection.vue'

const { mdAndDown, smAndDown } = useDisplay()

// Refs для слайдера отзывов
const currentTestimonial = ref(0)
const currentSlidePosition = ref(0)
const sliderKey = ref(0)
const testimonialSlides = ref<HTMLElement[]>([])

// Данные отзывов
const testimonials = ref([
  {
    id: 1,
    name: 'Мария Иванова',
    course: 'Слойка 2.0',
    avatar: '/стандарт.webp',
    text: 'Обучение превзошло все мои ожидания! Я научилась делать потрясающую выпечку, которой восхищаются мои родные и друзья. Максим очень понятно объясняет и всегда отвечает на вопросы.',
    resultImage: '/отзыв1.webp'
  },
  {
    id: 2,
    name: 'Алексей Петров',
    course: 'Хлеб от А до Я',
    avatar: '/стандарт.webp',
    text: 'Благодаря школе я открыл свою небольшую пекарню. Курс дал не только навыки выпечки, но и понимание всех процессов и тонкостей производства.',
    resultImage: '/отзыв2.webp'
  },
  {
    id: 3,
    name: 'Екатерина Смирнова',
    course: 'Слойка 2.0',
    avatar: '/стандарт.webp',
    text: 'После курса я полностью изменила подход к выпечке. Теперь мои десерты не только вкусные, но и красивые. Спасибо за подробные уроки и поддержку!',
    resultImage: '/отзыв3.webp'
  },
  {
    id: 4,
    name: 'Дмитрий Ковалев',
    course: 'Пекарская витрина',
    avatar: '/стандарт.webp',
    text: 'Я владелец небольшой пекарни, и курс помог мне значительно улучшить ассортимент и повысить качество продукции. Клиенты заметили разницу, продажи выросли вдвое!',
    resultImage: '/отзыв4.webp'
  }
])

// Создаем расширенный массив для "бесконечной" прокрутки
const displayedTestimonials = ref<any[]>([])

const setupDisplayedTestimonials = () => {
  // Дублируем отзывы для создания эффекта бесконечного слайдера
  displayedTestimonials.value = [
    ...testimonials.value, 
    ...testimonials.value, 
    ...testimonials.value
  ]
}

const slideWidth = () => {
  if (testimonialSlides.value && testimonialSlides.value.length > 0) {
    // Получаем ширину слайда + отступы
    const slide = testimonialSlides.value[0]
    const slideRect = slide.getBoundingClientRect()
    const slideStyle = window.getComputedStyle(slide)
    const marginLeft = parseInt(slideStyle.marginLeft) || 0
    const marginRight = parseInt(slideStyle.marginRight) || 0
    
    return slideRect.width + marginLeft + marginRight
  }
  return 0
}

const updateSlidePosition = () => {
  // Вычисляем полную ширину одного слайда (включая отступы)
  const fullSlideWidth = slideWidth()
  
  // Вычисляем позицию слайда
  currentSlidePosition.value = currentTestimonial.value * fullSlideWidth
  
  // Если мы достигли конца исходных отзывов, переходим к дублированным
  const totalOriginalTestimonials = testimonials.value.length
  
  if (currentTestimonial.value >= totalOriginalTestimonials * 2) {
    // После завершения анимации, мгновенно переходим к первому набору дублированных отзывов
    setTimeout(() => {
      currentTestimonial.value = currentTestimonial.value % totalOriginalTestimonials
      // Отключаем анимацию для мгновенного перехода
      const track = document.querySelector('.testimonials-track') as HTMLElement
      if (track) {
        track.style.transition = 'none'
        // Обновляем позицию
        currentSlidePosition.value = currentTestimonial.value * fullSlideWidth
        
        // Форсируем перерисовку и возвращаем анимацию
        void track.offsetHeight
        track.style.transition = 'transform 0.5s ease'
      }
    }, 500) // Ждем завершения анимации
  }
  
  if (currentTestimonial.value < 0) {
    // Если пользователь прокрутил назад ниже нуля, переходим к последнему набору дублированных отзывов
    setTimeout(() => {
      currentTestimonial.value = totalOriginalTestimonials + (currentTestimonial.value % totalOriginalTestimonials)
      if (currentTestimonial.value < 0) currentTestimonial.value = totalOriginalTestimonials - 1
      
      // Отключаем анимацию для мгновенного перехода
      const track = document.querySelector('.testimonials-track') as HTMLElement
      if (track) {
        track.style.transition = 'none'
        // Обновляем позицию
        currentSlidePosition.value = currentTestimonial.value * fullSlideWidth
        
        // Форсируем перерисовку и возвращаем анимацию
        void track.offsetHeight
        track.style.transition = 'transform 0.5s ease'
      }
    }, 500)
  }
}

const nextTestimonial = () => {
  currentTestimonial.value++
  updateSlidePosition()
}

const prevTestimonial = () => {
  currentTestimonial.value--
  updateSlidePosition()
}

// Данные курсов
const courses = ref([
  {
    title: 'Пекарская витрина: от Булок до Хлеба. Любитель',
    description: 'Подробное описание курса с ключевыми моментами обучения',
    price: '18 900 ₽',
    image: '/любитель.webp'
  },
  {
    title: 'Пекарская витрина: от Булок до Хлеба. Стандарт',
    description: 'Расширенный курс для тех, кто хочет достичь профессионального уровня',
    price: '23 900 ₽',
    image: '/стандарт.webp'
  },
  {
    title: 'Пекарская витрина: от Булок до Хлеба. Профессионал',
    description: 'Базовый курс для начинающих, идеально подходит для домашнего выпекания',
    price: '12 900 ₽',
    image: '/профессионал.webp'
  }
])

// Состояние для секции курсов
const coursesSection = ref<HTMLElement>()
const isCoursesVisible = ref(false)
const hasScrolled = ref(false)

const coursesContainerStyle = computed(() => {
  return {
    opacity: isCoursesVisible.value ? 1 : 0,
    transform: isCoursesVisible.value ? 'translateY(0)' : 'translateY(50px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
  }
})

// Вычисляем стиль для каждой карточки для каскадной анимации
const getCardAnimationStyle = (index: number) => {
  const row = Math.floor(index / 3)
  const col = index % 3
  
  return {
    '--row': row,
    '--col': col
  }
}

// Функции для работы с корзиной
const addToCart = (course: any) => {
  // Получаем текущую корзину из localStorage
  let cart = localStorage.getItem('cart')
  let cartItems: any[] = []
  
  if (cart) {
    cartItems = JSON.parse(cart)
  }
  
  // Добавляем курс в корзину
  cartItems.push(course)
  
  // Сохраняем корзину
  localStorage.setItem('cart', JSON.stringify(cartItems))
  
  // Показываем уведомление
  alert('Курс добавлен в корзину')
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

// Обработчик события прокрутки для секции курсов
const handleCoursesScroll = () => {
  hasScrolled.value = true
  if (coursesSection.value && isElementInViewport(coursesSection.value)) {
    isCoursesVisible.value = true
    // Отключаем обработчик после срабатывания
    window.removeEventListener('scroll', handleCoursesScroll)
  }
}

onMounted(() => {
  setupDisplayedTestimonials()
  
  // Устанавливаем начальную позицию на первый набор дублированных отзывов
  // чтобы можно было прокручивать как вперед, так и назад
  currentTestimonial.value = testimonials.value.length
  
  // После монтирования элементов измеряем ширину слайда
  // и устанавливаем позицию для каждого слайда
  nextTick(() => {
    updateSlidePosition()
  })
  
  // Обработка изменения размера окна
  window.addEventListener('resize', updateSlidePosition)

  // Проверяем сразу после загрузки, находится ли секция в области видимости
  // Это поможет при перезагрузке страницы, когда пользователь уже проскроллил вниз
  nextTick(() => {
    if (coursesSection.value && isElementInViewport(coursesSection.value)) {
      isCoursesVisible.value = true
      hasScrolled.value = true
    } else {
      // Запуск с небольшой задержкой для предотвращения ложных срабатываний при загрузке
      setTimeout(() => {
        // Проверяем, была ли уже прокрутка
        if (hasScrolled.value) {
          // Если была прокрутка, проверяем видимость
          if (coursesSection.value && isElementInViewport(coursesSection.value)) {
            isCoursesVisible.value = true
          } else {
            window.addEventListener('scroll', handleCoursesScroll)
          }
        } else {
          // Если не была прокрутка, добавляем обработчик
          window.addEventListener('scroll', handleCoursesScroll)
        }
      }, 200)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidePosition)
  window.removeEventListener('scroll', handleCoursesScroll)
})
</script>

<style scoped>
.v-main {
  background-color: #fff8f0;
}

h2 {
  font-size: 2rem;
}

/* Section styles */
.section-title {
  text-align: left;
  margin-bottom: 2rem;
  font-weight: 600;
}

.courses-section, .after-course-section, .testimonials-section, .faq-section, .contact-section {
  display: flex;
  justify-content: center;
}

.courses-container, .testimonials-container, .faq-container {
  margin: 0 auto;
  will-change: opacity, transform;
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.card.card-visible {
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease-out;
  transition-delay: calc(0.3s + (var(--row, 0) * 0.15s) + (var(--col, 0) * 0.15s));
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-image-container {
  padding: 12px;
}

.course-image {
  border-radius: 8px;
}

.course-title {
  font-size: 1.1rem;
  line-height: 1.4;
  padding-bottom: 0;
}

.price-container {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.course-price {
  font-weight: 600;
  font-size: 1.3rem;
  color: #f48a21;
}

.card-actions {
  padding: 16px;
  padding-top: 4px !important;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  gap: 0.5rem;
}

.details-btn {
  border: 1px solid #000;
  color: #000;
  border-radius: 8px;
  font-weight: 600;
}

.details-btn:hover {
  background-color: #000;
  color: white;
}

.cart-btn {
  color: white;
  background-color: #ff8a04;
  border-radius: 8px;
  font-weight: 600;
}

.equal-height-text {
  min-height: 80px;
}

.course-card-text {
  min-height: 80px;
  padding: 0 1rem;
  color: #666;
}

.card .v-card-title {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  hyphens: auto;
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  padding: 1rem 1rem 0.5rem;
}

.card .v-card-text {
  flex-grow: 1;
}

.testimonials-section {
  padding: 80px 0;
  background: #fff8f0;
}

.testimonials-full-width {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.testimonials-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.testimonials-slider {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 0 20px;
}

.testimonials-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-slide {
  flex: 0 0 auto;
  width: 40vw;
  padding: 0 15px;
  box-sizing: border-box;
  min-width: 400px;
}

.testimonial-card {
  display: flex;
  padding: 2rem;
  gap: 2rem;
  height: 40vh;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 16px;
  background-color: white;
}

.testimonial-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.testimonial-info {
  display: flex;
  flex-direction: column;
}

.testimonial-name {
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}

.testimonial-course {
  font-style: italic;
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

.testimonial-text {
  line-height: 1.6;
  font-size: 1rem;
  color: #555;
}

.testimonial-result {
  flex: 1;
  min-width: 40%;
  height: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  overflow: hidden;
}

.testimonial-result-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Contact section */
.contact-container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

/* Miscellaneous */
.white--text {
  color: white !important;
}

.v-footer {
  background-color: #FFF8F0;
}

.v-divider {
  height: 1px;
}

.footer-text {
  font-size: 0.9rem;
}

a {
  color: #313131;
}

.v-expansion-panel-title {
  font-size: 1.2rem;
  font-weight: 300;
}

/* Responsive styles */
@media (max-width: 821px) {
  .v-footer {
    padding-bottom: 15px;
  }

  .text-md-right {
    text-align: left !important;
  }

  .v-btn {
    padding-left: 0 !important;
  }

  .section-title {
    font-size: 1.8rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .testimonial-slide {
    min-width: 300px;
    width: 90vw;
  }
  
  .testimonials-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .testimonial-card {
    flex-direction: column;
    height: auto;
    gap: 1rem;
  }

  .testimonial-result {
    min-width: auto;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>