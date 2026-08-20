export interface Book {
  id: string
  title?: string
  authors?: string[]
  publishedDate?: string
  coverUrl?: string
}

export interface BookDetail extends Book {
  description?: string
  publisher?: string
  pageCount?: number
  categories?: string[]
}

export interface GoogleBooksImageLinks {
  smallThumbnail?: string
  thumbnail?: string
  small?: string
  medium?: string
  large?: string
}

export interface GoogleBooksVolumeInfo {
  title?: string
  authors?: string[]
  publishedDate?: string
  description?: string
  publisher?: string
  pageCount?: number
  categories?: string[]
  imageLinks?: GoogleBooksImageLinks
}

export interface GoogleBooksVolume {
  id: string
  volumeInfo: GoogleBooksVolumeInfo
}

export interface GoogleBooksSearchResponse {
  items?: GoogleBooksVolume[]
}

export interface GoogleBooksVolumeResponse {
  id: string
  volumeInfo: GoogleBooksVolumeInfo
}

export interface BookSearchResult {
  books: Book[]
}
