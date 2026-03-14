<script setup lang="ts">
useSeoMeta({
  title: 'Dashboard | ClarityMotion',
  description: 'Manage and review submitted testimonials.'
})

const { data: testimonials, refresh } = await useFetch('/api/testimonials')

const stats = computed(() => {
  if (!testimonials.value) return { total: 0, verified: 0, pending: 0, anonymized: 0 }

  return {
    total: testimonials.value.length,
    verified: testimonials.value.filter((t: Record<string, unknown>) => t.status === 'verified').length,
    pending: testimonials.value.filter((t: Record<string, unknown>) => t.status === 'pending').length,
    anonymized: testimonials.value.filter((t: Record<string, unknown>) => t.anonymized).length
  }
})

const statCards = computed(() => [
  { label: 'Total Testimonials', value: stats.value.total, icon: 'i-heroicons-chat-bubble-left-right' },
  { label: 'Verified', value: stats.value.verified, icon: 'i-heroicons-check-badge' },
  { label: 'Pending Review', value: stats.value.pending, icon: 'i-heroicons-clock' },
  { label: 'Anonymized', value: stats.value.anonymized, icon: 'i-heroicons-eye-slash' }
])

function statusColor(status: string) {
  const colors: Record<string, string> = {
    verified: 'green',
    pending: 'yellow',
    rejected: 'red'
  }
  return colors[status] || 'gray'
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <ULandingSection>
    <div class="max-w-6xl mx-auto">
      <div class="mb-10">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Review and manage submitted testimonials.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <UCard
          v-for="stat in statCards"
          :key="stat.label"
        >
          <div class="flex items-center gap-4">
            <div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3">
              <UIcon
                :name="stat.icon"
                class="w-6 h-6 text-primary-500"
              />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ stat.value }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Testimonials
            </h2>
            <UButton
              to="/submit"
              label="New Testimonial"
              size="sm"
            />
          </div>
        </template>

        <div
          v-if="!testimonials?.length"
          class="text-center py-8 text-gray-500"
        >
          No testimonials yet.
        </div>

        <div
          v-else
          class="divide-y divide-gray-200 dark:divide-gray-800"
        >
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="py-4 first:pt-0 last:pb-0"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ testimonial.name }}
                  </span>
                  <UBadge
                    :color="statusColor(testimonial.status)"
                    variant="subtle"
                    size="xs"
                  >
                    {{ testimonial.status }}
                  </UBadge>
                  <UBadge
                    v-if="testimonial.anonymized"
                    color="blue"
                    variant="subtle"
                    size="xs"
                  >
                    <UIcon
                      name="i-heroicons-eye-slash"
                      class="w-3 h-3 mr-1"
                    />
                    anonymized
                  </UBadge>
                  <UBadge
                    v-if="testimonial.certified"
                    color="green"
                    variant="subtle"
                    size="xs"
                  >
                    <UIcon
                      name="i-heroicons-check-badge"
                      class="w-3 h-3 mr-1"
                    />
                    certified
                  </UBadge>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ testimonial.role }} at {{ testimonial.organization }}
                </p>
                <p class="mt-2 text-gray-700 dark:text-gray-300">
                  {{ testimonial.content }}
                </p>
              </div>
              <span class="text-xs text-gray-400 whitespace-nowrap">
                {{ formatDate(testimonial.createdAt) }}
              </span>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </ULandingSection>
</template>
