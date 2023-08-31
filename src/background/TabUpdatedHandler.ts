import TabUpdatedEvent = chrome.tabs.TabUpdatedEvent
import { PageInfoStore } from "./PageInfoStore"
import BrowserClickedEvent = chrome.action.BrowserClickedEvent

type ClickedListener = Parameters<BrowserClickedEvent["addListener"]>[0]
type TabUpdatedListener = Parameters<TabUpdatedEvent["addListener"]>[0]

const taittsuHomeUrl = "https://taittsuu.com/home"

const extensionIconClicked: ClickedListener = async (tab) => {
  if (tab.url && tab.title) {
    PageInfoStore.store.push({
      url: tab.url,
      title: tab.title
    })
    await chrome.tabs.create({
      url: taittsuHomeUrl
    })
  }
}

const handler: TabUpdatedListener = async (tabId, info, tab) => {
  if (info.status === "complete") {
    if (tab.url === taittsuHomeUrl) {
      await chrome.action.setPopup({
        tabId,
        popup: "src/config/config.html"
      })
    } else {
      if (!chrome.action.onClicked.hasListeners()) {
        chrome.action.onClicked.addListener(extensionIconClicked)
      }
    }
  }
}

export const TabUpdatedHandler = {
  handler
}
