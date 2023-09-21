import { InputCounter_For_TestOnly } from "./InputCounter"

describe("InputCounter", () => {
  test("count simply", () => {
    const t = InputCounter_For_TestOnly
    const cnt = t.count(
      "バーミンガム「の市議会が」破綻ね。労働者の給与体系統一による10億ポンドと、オラクルのシステム導入失敗の1億ポンドほどが原因だって。https://www.birminghammail.co.uk/news/midlands-news/commissioners-take-over-failing-birmingham-27743880\n" +
        "\n" +
        "イギリス第2の都市バーミンガム破綻　同一賃金軽視、10年のツケ - 日本経済\n" +
        "https://htn.to/2QiLdbxFFj"
    )
    expect(cnt).toBe(166.5)
  })
})
