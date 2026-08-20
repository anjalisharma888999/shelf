<script setup lang="ts">
const shortlistOpen = ref(false)
const { items, count, remove } = useShortlist()
</script>

<template>
  <header class="border-b border-shelf-border bg-shelf-surface">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-(--spacing-page) py-4">
      <NuxtLink to="/" class="text-xl font-bold tracking-tight text-shelf-accent">
        Shelf
      </NuxtLink>

      <button
        type="button"
        class="relative rounded-(--radius-button) border border-shelf-border px-4 py-2 text-sm font-medium hover:bg-shelf-accent-soft"
        @click="shortlistOpen = true"
      >
        Shortlist
        <span
          v-if="count > 0"
          class="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-shelf-accent px-1.5 py-0.5 text-xs text-white"
        >
          {{ count }}
        </span>
      </button>
    </div>

    <ShortlistPanel
      :open="shortlistOpen"
      :books="items"
      @close="shortlistOpen = false"
      @remove="remove"
    />
  </header>
</template>
