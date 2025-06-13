<template>
  <div class="course-details">
    <!-- Header with course badge -->
    <div class="course-header mb-8">
      <div class="feature-badge mb-4">
        <span class="badge-title">Любитель</span>
      </div>
    </div>

    <!-- Key features grid -->
    <div class="key-features mb-6">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📺</div>
          <div class="feature-text">5 прямых эфиров</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💬</div>
          <div class="feature-text">Общий закрытый чат курса с кураторами</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⏰</div>
          <div class="feature-text">Доступ к материалам: <strong>8 месяцев</strong></div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <div class="feature-text"><strong>Сертификат</strong> о прохождении курса</div>
        </div>
        <div class="feature-card premium-feature">
          <div class="feature-icon">👥</div>
          <div class="feature-text"><strong>Общий чат-комьюнити</strong></div>
        </div>
      </div>
    </div>

    <!-- Main blocks section -->
    <div class="main-content-section mb-6">
      <h3 class="section-title">8 ОСНОВНЫХ БЛОКОВ:</h3>

      <div class="blocks-container">
        <div class="content-block">
          <div class="block-header">
            <span class="block-number">1</span>
            <h4 class="block-title">Бриошь</h4>
          </div>
          <p class="block-description">9 видеуроков (тесто + начинки), 11 подробных технологических карт</p>
        </div>

        <div class="content-block">
          <div class="block-header">
            <span class="block-number">2</span>
            <h4 class="block-title">Сдобное тесто</h4>
          </div>
          <p class="block-description">4 видеоурока (тесто + начинки), 3 подробные технологические карты</p>
        </div>

        <div class="content-block">
          <div class="block-header">
            <span class="block-number">3</span>
            <h4 class="block-title">Заварное тесто</h4>
          </div>
          <p class="block-description">8 видеоуроков (тесто + начинки), 8 подробных технологических карт</p>
        </div>

        <div class="content-block">
          <div class="block-header">
            <span class="block-number">4</span>
            <h4 class="block-title">Кекс</h4>
          </div>
          <p class="block-description">4 видеоурока, 6 подробных технологических карт</p>
        </div>

        <div class="content-block">
          <div class="block-header">
            <span class="block-number">5</span>
            <h4 class="block-title">Песочное тесто</h4>
          </div>
          <p class="block-description">3 видеоурока, 4 подробные технологические карты</p>
        </div>

        <div class="content-block">
          <div class="block-header">
            <span class="block-number">6</span>
            <h4 class="block-title">Фокачча</h4>
          </div>
          <p class="block-description">2 видеоурока, 2 подробные технологические карты</p>
        </div>

        <div class="content-block">
          <div class="block-header">
            <span class="block-number">7</span>
            <h4 class="block-title">Чиабатта на опаре пулишь</h4>
          </div>
          <p class="block-description">2 видеоурока, 2 подробные технологические карты</p>
        </div>

        <div class="content-block">
          <div class="block-header">
            <span class="block-number">8</span>
            <h4 class="block-title">Хлеб</h4>
          </div>
          <p class="block-description">2 видеоурока, 2 подробные технологические карты</p>
        </div>
      </div>
    </div>

    <!-- Pre-course section -->
    <div class="preweek-section mb-6">
      <h3 class="section-title">1 НЕДЕЛЯ ПРЕДОБУЧЕНИЯ: Ингредиенты и инвентарь</h3>
      <div class="preweek-content">
        <div class="preweek-item">
          <div class="preweek-icon">🎥</div>
          <div class="preweek-text"><strong>2 видео</strong> или <strong>2 прямых эфира</strong> (основные ингредиенты и необходимый инвентарь в работе пекаря)</div>
        </div>
        <div class="preweek-item">
          <div class="preweek-icon">📋</div>
          <div class="preweek-text"><strong>Таблица</strong> ингредиентов необходимых для курса</div>
        </div>
        <div class="preweek-item">
          <div class="preweek-icon">🛠️</div>
          <div class="preweek-text"><strong>Таблица</strong> про инвентарь необходимый для курса с ссылками и фото</div>
        </div>
      </div>
    </div>

    <!-- Guides section -->
    <div class="guides-section mb-6">
      <h3 class="section-title">ГАЙДЫ:</h3>
      <div class="guides-container">
        <div class="guide-card mb-4">
          <div class="guide-icon">📚</div>
          <div class="guide-content">
            <p class="guide-text">«Технология работы с тестом: основные нюансы для достижения максимального результата»</p>
          </div>
        </div>
        <div class="guide-card">
          <div class="guide-icon">📦</div>
          <div class="guide-content">
            <p class="guide-text">«Хранение, упаковка, заморозка изделий из теста»</p>
          </div>
        </div>
      </div>
    </div>



    <!-- Payment info -->
    <div class="payment-section mb-6">
      <div class="payment-card">
        <div class="payment-icon">💳</div>
        <div class="payment-text">Курс можно приобрести в рассрочку на <strong>3, 6, 9 месяцев</strong></div>
      </div>
    </div>

    <!-- Price -->
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
  background: linear-gradient(135deg, #ff6b35, #ff8e53) !important;
  color: white !important;
  padding: 12px 24px !important;
  border-radius: 25px !important;
  font-weight: 600 !important;
  font-size: 1.2rem !important;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4) !important;
  display: inline-block !important;
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
@media (max-width: 599px) {
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
