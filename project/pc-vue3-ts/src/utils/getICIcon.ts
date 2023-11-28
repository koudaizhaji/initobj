import { defineAsyncComponent } from 'vue'

export const getIcon = (iconStr: string) => {
  return defineAsyncComponent(async () => {
    try {
      return await import(`~icons/ic/${iconStr}`)
    } catch (e) {
      return await import(`~icons/ic/outline-home-work`)
    }
  })
}
