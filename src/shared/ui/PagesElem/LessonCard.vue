<template>
    <v-card @click="$emit('click')"
    class="course-lessons rounded-xm d-flex flex-column align-center"
    :width="mdAndDown ? '50vw' : '30vw'"
    flat>
    <v-img
      src="/public/main--menu.JPG"
      class="responsive-image rounded-t	mb-5"
      :aspect-ratio="16/9"
      cover
    ></v-img>

    <div class="ml-5 flex-grow-1 mr-5">
        <div class="card-text">
            <span class="font-weight-bold">01 /</span> <span class="font-weight-regular">Основы работы с бриошью</span>
        </div>

        <div class="font-weight-light mt-8 mr-10 grey--text">
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
}

.v-card {
    background-color: #F5F5F5;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

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


.responsive-image {
  width: 100%;
  height: 18vh;
  min-width: 0vw;
}

</style>
