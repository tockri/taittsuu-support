import { BackgroundClient } from "../backgroundInterface/BackgroundClient"
import { Waiter } from "../util/Waiter"
import { PostContent } from "../backgroundInterface/types"
import { WideInputStyle } from "./taittsuu/WideInput"
import { LightboxOnImage } from "./taittsuu/LightboxOnImage"
import { InputCounter } from "./taittsuu/InputCounter"
import { AutomaticTimelineLoader } from "./taittsuu/AutomaticTimelineLoader"
import { LinkOnNoticeUser } from "./taittsuu/LinkOnNoticeUser"

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

const initialize = async () => {
  await BackgroundClient.listenConfigChanged((config) => {
    if (config.wideInput) {
      WideInputStyle.set()
    } else {
      WideInputStyle.unset()
    }
    if (config.showCharCount) {
      InputCounter.set()
    } else {
      InputCounter.unset()
    }
    if (config.loadTimelineAutomatically) {
      AutomaticTimelineLoader.set()
    } else {
      AutomaticTimelineLoader.unset()
    }
    if (config.lightboxOnImage) {
      LightboxOnImage.set()
    } else {
      LightboxOnImage.unset()
    }
    if (config.linkOnNoticeUser) {
      LinkOnNoticeUser.set()
    } else {
      LinkOnNoticeUser.unset()
    }
  })
  const content = await BackgroundClient.getPostContent()
  if (content) {
    showTaiitsuInput(content)
  }
}

initialize().then()
