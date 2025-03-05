<template>
    <v-card
      @click="$emit('click')"
      class="course-lessons rounded-lg"
      :width="mdAndDown ? '50vw' : '30vw'"
      elevation="1"
    >
      <v-img
        src="/public/main--menu.JPG"
        class="responsive-image rounded-t"
        :aspect-ratio="16/9"
        cover
      ></v-img>

      <div class="pa-4">
        <div class="card-text d-flex flex-wrap">
          <span class="font-weight-bold mr-1">01 /</span>
          <span class="font-weight-regular">Основы работы с бриошью</span>
        </div>
      </div>
    </v-card>
  </template>

  <script lang="ts" setup>
  import { useDisplay } from 'vuetify'

  const { mdAndDown } = useDisplay()
  </script>

  <style lang="css" scoped>
  .card-text {
      font-size: 0.9rem;
      word-break: break-word;
  }

  .v-card {
      min-height: 1vh;
      height: auto;
      background-color: #FFFFFF;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
  }

  .v-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .responsive-image {
    width: 100%;
    height: 16vh;
    min-width: 0vw;
  }

  /* Сохраняем остальные стили */
  .course-title {
      font-size: 2rem
  }

  h1 {
      color: #333132;
      font-size: 3rem;
  }

  h2 {
      color: #333132;
      font-size: 1.8rem;
  }

  h3 {
      color: #333132;
  }
  </style>
