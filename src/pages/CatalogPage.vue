<template>
  <AppHeader />
  <v-app>
    <v-main>
      <section class="catalog-section py-8">
        <v-container
          class="catalog-container"
          :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
        >
          <h1 class="section-title catalog-title">Каталог курсов</h1>

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
            <CourseCard
              v-for="(course, index) in filteredCourses"
              :key="index"
              :course="course"
              @addToCart="handleAddToCart"
            />
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
import CourseCard from '@/shared/ui/CourseCard.vue'

const router = useRouter()
const { mdAndDown, smAndDown } = useDisplay()

// Поиск курса
const searchQuery = ref('')

// Данные для курсов
const courses = [
  {
    title: 'Пекарская витрина: от Булок до Хлеба. Любитель',
    description: 'Базовый курс для начинающих, идеально подходит для домашнего выпекания',
    price: '18 900 ₽',
    image: '/любитель.webp'
  },
  {
    title: 'Пекарская витрина: от Булок до Хлеба. Стандарт',
    description: 'Подробное описание курса с ключевыми моментами обучения',
    price: '30 900 ₽',
    image: '/стандарт.webp'
  },
  {
    title: 'Пекарская витрина: от Булок до Хлеба. Профессионал',
    description: 'Расширенный курс для тех, кто хочет достичь профессионального уровня',
    price: '54 900 ₽',
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

const handleAddToCart = (course: any) => {
  // Показываем уведомление
  console.log('Курс добавлен в корзину:', course.title)
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

h1.catalog-title {
  text-transform: capitalize !important;
  text-decoration: none !important;
  border-bottom: none !important;
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

/* Modal styles */
.course-details {
  line-height: 1.6;
}

.course-header {
  text-align: center;
}

.feature-badge {
  display: inline-block;
}

.badge-title {
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.badge-title-premium {
  background: linear-gradient(135deg, #ff6b35, #ff8e53);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
  position: relative;
}

.badge-title-premium::after {
  content: "★";
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ffd700;
  color: #ff6b35;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.badge-title-professional {
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(106, 27, 154, 0.4);
  position: relative;
}

.badge-title-professional::before {
  content: "💎";
  position: absolute;
  top: -8px;
  left: -8px;
  background: #ffd700;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.badge-title-professional::after {
  content: "👑";
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ffd700;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

/* Key features grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.feature-card {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  border-color: #ff8a04;
}

.feature-icon {
  font-size: 1.5rem;
  min-width: 32px;
}

.feature-text {
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;
}

.premium-feature {
  border: 2px solid #ff6b35;
  background: linear-gradient(135deg, #fff5f0, #ffe8e0);
}

.premium-feature:hover {
  border-color: #ff6b35;
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.2);
}

.vip-feature {
  border: 2px solid #6a1b9a;
  background: linear-gradient(135deg, #f3e5f5, #e1bee7);
  position: relative;
}

.vip-feature:hover {
  border-color: #6a1b9a;
  box-shadow: 0 6px 20px rgba(106, 27, 154, 0.3);
}

.vip-feature::before {
  content: "VIP";
  position: absolute;
  top: -8px;
  right: 8px;
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  color: white;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(106, 27, 154, 0.3);
}

/* Section titles */
.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 3px solid #ff8a04;
  padding-bottom: 8px;
  display: inline-block;
}

/* Content blocks */
.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-block {
  background: linear-gradient(135deg, #fff, #f9f9f9);
  border-radius: 12px;
  padding: 20px;
  border-left: 5px solid #ff8a04;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}

.content-block:hover {
  transform: translateX(5px);
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.block-number {
  background: linear-gradient(135deg, #ff8a04, #ff6f00);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}

.block-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.block-description {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Pre-week section */
.preweek-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preweek-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 2px solid #e8f4fd;
  transition: border-color 0.2s ease;
}

.preweek-item:hover {
  border-color: #4a90e2;
}

.preweek-icon {
  font-size: 1.5rem;
  min-width: 32px;
}

.preweek-text {
  color: #333;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Guides section */
.guides-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.guide-card {
  background: linear-gradient(135deg, #f0f8ff, #e8f4fd);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-left: 5px solid #4a90e2;
}

.guide-icon {
  font-size: 1.8rem;
  min-width: 36px;
}

.guide-content {
  flex: 1;
}

.guide-text {
  font-size: 1rem;
  color: #333;
  font-style: italic;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

.business-guide {
  background: linear-gradient(135deg, #fff3e0, #ffe8cc);
  border-left: 5px solid #ff9800;
  position: relative;
}

.business-guide::before {
  content: "БИЗНЕС";
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #ff9800, #ff6f00);
  color: white;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(255, 152, 0, 0.3);
}

/* Payment section */
.payment-section {
  background: linear-gradient(135deg, #fff3e0, #ffe0b3);
  border-radius: 12px;
  padding: 4px;
}

.payment-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 2px solid #ffcc80;
}

.payment-icon {
  font-size: 1.5rem;
  min-width: 32px;
}

.payment-text {
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.result-image {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.installment-text {
  color: #666;
  font-style: italic;
  margin: 0;
}

.modal-price {
  font-size: 2rem;
  font-weight: 700;
  color: #ff8a04;
}

.cart-btn-modal {
  background-color: #ff8a04 !important;
  padding: 12px 24px;
}

.cart-btn-modal:disabled {
  background-color: #ccc !important;
  color: #666 !important;
}

/* Responsive styles */
@media (max-width: 1500px) {
  .card .v-card-title {
    font-size: 1.1rem;
  }

  .course-price {
    font-size: 1.1rem;
  }

  .course-card-text {
    font-size: 0.85rem;
  }
}

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

  /* Modal responsive styles */
  .features-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .feature-card {
    padding: 16px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .content-block {
    padding: 16px;
  }

  .block-header {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .preweek-item,
  .guide-card,
  .payment-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .images-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
