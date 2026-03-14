<script setup lang="ts">
const links = [{
  label: 'Resources',
  children: [{
    label: 'Help Center'
  }, {
    label: 'Documentation'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Anonymization'
  }, {
    label: 'Certification'
  }, {
    label: 'Video Processing'
  }, {
    label: 'Secure Storage'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true

  try {
    await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: email.value }
    })

    toast.add({
      title: 'Subscribed!',
      description: 'You\'ve been subscribed to our newsletter.'
    })
    email.value = ''
  } catch {
    toast.add({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup
              label="Subscribe to our newsletter"
              :ui="{ container: 'mt-3' }"
            >
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    :label="loading ? 'Subscribing' : 'Subscribe'"
                    :loading="loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright &copy; {{ new Date().getFullYear() }} ClarityMotion. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <UButton
        to="https://github.com/salim-lakhal/ClarityMotion"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
