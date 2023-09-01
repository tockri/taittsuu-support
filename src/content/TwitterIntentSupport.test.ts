import { TwitterIntentSupport } from "./TwitterIntentSupport"
import { PostContent } from "../background/Message"

describe("TwitterIntent", () => {
  const t = TwitterIntentSupport
  test("undefined", () => {
    const cont = t.createPostContent("")
    expect(cont).toBe(undefined)
  })

  test("simple", () => {
    const s =
      '?text=油じゃなかったのか！+%2F+“つわり妊婦にマックのポテトが人気なのには科学的根拠があった！つわりと戦う妊婦さんによる"つわり飯"や動物のつわりについても紹介”+https%3A%2F%2Fhtn.to%2F3privyivac'
    const cont = t.createPostContent(s)
    expect(cont).toStrictEqual<PostContent>({
      body: '油じゃなかったのか！\n\nつわり妊婦にマックのポテトが人気なのには科学的根拠があった！つわりと戦う妊婦さんによる"つわり飯"や動物のつわりについても紹介',
      url: "https://htn.to/3privyivac"
    })
  })
})
