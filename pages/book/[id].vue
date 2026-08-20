<script setup lang="ts">
import type { BookDetail } from '~/types/book'

const route = useRoute()
const id = route.params.id as string

const { data: book, error } = await useFetch<BookDetail>(`/api/books/${id}`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 404,
    statusMessage: error.value.statusMessage ?? 'Book not found',
  })
}

const { toggle, isShortlisted } = useShortlist()
</script>

<template>
  <div v-if="book" class="space-y-6">
    <NuxtLink
      to="/"
      class="inline-flex text-sm font-medium text-shelf-accent hover:text-shelf-accent-hover"
    >
      ← Back to search
    </NuxtLink>

    <BookDetail
      :book="book"
      :shortlisted="isShortlisted(book.id)"
      @toggle-shortlist="toggle(book)"
    />
  </div>
</template>
