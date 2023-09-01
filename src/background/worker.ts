import { MessageHandler } from "./MessageHandler"
import { TabUpdatedHandler } from "./TabUpdatedHandler"

const initWorker = () => {
  chrome.runtime.onMessage.addListener(MessageHandler.handler)
  chrome.tabs.onUpdated.addListener(TabUpdatedHandler.handler)
}
initWorker()
