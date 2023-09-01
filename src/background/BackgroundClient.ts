import { ConfigValues, Message, MessageUtil, PostContent } from "./Message"

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

const getPostContent = () => sendMessage<PostContent | undefined>(MessageUtil.getPostContent())

const setPostContent = (info: PostContent) => sendMessage<void>(MessageUtil.setPostContent(info))

const getConfig = () => sendMessage<ConfigValues>(MessageUtil.getConfig())

const setConfig = (values: Partial<ConfigValues>) => sendMessage<void>(MessageUtil.setConfig(values))

export const BackgroundClient = {
  getPostContent,
  setPostContent,
  getConfig,
  setConfig
}
