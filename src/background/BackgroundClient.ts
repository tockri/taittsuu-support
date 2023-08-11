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

const shift = () => sendMessage<PageInfo | undefined>(MessageUtil.shift())

const getConfig = () => sendMessage<ConfigValues>(MessageUtil.getConfig())

const setConfig = (values: Partial<ConfigValues>) => sendMessage<void>(MessageUtil.setConfig(values))

export const BackgroundClient = {
  shift,
  getConfig,
  setConfig
}
