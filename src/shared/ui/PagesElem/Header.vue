<template>
<v-layout>
    <div class="user-header mb-16 ">
    <v-app-bar
        class="upper-wrapper justify-center"
        density="default"
        elevation="0"
        scroll-threshold="10"
    >
    <v-container
    width="80vw">
        <div class="logo">
            <img src="/public/school_вектор_полный_w.png"  class="logo__img" />
        </div>
    </v-container>
</v-app-bar>
</div>
</v-layout>
</template>

<style lang="scss" scoped>
.upper-wrapper {
  width: 100%;
  background-color: #F48A21;
}

.logo {
  display: flex;
  align-items: center;
}
.logo__img {
  height: 40px;
}

</style>
