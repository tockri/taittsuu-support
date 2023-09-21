import { PostContent } from "../background/Message"
import { FpUtil } from "../util/FpUtil"

const createPostContent = (searchString: string): PostContent | undefined => {
  const search = new URLSearchParams(searchString)
  const body = search.get("text") || ""
  const url = search.get("url") || ""
  if (body) {
    return FpUtil.pipe(splitBody, modifyHatenaText)({ body, url })
  }
}

const splitBody = (content: PostContent): PostContent => {
  if (content.body && !content.url) {
    const m = content.body.match(/https?:\/\/\w[\w!?/+\-_~;.,*&@#$%()'[\]]+/g)
    if (m) {
      const url = m[m.length - 1]
      const body = content.body.replace(url, "")
      return { body, url }
    }
  }
  return content
}

const modifyHatenaText = (content: PostContent): PostContent => {
  const m = content.body.match(/^(.+) \/ “(.+)” $/)
  if (m) {
    return { body: `${m[1]}\n\n${m[2]}`, url: content.url }
  }
  return content
}

export const TwitterIntentSupport = {
  createPostContent
}
