<template>
  <div class="course-details">
    <p class="mb-4">{{ course.description }}</p>

    <div class="price-section">
      <span class="modal-price">{{ course.price }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  course: {
    title: string
    description: string
    price: string
    image: string
  }
}>()
</script>

<style scoped>
.course-details {
  line-height: 1.6;
}

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

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.result-image {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.modal-price {
  font-size: 2rem;
  font-weight: 700;
  color: #ff8a04;
}

/* Responsive styles */
@media (max-width: 599px) {
  .images-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-title {
    font-size: 1.2rem;
  }
}
</style>
