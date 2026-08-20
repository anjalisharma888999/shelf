import type { GoogleBooksSearchResponse } from '~/types/book'
import { mapVolumeToBook } from '~/server/utils/mapBook'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q.trim() : ''

  if (!q) {
    throw createError({ statusCode: 400, statusMessage: 'Search query is required' })
  }

  const config = useRuntimeConfig(event)
  const apiKey = config.googleBooksApiKey

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Google Books API key is not configured' })
  }

  const response = await $fetch<GoogleBooksSearchResponse>(
    'https://www.googleapis.com/books/v1/volumes',
    { query: { q, key: apiKey } },
  )

  const books = response.items?.map(mapVolumeToBook) ?? []

  return { books }
})
