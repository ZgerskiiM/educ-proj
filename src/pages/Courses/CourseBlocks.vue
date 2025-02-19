<template>
    <div class="page-wrapper">
    <Header/>
    <v-container width="80vw">
    <h2 class="font-weight-medium">Пекарская Витрина</h2>
    <h1>от Булок до Хлеба</h1>
    <h3 class=" mb-4 font-weight-regular">Авторский курс от Максима Бабича</h3>
    <v-breadcrumbs
    class="mb-3 ml-0 pl-0 font-weight-light"
    color="#F48A21"
    :items="['Главная', 'Пекарская витрина']"
    />
    <v-card-title class="course-title font-weight-bold pt-0 pl-0 mb-4"
    style=" color: #333132"
    >
        Программа курса
    </v-card-title>
    <v-container class="d-flex flex-column ga-10 ml-0 pl-0 align-center">
<CourseCard/>
<CourseCard/>
<CourseCard/>

</v-container>
</v-container>
</div>
</template>



<script setup>
import Header from "@/shared/ui/PagesElem/Header.vue"
import CourseCard from "@/shared/ui/PagesElem/CourseCard.vue";

</script>

<style scoped>

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

template {
    background-color: BLACK;
}

.custom-chip1 {
  background-color: #e5ff9f !important;
  color: #333132;
}

.custom-chip2 {
  background-color: #f8ff31 !important;
  color: #333132;
}
.custom-chip3 {
  background-color: #ffea9d !important;
  color: #333132;
}

.page-wrapper {
    background-color: #fafafa;
    height: 100vh;
}

.responsive-image {
  width: 100%;
  height: 100vh;
  max-width: 20vw;
  min-width: 0vw;
}

</style>
