<template>
  <div>
    <!-- Course Card -->
    <v-card class="course-card" :class="cardClass">
      <div class="card-image-container">
        <div class="image-wrapper">
          <v-img :src="course.image" height="200" cover class="course-image" loading="lazy"></v-img>
          <div class="image-overlay"></div>
          <div class="course-badge">
            <span class="badge-text">Старт второго потока</span>
            <span class="badge-date">с 25 сентября</span>
          </div>
        </div>
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
          disabled
          @click="handleAddToCart"
        >
          В корзину
        </v-btn>
        <v-btn variant="outlined" class="details-btn w-50 text-none" @click="openDetails">
          Подробнее
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Course Details Modal -->
    <v-dialog v-model="detailsDialog" max-width="900px" scrollable>
      <v-card v-if="course">
        <v-card-title class="pa-6 pb-6">
          <div class="d-flex justify-space-between align-center w-100">
            <h2 class="text-h5 text-wrap">{{ course.title }}</h2>
            <v-btn icon variant="text" @click="detailsDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text class="pa-6 pt-3">
          <!-- Course Details Content -->
          <LyubitelDetails v-if="course.title.includes('Любитель')" :course="course" />
          <StandardDetails v-else-if="course.title.includes('Стандарт')" :course="course" />
          <ProfessionalDetails v-else-if="course.title.includes('Профессионал')" :course="course" />
          <DefaultDetails v-else :course="course" />
        </v-card-text>

        <v-card-actions class="pa-6 pt-3">
          <v-spacer></v-spacer>
          <v-btn
            class="cart-btn-modal white--text text-none"
            disabled
            @click="handleAddToCart(); detailsDialog = false"
            size="large"
          >
            Добавить в корзину
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import LyubitelDetails from './CourseDetails/LyubitelDetails.vue'
import StandardDetails from './CourseDetails/StandardDetails.vue'
import ProfessionalDetails from './CourseDetails/ProfessionalDetails.vue'
import DefaultDetails from './CourseDetails/DefaultDetails.vue'

// Props
const props = defineProps<{
  course: {
    title: string
    description: string
    price: string
    image: string
  }
  cardClass?: string
}>()

// Emits
const emit = defineEmits<{
  addToCart: [course: any]
}>()

// State
const detailsDialog = ref(false)
const cartItems = ref<any[]>([])

// Check if course is in cart
const isInCart = computed(() => {
  return cartItems.value.some(
    (item) => item.title === props.course.title && item.price === props.course.price
  )
})

// Load cart from localStorage
onMounted(() => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    cartItems.value = JSON.parse(cart)
  }
})

// Open details modal
const openDetails = () => {
  detailsDialog.value = true
}

// Handle add to cart
const handleAddToCart = () => {
  if (isInCart.value) return

  let cart = localStorage.getItem('cart')
  let items: any[] = []
  if (cart) {
    items = JSON.parse(cart)
  }

  items.push(props.course)
  cartItems.value = items
  localStorage.setItem('cart', JSON.stringify(items))
  window.dispatchEvent(new Event('cartUpdated'))

  emit('addToCart', props.course)
}


</script>

<style scoped>
/* Course Card Styles */
.course-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.7vw;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-image-container {
  padding: 12px;
}

.image-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.course-image {
  border-radius: 8px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.course-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #ff8a04, #ffa143);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(255, 138, 4, 0.4);
}

.badge-text {
  display: block;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 2px;
  line-height: 1.2;
}

.badge-date {
  display: block;
  font-weight: 500;
  font-size: 0.7rem;
  opacity: 0.9;
  line-height: 1.2;
}

.course-title {
  font-size: 1.1rem;
  line-height: 1.4;
  padding-bottom: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  hyphens: auto;
  font-weight: 600;
  color: #333;
  padding: 1rem 1rem 0.5rem;
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

.cart-btn:disabled {
  background-color: #ccc;
  color: #666;
}

.course-card-text {
  min-height: 80px;
  padding: 0 1rem;
  color: #666;
  flex-grow: 1;
}

.cart-btn-modal {
  background-color: #ff8a04 !important;
  padding: 12px 24px;
}

.cart-btn-modal:disabled {
  background-color: #ccc !important;
  color: #666 !important;
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

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.result-image {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

.modal-price {
  font-size: 2rem;
  font-weight: 700;
  color: #ff8a04;
}

/* Responsive styles */
@media (max-width: 1500px) {
  .course-title {
    font-size: 1.1rem;
  }

  .course-price {
    font-size: 1.1rem;
  }

  .course-card-text {
    font-size: 0.85rem;
  }
}
</style>
