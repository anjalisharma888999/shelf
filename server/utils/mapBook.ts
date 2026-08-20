import type { Book, BookDetail, GoogleBooksVolume } from '~/types/book'

function mapCoverUrl(volumeInfo: GoogleBooksVolume['volumeInfo']): string | undefined {
  const links = volumeInfo.imageLinks
  if (!links) return undefined

  if (links.thumbnail !== undefined) return links.thumbnail
  if (links.smallThumbnail !== undefined) return links.smallThumbnail
  if (links.medium !== undefined) return links.medium
  if (links.small !== undefined) return links.small
  if (links.large !== undefined) return links.large

  return undefined
}

export function mapVolumeToBook(volume: GoogleBooksVolume): Book {
  const { volumeInfo } = volume
  const book: Book = { id: volume.id }

  if (volumeInfo.title !== undefined) book.title = volumeInfo.title
  if (volumeInfo.authors !== undefined) book.authors = volumeInfo.authors
  if (volumeInfo.publishedDate !== undefined) book.publishedDate = volumeInfo.publishedDate

  const coverUrl = mapCoverUrl(volumeInfo)
  if (coverUrl !== undefined) book.coverUrl = coverUrl

  return book
}

export function mapVolumeToBookDetail(volume: GoogleBooksVolume): BookDetail {
  const book = mapVolumeToBook(volume)
  const { volumeInfo } = volume
  const detail: BookDetail = { ...book }

  if (volumeInfo.description !== undefined) detail.description = volumeInfo.description
  if (volumeInfo.publisher !== undefined) detail.publisher = volumeInfo.publisher
  if (volumeInfo.pageCount !== undefined) detail.pageCount = volumeInfo.pageCount
  if (volumeInfo.categories !== undefined) detail.categories = volumeInfo.categories

  return detail
}
