import ExtensionMessageEvent = chrome.runtime.ExtensionMessageEvent

import { ConfigValues, MessageUtil, PageInfo } from "./Message"
import { PageInfoStore } from "./PageInfoStore"

type MessageListener = Parameters<ExtensionMessageEvent["addListener"]>[0]

const handler: MessageListener = (message, sender, callback) => {
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
  const pi = PageInfoStore.store.shift()
  callback(pi)
}

const setPageInfo = (info: PageInfo, callback: (args: unknown) => void) => {
  PageInfoStore.store.push(info)
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

export const MessageHandler = {
  handler
}
