<template>
  <v-img
    class="responsive-image-second"
    src="/school_вектор.png"
    height="15vh"
    v-show="smAndDown"
  />
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { smAndDown} = useDisplay()
</script>
