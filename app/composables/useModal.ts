// ~/composables/useModal.ts
import { ref } from 'vue'

export function useModal(initial = false) {
  const show = ref(initial)
  function open() { show.value = true }
  function close() { show.value = false }
  function toggle() { show.value = !show.value }
  return { show, open, close, toggle }
}
