<script setup lang="ts">
import type { Book } from '~/types/book'

defineProps<{
  open: boolean
  books: readonly Book[]
}>()

defineEmits<{
  close: []
  remove: [id: string]
}>()

function formatAuthors(authors?: string[]) {
  if (!authors?.length) return undefined
  return authors.join(', ')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex justify-end bg-black/30"
      @click.self="$emit('close')"
    >
      <aside class="flex h-full w-full max-w-md flex-col bg-shelf-surface shadow-xl">
        <header class="flex items-center justify-between border-b border-shelf-border px-(--spacing-page) py-4">
          <h2 class="text-lg font-semibold">
            Shortlist
          </h2>
          <button
            type="button"
            class="rounded-(--radius-button) px-3 py-1 text-sm text-shelf-muted hover:bg-shelf-accent-soft"
            @click="$emit('close')"
          >
            Close
          </button>
        </header>

        <div v-if="!books.length" class="flex flex-1 items-center justify-center p-(--spacing-page) text-sm text-shelf-muted">
          No books saved yet. Search and add titles you want to read.
        </div>

        <ul v-else class="flex-1 overflow-y-auto p-(--spacing-page)">
          <li
            v-for="book in books"
            :key="book.id"
            class="flex gap-3 border-b border-shelf-border py-4 last:border-b-0"
          >
            <div class="h-20 w-14 shrink-0 overflow-hidden rounded border border-shelf-border bg-shelf-accent-soft">
              <img
                v-if="book.coverUrl"
                :src="book.coverUrl"
                :alt="book.title"
                class="h-full w-full object-cover"
              >
            </div>

            <div class="min-w-0 flex-1">
              <NuxtLink
                :to="`/book/${book.id}`"
                class="line-clamp-2 font-medium hover:text-shelf-accent"
                @click="$emit('close')"
              >
                {{ book.title ?? 'Title unavailable' }}
              </NuxtLink>
              <p v-if="formatAuthors(book.authors)" class="mt-1 line-clamp-1 text-xs text-shelf-muted">
                {{ formatAuthors(book.authors) }}
              </p>
              <button
                type="button"
                class="mt-2 text-xs font-medium text-shelf-accent hover:text-shelf-accent-hover"
                @click="$emit('remove', book.id)"
              >
                Remove
              </button>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </Teleport>
</template>
