<template>
    <div class="page-wrapper">
        <Header/>
        <v-container fluid class="content-container px-6 pt-2"
        :width="mdAndDown ? '100vw' : '80vw'"
        >
            <v-breadcrumbs
                class="mb-1 pl-0 font-weight-light"
                color="#F48A21"
                :items="['Главная', 'Пекарская витрина', 'Уроки', 'Урок 1']"
            />
            <div class="content-wrapper">
                <div class="video-block">
                    <h2 class="font-weight-medium mb-3">Основы работы с бриошью</h2>
                    <VideoPlayer/>
                    <div class="nav--buttons pt-0 mt-0 d-flex justify-end">
                        <v-btn class="text-none  rounded-lg">Предыдущий урок</v-btn>
                        <v-btn class=" text-none rounded-lg ml-4">Следующий урок</v-btn>
                    </div>
                </div>
                <div class="lesson-sidebar">
                        <v-expansion-panels class= "mt-6 w-100">
                            <v-expansion-panel class="w-100"
                                v-for="i in 2"
                                :key="i"
                                text="Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad
                            Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad
                            Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad
                            Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad Lorem ipisasdad"
                                title="01 / Описание урока"
                            ></v-expansion-panel>
                            </v-expansion-panels>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import Header from "@/shared/ui/PagesElem/Header.vue"
import { useDisplay } from 'vuetify'
import VideoPlayer from "@/entities/Course/VideoPlayer.vue"

const { mdAndDown } = useDisplay()

</script>

<style scoped>

p {
    font-size: 1.1rem
}

.content-container {
    max-width: 100%;
}

.content-wrapper {
    gap: 6vw;
}

.lesson-sidebar {
    flex-shrink: 0;
}

.nav--buttons {
    margin-left: 10px;
}

.lesson-info {
    border-radius: 8px;
    padding: 16px;
    font-size: 24px;
}

.video-block {
    flex-grow: 1;
}

.v-btn {
    background-color: #333132;
    color: white;
    font-weight: 400;
}

.v-expansion-panel {
    background-color: #333132;
    color: white;
    margin-top: 1.5vh;
}


@media (max-width: 819px) {
    .content-wrapper {
        flex-direction: column;
    }

    .lesson-sidebar {
        width: 100%;
        margin-bottom: 20px;
    }

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
    font-size: 0.62rem;
    }
}

</style>
