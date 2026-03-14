<script setup lang="ts">
useSeoMeta({
  title: 'Submit Testimonial | ClarityMotion',
  description: 'Submit your testimonial securely through ClarityMotion\'s encrypted submission form.'
})

const toast = useToast()

const form = reactive({
  name: '',
  role: '',
  organization: '',
  content: ''
})

const loading = ref(false)
const submitted = ref(false)

async function onSubmit() {
  loading.value = true

  try {
    await $fetch('/api/testimonials', {
      method: 'POST',
      body: form
    })

    submitted.value = true
    toast.add({
      title: 'Testimonial Submitted',
      description: 'Your testimonial has been received and is pending review.',
      color: 'green'
    })
  } catch (error: unknown) {
    const err = error as { data?: { statusMessage?: string } }
    toast.add({
      title: 'Submission Failed',
      description: err.data?.statusMessage || 'Please try again.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ULandingSection>
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12">
        <UBadge
          variant="subtle"
          size="lg"
          class="rounded-full font-semibold mb-4"
        >
          <UIcon
            name="i-heroicons-shield-check"
            class="mr-1 w-4 h-4"
          />
          End-to-End Encrypted
        </UBadge>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          Submit a Testimonial
        </h1>
        <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Your submission is encrypted and will be anonymized before publication.
          Only verified content is displayed.
        </p>
      </div>

      <div
        v-if="submitted"
        class="text-center py-16"
      >
        <UIcon
          name="i-heroicons-check-circle"
          class="w-16 h-16 text-green-500 mx-auto mb-4"
        />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Testimonial Received
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          Your testimonial is pending verification. We'll notify you once it's processed.
        </p>
        <UButton
          to="/"
          label="Back to Home"
          size="lg"
        />
      </div>

      <UCard v-else>
        <form
          class="space-y-6"
          @submit.prevent="onSubmit"
        >
          <UFormGroup
            label="Full Name"
            required
          >
            <UInput
              v-model="form.name"
              placeholder="Jane Smith"
              size="lg"
              required
            />
          </UFormGroup>

          <UFormGroup
            label="Role / Title"
            required
          >
            <UInput
              v-model="form.role"
              placeholder="Investigative Journalist"
              size="lg"
              required
            />
          </UFormGroup>

          <UFormGroup
            label="Organization"
            required
          >
            <UInput
              v-model="form.organization"
              placeholder="BBC Investigations"
              size="lg"
              required
            />
          </UFormGroup>

          <UFormGroup
            label="Testimonial"
            required
          >
            <UTextarea
              v-model="form.content"
              placeholder="Share your experience with ClarityMotion..."
              :rows="5"
              size="lg"
              required
            />
          </UFormGroup>

          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon
              name="i-heroicons-lock-closed"
              class="w-4 h-4"
            />
            <span>Your data is encrypted and stored securely</span>
          </div>

          <UButton
            type="submit"
            label="Submit Testimonial"
            size="lg"
            block
            :loading="loading"
          />
        </form>
      </UCard>
    </div>
  </ULandingSection>
</template>
