import type { GoogleBooksVolumeResponse } from '~/types/book'
import { mapVolumeToBookDetail } from '~/server/utils/mapBook'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Book id is required' })
  }

  const config = useRuntimeConfig(event)
  const apiKey = config.googleBooksApiKey

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Google Books API key is not configured' })
  }

  try {
    const response = await $fetch<GoogleBooksVolumeResponse>(
      `https://www.googleapis.com/books/v1/volumes/${id}`,
      { query: { key: apiKey } },
    )

    return mapVolumeToBookDetail(response)
  }
  catch {
    throw createError({ statusCode: 404, statusMessage: 'Book not found' })
  }
})
