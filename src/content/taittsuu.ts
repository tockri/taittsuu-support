import { BackgroundClient } from "../background/BackgroundClient"
import { Waiter } from "../util/Waiter"
import { PostContent } from "../background/Message"

const setWideInputStyle = () => {
  const styleId = "taittsuu-support-wideInput-style"
  if (!document.getElementById(styleId)) {
    const st = document.createElement("STYLE")
    st.id = styleId
    st.innerHTML = `
#taiitsuDialogInner textarea#taiitsuInput {
  width: 560px;
  min-height: 240px;
}
    `
    document.head.append(st)
  }
}

const setInputCounter = () => {
  const styleId = "taittsuu-support-input-counter-style"
  if (!document.getElementById(styleId)) {
    const st = document.createElement("STYLE")
    st.id = styleId
    st.innerHTML = `
.taittsuu-support-input-counter {
  width: 120px;
  color: #666;
  font-size: 0.8rem;
  margin-left: auto;
  margin-top: -12px;
  margin-bottom: 12px;
}
    `
    document.head.append(st)
  }
  const textarea = document.getElementById("taiitsuInput") as HTMLTextAreaElement | null
  if (textarea) {
    const counterPane = document.createElement("DIV")
    counterPane.className = "taittsuu-support-input-counter"
    counterPane.innerHTML = "文字数: <span></span>"
    textarea.parentElement?.insertBefore(counterPane, textarea.nextElementSibling)
    const digitSpan = counterPane.querySelector("span")
    const update = () => {
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

const showTaiitsuInput = (content: PostContent) => {
  const btn = document.querySelector(".container-right .btn-primary:has(i.fa-pen)") as HTMLButtonElement
  if (btn) {
    btn.click()
    Waiter.waitForReady(
      3,
      () =>
        Array.from(document.querySelectorAll("#taiitsuInput")).filter(
          (e) => (e as HTMLElement).offsetParent !== null
        )[0] as HTMLTextAreaElement,
      (textArea) => {
        textArea.value = `${content.body}\n${content.url}`
        textArea.focus()
        textArea.setSelectionRange(0, 0)
        textArea.scrollTo({ top: 0 })
      }
    )
  } else {
    console.warn("Taittsuu-support warning: ", "button not found.")
  }
}

const setAutomaticTimelineLoader = () => {
  const button = document.querySelector<HTMLButtonElement>(".container-left>div>button#loadButton")
  if (button) {
    let timer = 0
    const observer = new IntersectionObserver((e) => {
      if (e[0]?.isIntersecting) {
        timer = window.setTimeout(() => {
          button.click()
        }, 500)
      } else {
        window.clearTimeout(timer)
      }
    })
    observer.observe(button)
  }
}

const initialize = async () => {
  const config = await BackgroundClient.getConfig()
  if (config.wideInput) {
    setWideInputStyle()
  }
  if (config.showCharCount) {
    setInputCounter()
  }
  if (config.loadTimelineAutomatically) {
    setAutomaticTimelineLoader()
  }
  const content = await BackgroundClient.getPostContent()
  if (content) {
    showTaiitsuInput(content)
  }
}

initialize().then()
