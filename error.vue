<script setup lang="ts">
const error = useError()

const title = computed(() => {
  if (error.value?.statusCode === 404) return 'Book not found'
  return 'Something went wrong'
})
</script>

<template>
  <div class="mx-auto max-w-lg space-y-4 text-center">
    <h1 class="text-3xl font-bold">
      {{ title }}
    </h1>
    <p class="text-shelf-muted">
      {{ error?.statusMessage ?? 'An unexpected error occurred.' }}
    </p>
    <NuxtLink
      to="/"
      class="inline-flex rounded-(--radius-button) bg-shelf-accent px-4 py-2 text-sm font-medium text-white hover:bg-shelf-accent-hover"
    >
      Back to search
    </NuxtLink>
  </div>
</template>
