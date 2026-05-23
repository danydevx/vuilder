<!-- =============================
src/components/AudioToggle.vue
============================= -->
<template>
  <div class="audio-toggle">
    <button
      class="audio-btn"
      :class="{ playing: isPlaying }"
      @click="toggle"
      :aria-label="isPlaying ? 'Pausar música' : 'Reproducir música'"
    >
      <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
    </button>

    <audio ref="bgAudio" :src="src" preload="none" loop></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ src: { type: String, required: true } })
const bgAudio = ref(null)
const isPlaying = ref(false)

function toggle() {
  const el = bgAudio.value
  if (!el) return
  if (isPlaying.value) {
    el.pause()
    isPlaying.value = false
  } else {
    el.play()
      .then(() => { isPlaying.value = true })
      .catch(() => { /* ignore autoplay errors */ })
  }
}
</script>

<style scoped>
.audio-toggle {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1050;
}

.audio-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  color: #000;
  font-size: 1.6rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  cursor: pointer;
}

.audio-btn:hover {
  transform: scale(1.08);
  background: #fff;
}

.audio-btn:active {
  transform: scale(0.95);
}

.audio-btn.playing {
  background: #ff4081; /* color destacado cuando está reproduciendo */
  color: #fff;
}
</style>
