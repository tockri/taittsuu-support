import { ConfigValues, MessageUtil } from "../backgroundInterface/types"

const get = async (): Promise<ConfigValues> => {
  const { config: values } = await chrome.storage.local.get("config")
  return values
}

const set = async (values: Partial<ConfigValues>, callback: (args: unknown) => void) => {
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

export const Config = {
  get,
  set
}
