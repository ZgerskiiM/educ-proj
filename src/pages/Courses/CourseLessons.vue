<template>
    <div class="page-wrapper">
    <Header/>
    <v-container
    :width="mdAndDown ? '100vw' : '80vw'"
    >
    <h2 class="font-weight-medium pb-0 mb-0">Пекарская витрина:</h2>
    <h1 class="mt-0 pt-0">От булок до хлеба</h1>
    <h3 class="mb-4 font-weight-regular">Авторский курс от Максима Бабича</h3>
    <v-breadcrumbs
    class="mb-3 ml-0 pl-0 font-weight-light"
    color="#F48A21"
    :items="['Главная', 'Пекарская витрина', 'Уроки']"
    />
    <v-card-title class="course-title font-weight-bold pt-0 pl-0 mb-4"
    style=" color: #333132"
    >
        Блок 1 / Бриошь
    </v-card-title>
    <v-container
    :class="mdAndDown ? 'd-flex flex-row flex-wrap ga-5 ml-0 pl-0 mr-0 pr-0' : 'd-flex flex-row ga-5 ml-0 pl-0 align-center' ">
      <LessonCard @click="navigateToCourse(1)"/>
      <LessonCard @click="navigateToCourse(1)"/>
      <LessonCard @click="navigateToCourse(1)"/>
      <LessonCard @click="navigateToCourse(1)"/>

</v-container>
</v-container>
</div>
</template>



<script lang="ts" setup>
import Header from "@/shared/ui/PagesElem/Header.vue"
import { useDisplay } from 'vuetify'
import LessonCard from "@/shared/ui/PagesElem/LessonCard.vue";

const { mdAndDown } = useDisplay()

import { useRouter } from 'vue-router'
</script>

<style scoped>

.course-title {
    font-size: 1.8rem;
}

h1 {
    color: #333132;
    font-size: 3rem;

}

body {
  background-color: #FAFAFA;
}

h2 {
    color: #333132;
    font-size: 1.8rem;
}

h3 {
    color: #333132;
}

.page-wrapper {
    background-color: #fafafa;
    height: 100vh;
}


@media (max-width: 819px) {

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  h3 {
    font-size: 0.9rem;
  }

  .course-title {
    font-size: 1.2rem;
  }

  .v-breadcrumbs {
    font-size: 0.85rem;
  }
}

</style>
