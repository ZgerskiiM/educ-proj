<template>
    <v-footer class="footer mt-16"
    padless
    >
      <v-container width="80vw">
        <v-row class="footer-row">
          <!-- Логотип и правовая информация -->
          <v-col cols="12" md="4" class="footer-column">
            <div class="footer-logo-container">
              <img src="/public/school_вектор_полный_w.png" alt="Логотип" class="footer-logo" />
            </div>
            <div class="legal-info">
              <p class="text-caption">ИП БАБИЧ М.В.</p>
              <p class="text-caption">ИНН 263514760714</p>
              <p class="text-caption">ОГРНИП 324265100071491</p>
            </div>
            <p class="text-caption mt-2">&copy;Babich Group {{ currentYear }} <br> Все права защищены</p>
          </v-col>

          <!-- Контакты -->
          <v-col cols="12" md="4" class="footer-column">
            <h3 class="text-subtitle-1 font-weight-medium mb-4">Контакты</h3>
            <div class="contact-item">
              <v-icon size="small" class="mr-2">mdi-email</v-icon>
              <a href="mailto:info@babichschool.ru" class="text-decoration-none">info@babichschool.ru</a>
            </div>
            <div class="contact-item mt-2">
              <v-icon size="small" class="mr-2">mdi-phone</v-icon>
              <a href="tel:+79001234567" class="text-decoration-none">+7 (900) 123-45-67</a>
            </div>
            <div class="contact-item mt-2">
              <v-icon size="small" class="mr-2">mdi-map-marker</v-icon>
              <span>г. Ставрополь</span>
            </div>
          </v-col>

          <!-- Соцсети и поддержка -->
          <v-col cols="12" md="4" class="footer-column">
            <h3 class="text-subtitle-1 font-weight-medium mb-4">Присоединяйтесь к нам</h3>
            <div class="social-icons">
              <a href="https://t.me/babichschool" target="_blank" class="social-icon">
                <v-icon color="#333132">mdi-telegram</v-icon>
              </a>
              <a href="https://vk.com/babichschool" target="_blank" class="social-icon">
                <v-icon color="#333132">mdi-vk</v-icon>
              </a>
              <a href="https://www.youtube.com/channel/babichschool" target="_blank" class="social-icon">
                <v-icon color="#333132">mdi-youtube</v-icon>
              </a>
            </div>

            <div class="support-section mt-6">
              <h3 class="text-subtitle-1 font-weight-medium mb-3">Поддержка</h3>
              <v-btn
                variant="outlined"
                color="#333132"
                size="small"
                prepend-icon="mdi-headset"
                to="/support"
                class="support-button"
              >
                Техническая поддержка
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Дополнительные ссылки внизу (для мобильной версии будут скрыты) -->
        <v-row class="footer-bottom d-none d-md-flex">
          <v-col cols="12">
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex justify-space-between align-center">
              <div class="footer-links">
                <router-link to="/privacy" class="footer-link text-decoration-none mr-4">Политика конфиденциальности</router-link>
                <router-link to="/terms" class="footer-link text-decoration-none mr-4">Условия использования</router-link>
                <router-link to="/delivery" class="footer-link text-decoration-none">Доставка и оплата</router-link>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>

  <script setup>
  import { computed } from 'vue';
  import { useDisplay } from 'vuetify';

  const { xs, sm, md } = useDisplay();
  const isMobile = computed(() => xs.value || sm.value);

  // Текущий год для копирайта
  const currentYear = computed(() => new Date().getFullYear());
  </script>

  <style scoped>
  .v-footer {
    background-color:#333132;

  }

  .footer {
    padding-top: 48px;
    padding-bottom: 24px;
  }

  .footer-row {
    display: flex;
    flex-wrap: wrap;
  }

  .footer-column {
    margin-bottom: 24px;
  }

  .footer-logo {
    max-width: 150px;
    height: auto;
    margin-bottom: 16px;
  }

  .legal-info {
    opacity: 0.8;
    line-height: 1.5;
  }

  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .contact-item a {
    color: #ffffff;
    transition: color 0.3s;
  }

  .contact-item a:hover {
    color: #F48A21;
  }

  .text-caption {
    font-size: 0.8rem;
  }

  .social-icons {
    display: flex;
    gap: 16px;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  .social-icon:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .support-button {
    transition: all 0.3s ease;
  }

  .support-button:hover {
    transform: translateY(-2px);
  }

  .footer-link {
    color: #333132;
    opacity: 0.7;
    font-size: 0.875rem;
    transition: opacity 0.3s;
  }

  .footer-link:hover {
    opacity: 1;
  }

  /* Адаптивные стили для мобильных устройств */
  @media (max-width: 959px) {
    .footer {
      padding-top: 32px;
      text-align: center;
    }

    .footer-logo-container {
      display: flex;
      justify-content: center;
    }

    .contact-item {
      justify-content: center;
    }

    .social-icons {
      justify-content: center;
    }

    .support-section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  </style>
