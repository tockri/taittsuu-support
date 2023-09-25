type CallbackFunc = (elem: HTMLElement) => void

const callbacks = new Map<string, CallbackFunc>()

const observer = new MutationObserver((a, b, c) => {
  console.log({ a, b, c })
})

const start = (id: string, callback: CallbackFunc) => {
  callbacks.set(id, callback)
}

const stop = (id: string) => {
  callbacks.delete(id)
}

export const TaittsuuContentObserver = {
  start,
  stop
}
