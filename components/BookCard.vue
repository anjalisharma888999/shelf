<script setup lang="ts">
import type { Book } from '~/types/book'

defineProps<{
  book: Book
  shortlisted?: boolean
}>()

defineEmits<{
  toggleShortlist: [book: Book]
}>()

function formatAuthors(authors?: string[]) {
  if (!authors?.length) return undefined
  return authors.join(', ')
}

function formatYear(publishedDate?: string) {
  if (!publishedDate) return undefined
  return publishedDate.slice(0, 4)
}
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-(--radius-card) border border-shelf-border bg-shelf-surface shadow-sm transition hover:shadow-md">
    <NuxtLink :to="`/book/${book.id}`" class="flex flex-1 flex-col">
      <div class="mx-auto flex w-full max-w-[200px] items-center justify-center overflow-hidden">
        <img
          v-if="book.coverUrl"
          :src="book.coverUrl"
          :alt="book.title"
          class="h-auto w-full object-contain"
        >
        <p v-else class="text-sm text-shelf-muted">
          No cover available
        </p>
      </div>

      <div class="flex flex-1 flex-col gap-2 p-(--spacing-card)">
        <h2 v-if="book.title" class="line-clamp-2 text-base font-semibold leading-snug">
          {{ book.title }}
        </h2>
        <p v-else class="text-sm italic text-shelf-muted">
          Title unavailable
        </p>

        <p v-if="formatAuthors(book.authors)" class="line-clamp-1 text-sm text-shelf-muted">
          {{ formatAuthors(book.authors) }}
        </p>

        <p v-if="formatYear(book.publishedDate)" class="text-xs text-shelf-muted">
          {{ formatYear(book.publishedDate) }}
        </p>
      </div>
    </NuxtLink>

    <div class="border-t border-shelf-border p-(--spacing-card) pt-0">
      <button
        type="button"
        class="w-full rounded-(--radius-button) px-3 py-2 text-sm font-medium transition"
        :class="shortlisted
          ? 'bg-shelf-accent text-white hover:bg-shelf-accent-hover'
          : 'border border-shelf-border bg-white text-shelf-text hover:bg-shelf-accent-soft'"
        @click="$emit('toggleShortlist', book)"
      >
        {{ shortlisted ? 'Remove from shortlist' : 'Add to shortlist' }}
      </button>
    </div>
  </article>
</template>
