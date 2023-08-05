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

const clickListener = async (tab: chrome.tabs.Tab) => {
  if (tab.url !== taittsuHomeUrl) {
    if (tab.url && tab.title) {
      pageInfoQueue.push({
        url: tab.url,
        title: tab.title
      })
      await chrome.tabs.create({
        url: taittsuHomeUrl
      })
    }
  }
}

const initWorker = () => {
  chrome.runtime.onMessage.addListener(messageListener)
  chrome.action.onClicked.addListener(clickListener)
}
initWorker()
