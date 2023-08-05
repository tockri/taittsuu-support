import { BackgroundClient } from "../background/BackgroundClient"
import { Waiter } from "../util/Waiter"

const showTaiitsuInput = async () => {
  const pageInfo = await BackgroundClient.shift()
  if (pageInfo) {
    const btn = document.querySelector(".container-right .btn-primary") as HTMLButtonElement
    if (btn) {
      btn.click()
      Waiter.waitForReady(
        3,
        () =>
          Array.from(document.querySelectorAll("#taiitsuInput")).filter(
            (e) => (e as HTMLElement).offsetParent !== null
          )[0] as HTMLTextAreaElement,
        (textArea) => {
          textArea.value = `\n${pageInfo.title}\n${pageInfo.url}`
          textArea.focus()
          textArea.setSelectionRange(0, 0)
          textArea.scrollTo({ top: 0 })
        }
      )
    } else {
      console.warn("Taittsuu-support warning: ", "button not found.")
    }
  }
}

showTaiitsuInput().then()
