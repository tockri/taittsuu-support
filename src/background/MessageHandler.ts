import ExtensionMessageEvent = chrome.runtime.ExtensionMessageEvent

import { ConfigValues, MessageUtil } from "./Message"
import { PostContentStore } from "./PostContentStore"

type MessageListener = Parameters<ExtensionMessageEvent["addListener"]>[0]

const handler: MessageListener = (message, sender, callback) => {
  if (MessageUtil.isGetPostContent(message)) {
    callback(PostContentStore.pop())
  } else if (MessageUtil.isSetPostContent(message)) {
    PostContentStore.push(message.content)
    callback(null)
  } else if (MessageUtil.isSetConfig(message)) {
    setConfig(message.values, callback).then()
  } else if (MessageUtil.isGetConfig(message)) {
    getConfig(callback).then()
  }
  return true
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
  const tabs = await chrome.tabs.query({
    url: "https://taittsuu.com/*"
  })
  tabs.forEach((tab) => {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, MessageUtil.configChanged(config))
    }
  })
}

export const MessageHandler = {
  handler
}
