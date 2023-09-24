import ExtensionMessageEvent = chrome.runtime.ExtensionMessageEvent

import { MessageUtil } from "../backgroundInterface/types"
import { PostContentStore } from "./PostContentStore"
import { Config } from "./Config"

type MessageListener = Parameters<ExtensionMessageEvent["addListener"]>[0]

const handler: MessageListener = (message, sender, callback) => {
  if (MessageUtil.isGetPostContent(message)) {
    callback(PostContentStore.pop())
  } else if (MessageUtil.isSetPostContent(message)) {
    PostContentStore.push(message.content)
    callback(null)
  } else if (MessageUtil.isSetConfig(message)) {
    Config.set(message.values, callback).then()
  } else if (MessageUtil.isGetConfig(message)) {
    Config.get().then((v) => callback(v))
  }
  return true
}

export const MessageHandler = {
  handler
}
