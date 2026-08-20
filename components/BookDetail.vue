<script setup lang="ts">
import type { BookDetail } from '~/types/book'

defineProps<{
  book: BookDetail
  shortlisted?: boolean
}>()

defineEmits<{
  toggleShortlist: []
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
  <article class="grid gap-(--spacing-section) lg:grid-cols-[240px_1fr]">
    <div class="flex justify-center lg:justify-start">
      <div class="flex aspect-[3/4] w-full max-w-[240px] items-center justify-center rounded-(--radius-card) border border-shelf-border bg-shelf-accent-soft p-4">
        <img
          v-if="book.coverUrl"
          :src="book.coverUrl"
          :alt="book.title"
          class="h-full w-full object-contain"
        >
        <p v-else class="text-sm text-shelf-muted">
          No cover available
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <h1 v-if="book.title" class="text-3xl font-bold leading-tight">
          {{ book.title }}
        </h1>
        <p v-else class="text-lg italic text-shelf-muted">
          Title unavailable
        </p>

        <p v-if="formatAuthors(book.authors)" class="mt-2 text-lg text-shelf-muted">
          {{ formatAuthors(book.authors) }}
        </p>

        <p v-if="formatYear(book.publishedDate)" class="mt-1 text-sm text-shelf-muted">
          Published {{ formatYear(book.publishedDate) }}
        </p>
      </div>

      <dl class="grid gap-3 sm:grid-cols-2">
        <div v-if="book.publisher">
          <dt class="text-xs font-semibold uppercase tracking-wide text-shelf-muted">
            Publisher
          </dt>
          <dd class="mt-1 text-sm">
            {{ book.publisher }}
          </dd>
        </div>

        <div v-if="book.pageCount !== undefined">
          <dt class="text-xs font-semibold uppercase tracking-wide text-shelf-muted">
            Page count
          </dt>
          <dd class="mt-1 text-sm">
            {{ book.pageCount }}
          </dd>
        </div>
      </dl>

      <div v-if="book.categories?.length">
        <h2 class="text-xs font-semibold uppercase tracking-wide text-shelf-muted">
          Categories
        </h2>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li
            v-for="category in book.categories"
            :key="category"
            class="rounded-full bg-shelf-accent-soft px-3 py-1 text-xs text-shelf-accent"
          >
            {{ category }}
          </li>
        </ul>
      </div>

      <div v-if="book.description">
        <h2 class="text-xs font-semibold uppercase tracking-wide text-shelf-muted">
          Description
        </h2>
        <p class="mt-2 whitespace-pre-line text-sm leading-relaxed text-shelf-text">
          {{ book.description }}
        </p>
      </div>

      <button
        type="button"
        class="self-start rounded-(--radius-button) px-4 py-2 text-sm font-medium transition"
        :class="shortlisted
          ? 'bg-shelf-accent text-white hover:bg-shelf-accent-hover'
          : 'border border-shelf-border bg-white text-shelf-text hover:bg-shelf-accent-soft'"
        @click="$emit('toggleShortlist')"
      >
        {{ shortlisted ? 'Remove from shortlist' : 'Add to shortlist' }}
      </button>
    </div>
  </article>
</template>
