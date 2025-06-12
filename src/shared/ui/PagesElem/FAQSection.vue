<template>
  <section class="faq-section">
    <div :class="['faq-container', mdAndDown ? 'mobile-width' : 'desktop-width']">
      <h2 class="section-title mb-8 text-white">Часто задаваемые вопросы</h2>
      
      <v-expansion-panels class="expansion-panels">
        <v-expansion-panel
          v-for="(item, i) in faqItems"
          :key="i"
          class="faq-panel"
        >
          <v-expansion-panel-title class="faq-title">
            {{ item.question }}
          </v-expansion-panel-title>
          <v-expansion-panel-text class="faq-text font-weight-light">
            {{ item.answer }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()

// FAQ data
const faqItems = [
  {
    question: 'Сколько длится курс?',
    answer: 'Длительность зависит от выбранного курса — от 4 до 12 недель. Доступ к материалам сохраняется на год после окончания обучения.'
  },
  {
    question: 'Нужно ли специальное оборудование?',
    answer: 'Для начала достаточно базового набора: духовка, миски, весы. Список необходимого оборудования вы получите перед началом курса.'
  },
  {
    question: 'Как проходит обучение?',
    answer: 'Обучение проходит в формате видеоуроков с доступом к чату поддержки. Каждую неделю проводятся онлайн-консультации с преподавателем.'
  },
  {
    question: 'Можно ли получить возврат, если курс не понравится?',
    answer: 'Да, мы предоставляем возможность возврата средств в течение первой недели обучения, если курс вам не подойдет.'
  }
]
</script>

<style scoped>
.faq-section {
  background: linear-gradient(to right, #f8a21f 0%, #ffa143 71%, #ff8104 100%);
  color: white;
  width: 100%;
  padding: 5rem 0;
  display: flex;
  justify-content: center;
}

.desktop-width {
  width: 70%;
  margin: 0 auto;
}

.mobile-width {
  width: 100%;
  padding: 0 1rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
}

.expansion-panels {
  border-radius: 8px;
  overflow: hidden;
}

.faq-title {
  font-size: 1rem;
  font-weight: 400;
  padding: 1.5rem 1rem;
  min-height: 4.5rem;
  color: #333;
}

.faq-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #333;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .faq-title {
    font-size: 0.9rem;
    padding: 1rem;
  }
}
</style> 