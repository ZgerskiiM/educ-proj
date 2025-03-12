<template>
  <v-img
    class="responsive-image d-none d-sm-flex"
    src="/main--menu3_11zon.webp"
    :aspect-ratio="16 / 9"
    cover
  />
</template>

<style scoped>
.responsive-image {
  width: 100%;
  height: 100vh;
  max-width: 60vw;
  min-width: 0vw;
}

@media (max-width: 1200px) {
  .responsive-image {
    width: 0;
  }
}
</style>
