const counterPaneId = "taittsuu-support-input-counter"

const count = (text: string): number => {
  let length = 0
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i)
    if (
      (c !== 0xa && 0 <= c && c < 0x81) ||
      c === 0xf8f0 ||
      (c >= 0xff61 && c < 0xffa0) ||
      (c >= 0xf8f1 && c < 0xf8f4)
    ) {
      length += 0.5
    } else {
      length += 1
    }
  }
  return length
}

const set = () => {
  const textarea = document.getElementById("taiitsuInput") as HTMLTextAreaElement | null
  let counterPane = document.getElementById(counterPaneId)
  if (textarea) {
    if (counterPane) {
      counterPane.style.display = "block"
    } else {
      counterPane = document.createElement("DIV")
      counterPane.id = "taittsuu-support-input-counter"
      counterPane.innerHTML = "文字数: <span></span>"
      textarea.parentElement?.insertBefore(counterPane, textarea.nextElementSibling)
      const digitSpan = counterPane.querySelector("span")
      const update = (e: KeyboardEvent | FocusEvent) => {
        const textarea = e.target as HTMLTextAreaElement
        if (digitSpan) {
          const text = textarea.value.trim()
          digitSpan.innerText = `${count(text)}`
        }
      }
      textarea.autofocus = true
      textarea.addEventListener("keyup", update)
      textarea.addEventListener("focus", update)
    }
  }
}

const unset = () => {
  const counterPane = document.getElementById(counterPaneId)
  if (counterPane) {
    counterPane.style.display = "none"
  }
}

export const InputCounter = {
  set,
  unset
}

export const InputCounter_For_TestOnly = {
  count
}
