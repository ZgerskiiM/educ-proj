<template>
  <v-divider class="mt-10"></v-divider>

  <v-footer class="bg-transparent px-4">
    <v-container
      class="mb-4 mt-4"
      :width="mdAndDown ? '100vw' : '60vw'"
    >
      <div class="d-flex flex-column flex-md-row justify-space-between">
        <div class="text-md-left  mb-md-0">
          <div class="mb-2">
            <img src="/school_вектор_полный.png" alt="Логотип" height="40" />
          </div>
          <div class="footer-text font-weight-light text-grey">
            © {{ currentYear }} Babich School
          </div>
        </div>

        <!-- Правый блок -->
        <div class="text-md-right text-left">
          <div>
            <a href="https://docs.google.com/document/d/1Lh6td42PDXVTXLXlh10ja17lFtt0M6aWYJ-CdSA6MdA/edit?hl=ru&tab=t.0" target="_blank" class="footer-text text-none text-decoration-none font-weight-light " rel="noopener">
              Договор оферты
            </a>
          </div>
          <div>
            <a href="https://docs.google.com/document/d/15OGntOzbng-ewJSm8tmujmHWwrp-BcbRisCZrZaaFFE/edit?usp=sharing" target="_blank" class="footer-text text-none text-decoration-none font-weight-light " rel="noopener">
              Согласие на обработку данных
            </a>
          </div>

          <div class="footer-text font-weight-light mb-3 mt-3">Следите за школой</div>
          <div class="d-flex flex-row justify-start justify-md-end gap-2 mb-5">
            <a href="https://t.me/maksbabich" target="_blank" rel="noopener">
              <img src="/telegram.png" height="35" width="35" alt="Telegram">
            </a>
            <a href="https://vk.com/babich.baker" target="_blank" rel="noopener" class="mx-2">
              <img src="/vkontakte.png" height="35" width="35" alt="ВКонтакте">
            </a>
            <a href="https://dzen.ru/babichbaker" target="_blank" rel="noopener">
              <img src="/Yandex_Zen_logo_icon.svg" height="35" width="35" alt="Яндекс Дзен">
            </a>
          </div>

          <div class="font-weight-light footer-text mt-5">
            Возникли вопросы? <br>
            <a href="https://t.me/babichbaker_course" target="_blank" class="footer-text text-none font-weight-light text-primary" rel="noopener">
              Напишите в поддержку
            </a>
          </div>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const { mdAndDown } = useDisplay();
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.v-btn {
  text-transform: none;
}

.footer-text {
  font-size: 0.9rem;
}

a {
  color: #313131;
}

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
}
</style>
