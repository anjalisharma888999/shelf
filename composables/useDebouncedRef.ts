export function useDebouncedRef<T>(value: Ref<T>, delayMs = 300) {
  const debounced = ref(value.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout> | undefined

  watch(value, (next) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = next
    }, delayMs)
  })

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })

  return debounced
}
