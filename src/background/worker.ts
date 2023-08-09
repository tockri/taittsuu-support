import MessageSender = chrome.runtime.MessageSender
import { MessageUtil, PageInfo } from "./Message"

const taittsuHomeUrl = "https://taittsuu.com/home"

const pageInfoQueue: Array<PageInfo> = []

const messageListener = (message: unknown, sender: MessageSender, callback: (arg: unknown) => void) => {
  if (MessageUtil.isShift(message)) {
    shift(callback)
  }
}

const shift = (callback: (args: unknown) => void) => {
  const pi = pageInfoQueue.shift()
  callback(pi)
}

const tabUpdatedListener = async (tabId: number, info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (info.status === "complete") {
    if (tab.url === taittsuHomeUrl) {
      await chrome.action.setPopup({
        tabId,
        popup: "config.html"
      })
    } else {
      if (!chrome.action.onClicked.hasListeners()) {
        chrome.action.onClicked.addListener(async (tab) => {
          if (tab.url && tab.title) {
            pageInfoQueue.push({
              url: tab.url,
              title: tab.title
            })
            await chrome.tabs.create({
              url: taittsuHomeUrl
            })
          }
        })
      }
    }
  }
}

const initWorker = () => {
  chrome.runtime.onMessage.addListener(messageListener)
  chrome.tabs.onUpdated.addListener(tabUpdatedListener)
}
initWorker()
