import { TYPES } from '@/types'

export default function saveStatePlugin(store) {
  store.subscribe(
    (mutation, state) => {
      localStorage.setItem(TYPES.TASKS, JSON.stringify(state.tasks))
      localStorage.setItem(TYPES.LOCALE, state.locale)
    }
  )
}
