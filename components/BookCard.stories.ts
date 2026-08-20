import type { Meta, StoryObj } from '@storybook/vue3'
import BookCard from './BookCard.vue'
import type { Book } from '~/types/book'

const baseBook: Book = {
  id: 'abc123',
  title: 'The Name of the Wind',
  authors: ['Patrick Rothfuss'],
  publishedDate: '2007-03-27',
  coverUrl: 'http://books.google.com/books/content?id=abc123&printsec=frontcover&img=1&zoom=1&source=gbs_api',
}

const meta: Meta<typeof BookCard> = {
  title: 'Components/BookCard',
  component: BookCard,
  args: {
    shortlisted: false,
  },
}

export default meta
type Story = StoryObj<typeof BookCard>

export const Default: Story = {
  args: {
    book: baseBook,
  },
}

export const NoCover: Story = {
  args: {
    book: {
      id: 'no-cover',
      title: 'Untitled Manuscript',
      authors: ['Unknown Author'],
      publishedDate: '1999',
    },
  },
}

export const LongTitle: Story = {
  args: {
    book: {
      ...baseBook,
      title: 'The Extraordinarily Long and Winding Title of a Book That Keeps Going and Going Until It Must Be Truncated',
    },
  },
}

export const Shortlisted: Story = {
  args: {
    book: baseBook,
    shortlisted: true,
  },
}
