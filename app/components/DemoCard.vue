<template>
  <div 
    class="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 shadow-2xl rounded-3xl p-12 cursor-pointer transition transform hover:scale-105 hover:shadow-2xl max-w-5xl mx-auto text-white"
    @click="showVideo = true"
  >
    <h2 class="text-5xl font-extrabold mb-6">{{ title }}</h2>
    <p class="text-2xl mb-6">{{ description }}</p>

    <div class="mt-10 flex items-center space-x-3">
      <span class="inline-block w-20 h-1 bg-white rounded"></span>
      <span class="text-3xl font-semibold">Voir la Démo</span>
    </div>

    <!-- Modal Video -->
    <div 
      v-if="showVideo" 
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4" 
      @click.self="showVideo = false"
    >
      <div class="bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-7xl w-full relative">
        <button 
          @click.stop="showVideo = false" 
          class="absolute top-6 right-6 text-gray-400 text-5xl hover:text-white transition">
          &times;
        </button>
        <video :src="videoUrl" controls autoplay class="w-[80vw] h-[80vh] rounded-lg mt-4"></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  videoUrl: String,
})

const showVideo = ref(false)
</script>

<style scoped>
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>



