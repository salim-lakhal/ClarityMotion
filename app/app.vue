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
  ogImage: '/image1.webp',
  twitterImage: '/image1.webp',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div
    v-if="$route.path === '/demos'"
    class="flex items-center justify-center p-4"
  >
    <NuxtLink
      to="/"
      class="flex items-center space-x-2"
    >
      <img
        src="/image.png"
        alt="ClarityMotion Logo"
        class="w-10 h-10"
      >
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        ClarityMotion
      </h1>
    </NuxtLink>
  </div>

  <AppHeader v-if="$route.path !== '/demos'" />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
</template>
