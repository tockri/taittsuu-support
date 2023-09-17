const counterPaneId = "taittsuu-support-input-counter"

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
          const m = text.match(/[a-zA-Z0-9!-/:-@¥[-`{-~]+/)
          const len = text.length - (m ? m[0].length / 2 : 0)
          digitSpan.innerText = `${len}`
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
