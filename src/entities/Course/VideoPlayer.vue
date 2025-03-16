<template>
    <div class="video-container mb-5" ref="videoContainer">
            <video
                ref="videoPlayer"
                @timeupdate="updateProgress"
                @loadedmetadata="onVideoLoaded"
                @ended="isPlaying = false"
                @click="togglePlay"
                :poster="posterImage"
            >
                <source :src="fixImageUrl(videoUrl)" :type="videoType">
                </source>
            </video>
        <div class="video-controls" :class="{ 'controls-visible': controlsVisible }">
            <div class="video-progress">
                <div class="progress-bar" :style="{ width: `${progressPercent}%` }"></div>
                <input type="range" class="progress-seek" min="0" max="100" step="0.1" v-model="progressPercent"
                    @input="seek">
            </div>
            <div class="controls-main">
                <button class="control-btn" @click.stop="togglePlay">
                    <v-icon v-if="!isPlaying">mdi-play</v-icon>
                    <v-icon v-else>mdi-pause</v-icon>
                </button>
                <div class="volume-control">
                    <button class="control-btn" @click.stop="toggleMute">
                        <v-icon v-if="isMuted">mdi-volume-off</v-icon>
                        <v-icon v-else-if="volume < 0.5">mdi-volume-low</v-icon>
                        <v-icon v-else>mdi-volume-high</v-icon>
                    </button>
                    <input type="range" class="volume-slider" min="0" max="1" step="0.1" v-model="volume"
                        @input="changeVolume">
                </div>
                <div class="time-display">
                    {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                </div>
                <button class="control-btn fullscreen-btn" @click.stop="toggleFullscreen">
                    <v-icon v-if="isFullscreen">mdi-fullscreen-exit</v-icon>
                    <v-icon v-else>mdi-fullscreen</v-icon>
                </button>
            </div>
        </div>

        <div v-if="!isPlaying" class="big-play-button" @click.stop="togglePlay">
            <v-icon size="64">mdi-play</v-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, defineProps } from 'vue'

// Определение пропсов
const props = defineProps({
  videoUrl: {
    type: String,
    default: ''
  },
  posterImage: { // Новый проп для изображения
    type: String,
    default: ''
  }
});

const videoType = computed(() => {
    if (!props.videoUrl) return 'video/avi';

    // Определяем тип видео на основе расширения файла
    const extension = props.videoUrl.split('.').pop().toLowerCase();
    switch (extension) {
        case 'mp4':
            return 'video/mp4';
        case 'webm':
            return 'video/webm';
        case 'ogg':
            return 'video/ogg';
        case 'avi':
            return 'video/avi';
        case 'mov':
            return 'video/quicktime';
        default:
            return 'video/mp4';
    }
});

const fixImageUrl = (url) => {
  if (!url) {
    return '/public/default-lesson.jpg';
  }

  // Исправляем только дублирование протокола, не трогая русские символы
  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://');
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://');

  return fixedUrl;
};

const videoPlayer = ref(null)
const videoContainer = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progressPercent = ref(0)
const volume = ref(1)
const isMuted = ref(false)
const isFullscreen = ref(false)
const controlsVisible = ref(true)
let controlsTimeout = null

// Показать/скрыть элементы управления при движении мыши
const showControls = () => {
    controlsVisible.value = true

    // Очистить предыдущий таймер
    if (controlsTimeout) {
        clearTimeout(controlsTimeout)
    }

    // Установить новый таймер для скрытия элементов управления
    controlsTimeout = setTimeout(() => {
        if (isPlaying.value) {
            controlsVisible.value = false
        }
    }, 3000)
}

const togglePlay = () => {
    if (!videoPlayer.value) return

    if (isPlaying.value) {
        videoPlayer.value.pause()
    } else {
        videoPlayer.value.play()
    }

    isPlaying.value = !isPlaying.value
    showControls()
}

const updateProgress = () => {
    if (!videoPlayer.value) return

    currentTime.value = videoPlayer.value.currentTime
    progressPercent.value = (currentTime.value / duration.value) * 100
}

const onVideoLoaded = () => {
    if (!videoPlayer.value) return

    duration.value = videoPlayer.value.duration
}

const seek = () => {
    if (!videoPlayer.value) return

    const seekTime = (progressPercent.value / 100) * duration.value
    videoPlayer.value.currentTime = seekTime
}

const changeVolume = () => {
    if (!videoPlayer.value) return

    videoPlayer.value.volume = volume.value
    isMuted.value = volume.value === 0
}

const toggleMute = () => {
    if (!videoPlayer.value) return

    if (isMuted.value) {
        isMuted.value = false
        volume.value = volume.value === 0 ? 1 : volume.value
        videoPlayer.value.volume = volume.value
    } else {
        isMuted.value = true
        videoPlayer.value.volume = 0
    }
}

const toggleFullscreen = () => {
    if (!videoContainer.value) return

    if (document.fullscreenElement) {
        document.exitFullscreen()
        isFullscreen.value = false
    } else {
        videoContainer.value.requestFullscreen()
        isFullscreen.value = true
    }
}

// Обработчик события при выходе из полноэкранного режима
const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement
}

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// Обработка горячих клавиш
const handleKeyDown = (e) => {
    // Только обрабатываем клавиши, если элемент находится в фокусе или в полноэкранном режиме
    if (document.activeElement === videoPlayer.value ||
        document.activeElement === videoContainer.value ||
        isFullscreen.value) {

        if (e.code === 'Space') {
            togglePlay()
            e.preventDefault()
        } else if (e.code === 'ArrowRight') {
            if (videoPlayer.value) videoPlayer.value.currentTime += 10
            showControls()
        } else if (e.code === 'ArrowLeft') {
            if (videoPlayer.value) videoPlayer.value.currentTime -= 10
            showControls()
        } else if (e.code === 'KeyM') {
            toggleMute()
            showControls()
        } else if (e.code === 'KeyF') {
            toggleFullscreen()
            showControls()
        }
    }
}

onMounted(() => {
    // Инициализация обработчиков событий
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    // Инициализация движения мыши для отображения элементов управления
    if (videoContainer.value) {
        videoContainer.value.addEventListener('mousemove', showControls)
    }

    // Установка начального объема звука
    if (videoPlayer.value) {
        videoPlayer.value.volume = volume.value
    }
})



onUnmounted(() => {
    // Удаление обработчиков событий при уничтожении компонента
    window.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)

    if (videoContainer.value) {
        videoContainer.value.removeEventListener('mousemove', showControls)
    }

    // Очистка таймера для предотвращения утечек памяти
    if (controlsTimeout) {
        clearTimeout(controlsTimeout)
    }
})
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

/* Новый обертывающий контейнер для видео */
.video-wrapper {
    width: 100%;
    position: relative;
    margin-bottom: 2vw;
}

.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* Соотношение сторон 16:9 (9/16 = 0.5625) */
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    background-color: #333132;
}

video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333132;
    object-fit: cover;
    cursor: pointer;
    transition: object-fit 0.3s ease; /* Добавляем плавный переход */
}

.video-container:fullscreen video {
    position: relative;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* В полноэкранном режиме используем contain */
}

.big-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(244, 138, 33, 0.7);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    z-index: 5;
    transition: background-color 0.3s, transform 0.2s;
}

.big-play-button:hover {
    background-color: rgba(244, 138, 33, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
}

.video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    padding: 16px;
    transition: opacity 0.3s ease;
    opacity: 0;
    z-index: 10;
}

.controls-visible {
    opacity: 1;
}

@media (min-width: 1024px) {
    .video-container {
        height: 0;
        padding-top: calc(40vh + 15vw); /* Комбинация vh и vw для более адаптивной высоты */
        max-height: 70vh; /* Максимальная высота относительно вьюпорта */
    }
}

.video-container:hover .video-controls {
    opacity: 1;
}

.video-progress {
    position: relative;
    height: 0.5vh;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius: 2px;
    margin-bottom: 10px;
}

.progress-bar {
    height: 100%;
    background-color: #F48A21;
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 0;
}

.v-btn {
    background-color: #333132;
    color: white;
    font-weight: 400;
}

.progress-seek {
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 1vh;
    appearance: none;
    background: transparent;
    cursor: pointer;
    opacity: 0;
}

.controls-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.control-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0.2vh;
    margin-right: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.control-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.volume-control {
    display: flex;
    align-items: center;
    margin-right: 15px;
}

.volume-slider {
    width: 60px;
    appearance: none;
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    transition: all 0.2s;
}

.volume-slider::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
}

.time-display {
    color: white;
    font-size: 14px;
    margin: 0 15px;
}

.fullscreen-btn {
    margin-left: auto;
}

.video-container:fullscreen {
    width: 100%;
    height: 100%;
    padding-top: 0; /* Сбрасываем padding в полноэкранном режиме */
    border-radius: 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.video-container:fullscreen video {
    position: relative; /* Сбрасываем absolut-позиционирование */
    max-width: 100%;
    max-height: 100%;
}

.video-container:fullscreen .video-controls {
    bottom: 0;
    padding: 20px;
    border-radius: 0;
}

.video-container:fullscreen .video-progress {
    height: 6px;
    margin-bottom: 15px;
}

.video-container:fullscreen .control-btn {
    font-size: 22px;
    padding: 8px;
}

.video-container:fullscreen .time-display {
    font-size: 16px;
}

.video-container:fullscreen .volume-slider {
    width: 80px;
}

.v-expansion-panel {
    background-color: #333132;
    color: white;
    margin-top: 1.5vh;
}

@media (max-width: 821px) {
    /* Сохраняем соотношение сторон 16:9 на мобильных устройствах */
    .video-container {
        width: 100%;
        padding-top: 56.25%; /* 16:9 */
    }
}

@media (max-width: 819px) {
    .content-wrapper {
        flex-direction: column;
    }

    .lesson-sidebar {
        width: 100%;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 1.1rem;
    }

    .time-display {
        display: none;
    }

    .volume-slider {
        width: 40px;
    }

    /* Элементы управления адаптированы для мобильных устройств */
    .big-play-button {
        width: 60px;
        height: 60px;
    }

    .big-play-button .v-icon {
        font-size: 44px !important;
    }

    .video-controls {
        padding: 10px;
    }

    .video-progress {
        height: 4px;
        margin-bottom: 8px;
    }

    .progress-seek {
        height: 15px;
        top: -5px;
    }

    .control-btn {
        font-size: 18px;
        padding: 4px;
        margin-right: 5px;
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
