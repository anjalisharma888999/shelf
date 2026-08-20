import type { Meta, StoryObj } from '@storybook/vue3'
import BookDetail from './BookDetail.vue'
import type { BookDetail as BookDetailType } from '~/types/book'

const baseBook: BookDetailType = {
  id: 'abc123',
  title: 'The Name of the Wind',
  authors: ['Patrick Rothfuss'],
  publishedDate: '2007-03-27',
  coverUrl: 'http://books.google.com/books/content?id=abc123&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  publisher: 'DAW Books',
  pageCount: 662,
  categories: ['Fiction', 'Fantasy'],
  description: 'Told in Kvothe\'s own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen.',
}

const meta: Meta<typeof BookDetail> = {
  title: 'Components/BookDetail',
  component: BookDetail,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template: '<div style="max-width: 960px; padding: 24px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof BookDetail>

export const Default: Story = {
  args: {
    book: baseBook,
    shortlisted: false,
  },
}

export const MinimalFields: Story = {
  args: {
    book: {
      id: 'minimal',
      title: 'Sparse Volume',
    },
  },
}

export const Shortlisted: Story = {
  args: {
    book: baseBook,
    shortlisted: true,
  },
}
