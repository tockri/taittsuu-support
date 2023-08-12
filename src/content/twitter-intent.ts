import { BackgroundClient } from "../background/BackgroundClient"
import { PageInfo } from "../background/Message"

const createPageInfo = (): PageInfo | undefined => {
  const search = new URLSearchParams(location.search)
  const text = search.get("text") || ""
  const url = search.get("url") || ""
  if (text && url) {
    return {
      title: text,
      url
    }
  } else if (text) {
    const m = text.match(/https?:\/\/\w[\w!?/+\-_~;.,*&@#$%()'[\]]+/)
    console.log("match", m)
    if (m) {
      const title = text.replace(m[0], "")
      const url = m[0]
      return { title, url }
    }
  }
}

const start = async () => {
  const config = await BackgroundClient.getConfig()
  if (config.overrideTwitter) {
    const pageInfo = createPageInfo()
    if (pageInfo && confirm("「どこでもタイーツ」からのメッセージ：\nXのかわりにタイッツーでシェアしますか？")) {
      await BackgroundClient.setPageInfo(pageInfo)
      location.href = "https://taittsuu.com/home"
    }
  }
}

start().then()
