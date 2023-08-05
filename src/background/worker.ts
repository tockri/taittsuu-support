import MessageSender = chrome.runtime.MessageSender
import { PageInfo } from "./Message"

const taittsuHomeUrl = "https://taittsuu.com/home"

const pageInfoQueue: Array<PageInfo> = []

const messageListener = (message: unknown, sender: MessageSender, callback: (arg: unknown) => void) => {
  console.log({ message, sender, callback })
}

const initWorker = () => {
  chrome.runtime.onMessage.addListener(messageListener)
  chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.title && tab.url !== taittsuHomeUrl) {
      pageInfoQueue.push({
        url: tab.url,
        title: tab.title
      })
      chrome.tabs
        .create({
          url: taittsuHomeUrl
        })
        .then()
    }
  })
}
initWorker()
