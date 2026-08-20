<script setup lang="ts">
import type { BookSearchResult } from '~/types/book'

const searchInput = ref('')
const debouncedQuery = useDebouncedRef(searchInput, 300)

const { data, pending, error } = await useFetch<BookSearchResult>(
  () => {
    const query = debouncedQuery.value.trim()
    return query ? `/api/books/search?q=${encodeURIComponent(query)}` : null
  },
  { watch: [debouncedQuery] },
)

const { toggle, isShortlisted } = useShortlist()

const hasQuery = computed(() => debouncedQuery.value.trim().length > 0)
const books = computed(() => data.value?.books ?? [])
</script>

<template>
  <div class="space-y-(--spacing-section)">
    <section class="space-y-4">
      <div>
        <h1 class="text-3xl font-bold">
          Discover books
        </h1>
        <p class="mt-2 max-w-2xl text-shelf-muted">
          Search by title or author, open a detail page, and save picks to your shortlist.
        </p>
      </div>

      <label class="block">
        <span class="sr-only">Search books</span>
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search by title or author…"
          class="w-full rounded-(--radius-card) border border-shelf-border bg-shelf-surface px-4 py-3 text-base outline-none ring-shelf-accent focus:ring-2"
        >
      </label>
    </section>

    <section v-if="pending" class="text-sm text-shelf-muted">
      Searching…
    </section>

    <section v-else-if="error" class="rounded-(--radius-card) border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      Something went wrong while searching. Check your API key and try again.
    </section>

    <section v-else-if="hasQuery && !books.length" class="text-sm text-shelf-muted">
      No books found for “{{ debouncedQuery }}”.
    </section>

    <section v-else-if="books.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        :shortlisted="isShortlisted(book.id)"
        @toggle-shortlist="toggle"
      />
    </section>
  </div>
</template>
