<template>
    <v-card
    class="block-card d-flex align-center "
    width="100%"
    flat>
    <!-- Изображение -->
    <v-img
      src="/public/main--menu.JPG"
      class="responsive-image rounded-t	"
      :aspect-ratio="16/9"
      cover
    ></v-img>

    <div class="ml-10 flex-grow-1">
      <div class="d-flex align-center justify-space-between">
        <div class="text-h6">
            <span class="font-weight-bold">Блок 1 /</span> <span class="font-weight-light">Бриошь</span>
        </div>

        <div class="font-weight-light mt-8 mr-10 grey--text">
          Пройдено 8/9
          <v-icon small>mdi-chevron-right</v-icon>
        </div>
      </div>

      <div class="d-flex ">
        <v-chip
          class="custom-chip1"
          text="10 часов"
          label
        >
        </v-chip>

        <v-chip
          style="background-color: #FFE68E;"
          class="custom-chip2 ml-4"
          label
          color="#333132"
        >
          9 уроков
        </v-chip>

        <v-chip
          style="background-color: #FEE99E; color: #333132"
          class="custom-chip3 ml-4"
          label
        >
          11 технологических карт
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<style lang="css" scoped>
.v-card {
    height: 1vh;
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

.responsive-image {
  width: 100%;
  height: 100vh;
  max-width: 18vw;
  min-width: 0vw;
}

</style>
