import { ConfigValues, Message, MessageUtil, PageInfo } from "./Message"

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

const getPageInfo = () => sendMessage<PageInfo | undefined>(MessageUtil.getPageInfo())

const setPageInfo = (info: PageInfo) => sendMessage<void>(MessageUtil.setPageInfo(info))

const getConfig = () => sendMessage<ConfigValues>(MessageUtil.getConfig())

const setConfig = (values: Partial<ConfigValues>) => sendMessage<void>(MessageUtil.setConfig(values))

export const BackgroundClient = {
  getPageInfo,
  setPageInfo,
  getConfig,
  setConfig
}
