<template>
  <section class="results-section py-15">
    <v-container 
      class="results-container"
      :width="smAndDown ? '100vw' : mdAndDown ? '95vw' : '60vw'"
    >
      <h2 class="section-title mb-8">Твой результат после обучения</h2>
      
      <div class="results-content">
        <div class="results-list">
          <ul class="benefits-list">
            <li 
              v-for="(result, index) in results" 
              :key="index"
              :style="{ '--delay': `${index * 0.1 + 0.2}s` }"
              class="benefit-item"
            >
              <div class="benefit-icon">
                <v-icon color="#ff8a04">{{ result.icon }}</v-icon>
              </div>
              <div class="benefit-text">{{ result.title }}</div>
            </li>
          </ul>
          
          <v-btn 
            class="catalog-btn mt-6" 
            color="#ff8a04" 
            size="large"
            @click="navigateToCatalog"
          >
            <span class="text-white text-none font-weight-regular">В каталог</span>
          </v-btn>
        </div>
        
        <div class="results-image">
          <img src="/стандарт.webp" alt="Результат обучения" class="result-img" />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mdAndDown, smAndDown } = useDisplay()
const router = useRouter()

const navigateToCatalog = () => {
  router.push('/catalog')
}

const results = ref([
  {
    title: 'Умеешь готовить уникальную выпечку, которая не оставит никого равнодушным',
    icon: 'mdi-cake-variant'
  },
  {
    title: 'Владеешь базой знаний и навыков пекаря',
    icon: 'mdi-book-open-page-variant'
  },
  {
    title: 'Знаешь секреты идеального теста для разных видов выпечки',
    icon: 'mdi-chef-hat'
  },
  {
    title: 'Собрал свой незаменимый набор пекаря',
    icon: 'mdi-silverware-fork-knife'
  },
  {
    title: 'Знаешь, как избежать ошибок, которые совершают 80% пекарей',
    icon: 'mdi-check-circle'
  }
])
</script>

<style scoped>


.section-title {
  text-align: left;
  font-weight: 600;
  font-size: 2rem;
}

.results-content {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.results-list {
  flex: 1;
}

.results-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result-img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: rotate(2deg);
  transition: transform 0.3s ease;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
  animation-delay: var(--delay);
}

.benefit-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  margin-right: 1rem;
  background-color: rgba(255, 138, 4, 0.1);
  border-radius: 50%;
  padding: 8px;
}

.benefit-text {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.5;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 959px) {
  .results-content {
    flex-direction: column-reverse;
  }
  
  .results-image {
    margin-bottom: 2rem;
  }
  
  .result-img {
    max-width: 80%;
  }
}

.catalog-btn {
  padding: 12px 30px;
  border-radius: 8px;
  margin-top: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.catalog-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 138, 4, 0.3);
}
</style> 