import MessageSender = chrome.runtime.MessageSender
import { ConfigValues, MessageUtil, PageInfo } from "./Message"

const taittsuHomeUrl = "https://taittsuu.com/home"

const pageInfoQueue: Array<PageInfo> = []

const messageListener = (message: unknown, sender: MessageSender, callback: (arg: unknown) => void) => {
  if (MessageUtil.isGetPageInfo(message)) {
    getPageInfo(callback)
  } else if (MessageUtil.isSetPageInfo(message)) {
    setPageInfo(message.info, callback)
  } else if (MessageUtil.isSetConfig(message)) {
    setConfig(message.values, callback).then()
  } else if (MessageUtil.isGetConfig(message)) {
    getConfig(callback).then()
  }
  return true
}

const getPageInfo = (callback: (args: unknown) => void) => {
  const pi = pageInfoQueue.shift()
  callback(pi)
}

const setPageInfo = (info: PageInfo, callback: (args: unknown) => void) => {
  pageInfoQueue.push(info)
  callback(null)
}

const getConfig = async (callback: (args: unknown) => void) => {
  const { config: values } = await chrome.storage.local.get("config")
  callback(values || {})
}

const setConfig = async (values: Partial<ConfigValues>, callback: (args: unknown) => void) => {
  const { config: curr } = await chrome.storage.local.get("config")
  const config: ConfigValues = { ...curr, ...values }
  await chrome.storage.local.set({ config: config })
  callback(null)
}

const tabUpdatedListener = async (tabId: number, info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (info.status === "complete") {
    if (tab.url === taittsuHomeUrl) {
      await chrome.action.setPopup({
        tabId,
        popup: "src/config/config.html"
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
