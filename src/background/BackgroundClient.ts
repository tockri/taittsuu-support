import { Message, MessageUtil, PageInfo } from "./Message"

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

const shift = () => sendMessage<PageInfo>(MessageUtil.shift())

export const BackgroundClient = {
  shift
}
