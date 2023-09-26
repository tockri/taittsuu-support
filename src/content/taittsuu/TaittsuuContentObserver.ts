type CallbackFunc = (elem: HTMLElement, records: MutationRecord[]) => void

const callbacks = new Map<string, CallbackFunc>()

const observer = new MutationObserver((records) => {
  const pane = targetElement()
  if (pane) {
    for (const func of callbacks.values()) {
      try {
        func(pane, records)
      } catch (e) {
        console.warn(e)
      }
    }
  }
})

const targetElement = (): HTMLElement | null => {
  const panes = document.querySelectorAll<HTMLElement>("div.container-left")
  if (panes.length > 0) {
    return panes[panes.length - 1]
  } else {
    return null
  }
}

const start = (id: string, callback: CallbackFunc) => {
  const pane = targetElement()
  if (pane) {
    const isFirst = callbacks.size === 0
    callback(pane, [])
    callbacks.set(id, callback)
    if (isFirst) {
      observer.observe(pane, {
        childList: true,
        subtree: true
      })
      console.debug("started observation.")
    }
  }
}

const stop = (id: string) => {
  const isLast = callbacks.size === 1 && callbacks.has(id)
  callbacks.delete(id)
  if (isLast) {
    observer.disconnect()
    console.debug("observer disconnected.")
  }
}

export const TaittsuuContentObserver = {
  start,
  stop,
  targetElement
}
