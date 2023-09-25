import { TwitterIntentSupport } from "./TwitterIntentSupport"
import { PostContent } from "../../backgroundInterface/types"

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

  test("complex", () => {
    const s = `?text=%E3%83%90%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%AC%E3%83%A0%E3%80%8C%E3%81%AE%E5%B8%82%E8%AD%B0%E4%BC%9A%E3%81%8C%E3%80%8D%E7%A0%B4%E7%B6%BB%E3%81%AD%E3%80%82%E5%8A%B4%E5%83%8D%E8%80%85%E3%81%AE%E7%B5%A6%E4%B8%8E%E4%BD%93%E7%B3%BB%E7%B5%B1%E4%B8%80%E3%81%AB%E3%82%88%E3%82%8B10%E5%84%84%E3%83%9D%E3%83%B3%E3%83%89%E3%81%A8%E3%80%81%E3%82%AA%E3%83%A9%E3%82%AF%E3%83%AB%E3%81%AE%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E5%B0%8E%E5%85%A5%E5%A4%B1%E6%95%97%E3%81%AE1%E5%84%84%E3%83%9D%E3%83%B3%E3%83%89%E3%81%BB%E3%81%A9%E3%81%8C%E5%8E%9F%E5%9B%A0%E3%81%A0%E3%81%A3%E3%81%A6%E3%80%82https%3A%2F%2Fwww.birminghammail.co.uk%2Fnews%2Fmidlands-news%2Fcommissioners-take-over-failing-birmingham-27743880+%2F+%E2%80%9C%E3%82%A4%E3%82%AE%E3%83%AA%E3%82%B9%E7%AC%AC2%E3%81%AE%E9%83%BD%E5%B8%82%E3%83%90%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%AC%E3%83%A0%E7%A0%B4%E7%B6%BB%E3%80%80%E5%90%8C%E4%B8%80%E8%B3%83%E9%87%91%E8%BB%BD%E8%A6%96%E3%80%8110%E5%B9%B4%E3%81%AE%E3%83%84%E3%82%B1+-+%E6%97%A5%E6%9C%AC%E7%B5%8C%E6%B8%88%E6%96%B0%E8%81%9E%E2%80%9D+https%3A%2F%2Fhtn.to%2F2QiLdbxFFj`
    const cont = t.createPostContent(s)
    expect(cont).toStrictEqual<PostContent>({
      body:
        "バーミンガム「の市議会が」破綻ね。労働者の給与体系統一による10億ポンドと、オラクルのシステム導入失敗の1億ポンドほどが原因だって。https://www.birminghammail.co.uk/news/midlands-news/commissioners-take-over-failing-birmingham-27743880" +
        "\n\nイギリス第2の都市バーミンガム破綻　同一賃金軽視、10年のツケ - 日本経済新聞",
      url: "https://htn.to/2QiLdbxFFj"
    })
  })
})
