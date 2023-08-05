import { BackgroundClient } from "../background/BackgroundClient"
import { Waiter } from "../util/Waiter"

const showTaiitsuInput = async () => {
  const pageInfo = await BackgroundClient.shift()
  if (pageInfo) {
    console.log({ pageInfo })
    const btn = document.querySelector(".container-right .btn-primary") as HTMLButtonElement
    if (btn) {
      btn.click()
      Waiter.waitForReady(
        3,
        () => !!document.querySelector("#taiitsuInput"),
        () => {
          const textArea = document.querySelector<HTMLTextAreaElement>("#taiitsuInput")
          if (textArea) {
            textArea.value = `\n${pageInfo.title}\n${pageInfo.url}`
            textArea.focus()
            textArea.setSelectionRange(0, 0)
            textArea.scrollTo({ top: 0 })
          }
        }
      )
    } else {
      console.warn("Taittsuu-support warning: ", "button not found.")
    }
  }
}

showTaiitsuInput().then()
