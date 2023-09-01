import { BackgroundClient } from "../background/BackgroundClient"
import { TwitterIntentSupport } from "./TwitterIntentSupport"

const start = async () => {
  const config = await BackgroundClient.getConfig()
  if (config.overrideTwitter) {
    const content = TwitterIntentSupport.createPostContent(location.search)
    if (content && confirm("「どこでもタイーツ」からのメッセージ：\nXのかわりにタイッツーでシェアしますか？")) {
      await BackgroundClient.setPostContent(content)
      location.href = "https://taittsuu.com/home"
    }
  }
}

start().then()
