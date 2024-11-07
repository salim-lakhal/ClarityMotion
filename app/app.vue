<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  ogImage: 'https://landing-template.nuxt.dev/social-card.png',
  twitterImage: 'https://landing-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <!-- Affiche le logo et le titre uniquement sur la page /demo -->
  <div v-if="$route.path === '/demos'" class="flex items-center justify-center p-4">
    <NuxtLink to="/" class="flex items-center space-x-2">
      <img src="/image.png" alt="Clarity Motion Logo" class="w-10 h-10" />
      <h1 class="text-3xl font-bold text-gray-800">Clarity Motion</h1>
    </NuxtLink>
  </div>

  <!-- Header général, caché sur /demo -->
  <AppHeader v-if="$route.path !== '/demos'" />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter/>

  <UNotifications />
</template>
