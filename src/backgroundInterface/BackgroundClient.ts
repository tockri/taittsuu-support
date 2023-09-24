import { ConfigChanged, ConfigValues, Message, MessageUtil, PostContent } from "./types"
import ExtensionMessageEvent = chrome.runtime.ExtensionMessageEvent

const sendMessage = <T, M extends Message = Message>(message: M): Promise<T> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      const error = chrome.runtime.lastError
      if (error) {
        console.warn(error)
        reject(error)
      } else {
        resolve(response as T)
      }
    })
  })

const listenMessage = <M extends Message>(method: M["method"], callback: (message: M) => void) => {
  const listener: Parameters<ExtensionMessageEvent["addListener"]>[0] = (m) => {
    if (MessageUtil.isMessage<M>(method)(m)) {
      callback(m)
    }
    return true
  }
  chrome.runtime.onMessage.addListener(listener)
  window.addEventListener("unload", () => {
    chrome.runtime.onMessage.removeListener(listener)
  })
}

const getPostContent = () => sendMessage<PostContent | undefined>(MessageUtil.getPostContent())

const setPostContent = (info: PostContent) => sendMessage<void>(MessageUtil.setPostContent(info))

const getConfig = () => sendMessage<ConfigValues>(MessageUtil.getConfig())

const setConfig = (values: Partial<ConfigValues>) => sendMessage<void>(MessageUtil.setConfig(values))

const listenConfigChanged = async (callback: (values: ConfigValues) => void) => {
  const values = await getConfig()
  callback(values)
  listenMessage<ConfigChanged>("ConfigChanged", (message) => {
    callback(message.values)
  })
}

export const BackgroundClient = {
  getPostContent,
  setPostContent,
  getConfig,
  setConfig,
  listenConfigChanged
}
