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
  const listPane = button?.parentElement?.previousElementSibling
  if (button && listPane) {
    let timer = 0
    let prevCount = 0
    const observer = new IntersectionObserver((e) => {
      const updatedCount = listPane.childElementCount
      if (e[0]?.isIntersecting && prevCount !== updatedCount) {
        prevCount = updatedCount
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

const setLightboxOnImage = () => {
  const openLightBox = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const a = e.currentTarget as HTMLAnchorElement
    const membrane = document.createElement("DIV")
    const ms = membrane.style
    ms.display = "flex"
    ms.flexDirection = "row"
    ms.alignItems = "center"
    ms.position = "fixed"
    ms.top = "0"
    ms.left = "0"
    ms.right = "0"
    ms.bottom = "0"
    ms.backgroundColor = "rgba(0, 0, 0, 0.85)"
    ms.zIndex = "10"

    const img = document.createElement("IMG") as HTMLImageElement
    img.src = a.href
    const ist = img.style
    ist.maxHeight = "80%"
    ist.maxWidth = "80%"
    ist.marginLeft = "auto"
    ist.marginRight = "auto"
    membrane.appendChild(img)
    document.body.append(membrane)
    membrane.onclick = () => {
      membrane.remove()
    }
  }
  const updateEvent = () => {
    document.querySelectorAll<HTMLAnchorElement>("div.post-media:has(a)>a").forEach((a) => {
      a.removeEventListener("click", openLightBox)
      a.addEventListener("click", openLightBox)
    })
  }
  updateEvent()
  const observer = new MutationObserver(updateEvent)
  document.querySelectorAll<HTMLElement>("div.container-left").forEach((div) => {
    observer.observe(div, {
      childList: true,
      subtree: true
    })
  })
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
  if (config.lightboxOnImage) {
    setLightboxOnImage()
  }
  const content = await BackgroundClient.getPostContent()
  if (content) {
    showTaiitsuInput(content)
  }
}

initialize().then()
