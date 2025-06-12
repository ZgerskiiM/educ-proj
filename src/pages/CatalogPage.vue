<template>
  <AppHeader />
  <v-app>
    <v-main>
      <section class="catalog-section py-8">
        <v-container
          class="catalog-container"
          :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
        >
          <h1 class="section-title">Каталог курсов</h1>

          <div class="search-container mb-8">
            <v-text-field
              v-model="searchQuery"
              label="Поиск курса"
              variant="outlined"
              prepend-inner-icon="mdi-magnify"
              clearable
              hide-details
              class="search-field"
              density="comfortable"
              @update:model-value="filterCourses"
            ></v-text-field>
          </div>

          <div class="cards-grid">
            <v-card
              v-for="(course, index) in filteredCourses"
              :key="index"
              class="card"
            >
              <div class="card-image-container">
                <v-img :src="course.image" height="200" cover class="course-image" loading="lazy"></v-img>
              </div>
              <v-card-title class="course-title">{{ course.title }}</v-card-title>
              <v-card-text class="d-flex align-center course-card-text">
                <p>{{ course.description }}</p>
              </v-card-text>
              <div class="price-container px-4 pb-0 mb-0">
                <span class="course-price">{{ course.price }}</span>
              </div>
              <v-card-actions class="card-actions">
                <v-btn
                  class="cart-btn white--text w-50 text-none"
                  :disabled="isInCart(course)"
                  @click="addToCart(course)"
                >
                  {{ isInCart(course) ? 'Добавлено' : 'В корзину' }}
                </v-btn>
                <v-btn variant="outlined" class="details-btn w-50 text-none">Подробнее</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </section>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import AppHeader from '@/shared/ui/PagesElem/Header.vue'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'

const router = useRouter()
const { mdAndDown, smAndDown } = useDisplay()

// Поиск курса
const searchQuery = ref('')

// Данные для курсов
const courses = [
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
  },
]

// Отфильтрованные курсы на основе поискового запроса
const filteredCourses = computed(() => {
  if (!searchQuery.value) return courses

  const query = searchQuery.value.toLowerCase().trim()
  return courses.filter(course =>
    course.title.toLowerCase().includes(query) ||
    course.description.toLowerCase().includes(query)
  )
})

// Функция фильтрации курсов (для оптимизации производительности)
const filterCourses = () => {
  // Эта функция используется для обработки события ввода
  // Сама фильтрация происходит в computed-свойстве filteredCourses
}

const cartItems = ref<any[]>([])

onMounted(() => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    cartItems.value = JSON.parse(cart)
  }
})

const isInCart = (course: any) => {
  return cartItems.value.some(
    (item) => item.title === course.title && item.price === course.price
  )
}

const addToCart = (course: any) => {
  // Получаем текущую корзину из localStorage
  let cart = localStorage.getItem('cart')
  let items: any[] = []
  if (cart) {
    items = JSON.parse(cart)
  }
  // Если уже есть, не добавляем повторно
  if (items.some((item) => item.title === course.title && item.price === course.price)) {
    return
  }
  // Добавляем курс в корзину
  items.push(course)
  cartItems.value = items
  // Сохраняем корзину
  localStorage.setItem('cart', JSON.stringify(items))
  // Отправляем событие об обновлении корзины
  window.dispatchEvent(new Event('cartUpdated'))
}
</script>

<style scoped>
.v-main {
  background-color: #fff8f0;
}

/* Common layout styles */

h1 {
  font-size: 2.5rem;
  font-weight: 600;
}

/* Section styles */
.section-title {
  text-align: left;
  margin-bottom: 2rem;
  font-weight: 600;
}

.catalog-section {
  display: flex;
  justify-content: center;
}

.catalog-container {
  margin: 0 auto;
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 2rem;
}

/* Card styles */
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.7vw;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  color: #333;
}

.card-actions {
  padding: 16px;
  padding-top: 4px !important;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.details-btn {
  border: 1px solid #000;
  color: #000;
}

.details-btn:hover {
  background-color: #000;
  color: white;
}

.cart-btn {
  color: white;
  background-color: #ff8a04;
}

.cart-btn:disabled {
  background-color: #ccc;
  color: #666;
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

/* Search styles */
.search-container {
  width: 100%;
  max-width: 600px;
}

.search-field {
  background-color: white;
  border-radius: 8px;
}

.v-field__input {
  font-size: 1rem;
}

/* Footer styles */
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

/* Responsive styles */
@media (max-width: 959px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
}

@media (max-width: 599px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .catalog-section {
    padding-top: 5rem;
  }

  h1 {
    font-size: 2.2rem;
  }

  .v-footer {
    padding-bottom: 15px;
  }

  .text-md-right {
    text-align: left !important;
  }

  .v-btn {
    padding-left: 0 !important;
  }
}
</style>
