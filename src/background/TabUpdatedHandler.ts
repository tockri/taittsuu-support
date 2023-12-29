import TabUpdatedEvent = chrome.tabs.TabUpdatedEvent
import BrowserClickedEvent = chrome.action.BrowserClickedEvent
import { PostContentStore } from "./PostContentStore"
import { Config } from "./Config"

type ClickedListener = Parameters<BrowserClickedEvent["addListener"]>[0]
type TabUpdatedListener = Parameters<TabUpdatedEvent["addListener"]>[0]

const taittsuRoot = "https://taittsuu.com/"

const extensionIconClicked: ClickedListener = async (tab) => {
  console.log('extensionIconClicked', tab)
  if (tab.url && tab.title) {
    PostContentStore.push({
      url: tab.url,
      body: "\n\n" + tab.title
    })
    const config = await Config.get()
    const path = config.inputPagePath || "home"
    await chrome.tabs.create({
      url: `${taittsuRoot}${path}`
    })
  }
}

const handler: TabUpdatedListener = async (tabId, info, tab) => {
  if (info.status) {
    console.log('TabUpdatedHandler#1', { tabId, info, tab })
    if (tab.url && tab.url.startsWith(taittsuRoot) && !tab.url.startsWith(`${taittsuRoot}users`)) {
      const popup = await chrome.action.getPopup({ tabId: tab.id })
      if (!popup) {
        await chrome.action.setPopup({
          tabId,
          popup: "src/options/options.html"
        })
      }
    } else {
      console.log('TabUpdatedHandler#2', { tabId, info, tab })
      if (!chrome.action.onClicked.hasListeners()) {
        console.log('TabUpdatedHandler#3', 'addListener')
        chrome.action.onClicked.addListener(extensionIconClicked)
      }
    }
  }
}

export const TabUpdatedHandler = {
  handler
}
