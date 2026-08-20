import type { Book } from '~/types/book'

const STORAGE_KEY = 'shelf-shortlist'

export function useShortlist() {
  const items = useState<Book[]>('shortlist', () => [])

  function loadFromStorage() {
    if (!import.meta.client) return

    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return

    try {
      items.value = JSON.parse(raw) as Book[]
    }
    catch {
      items.value = []
    }
  }

  function saveToStorage() {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function isShortlisted(id: string) {
    return items.value.some(book => book.id === id)
  }

  function add(book: Book) {
    if (isShortlisted(book.id)) return
    items.value = [...items.value, book]
    saveToStorage()
  }

  function remove(id: string) {
    items.value = items.value.filter(book => book.id !== id)
    saveToStorage()
  }

  function toggle(book: Book) {
    if (isShortlisted(book.id)) {
      remove(book.id)
    }
    else {
      add(book)
    }
  }

  onMounted(loadFromStorage)

  return {
    items: readonly(items),
    count: computed(() => items.value.length),
    isShortlisted,
    add,
    remove,
    toggle,
  }
}
