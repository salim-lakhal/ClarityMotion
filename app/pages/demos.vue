<script setup lang="ts">
useSeoMeta({
  title: 'Demo | ClarityMotion',
  description: 'Watch a demo of ClarityMotion\'s testimonial anonymization and certification platform.'
})
</script>

<template>
  <div class="container mx-auto p-6 flex justify-center items-center min-h-screen">
    <div class="max-w-4xl w-full">
      <DemoCard
        title="Testimonial Protection Demo"
        description="See how ClarityMotion anonymizes witness identity in video testimonials while preserving authenticity."
        video-url="/demo.mp4"
      />
    </div>
  </div>
</template>
