import { TaittsuuContentObserver } from "./TaittsuuContentObserver"

const set = () => {
  TaittsuuContentObserver.start("LinkOnNoticeUser", (pane) => {
    pane.querySelectorAll(".notice-message>b:first-child:not(:has(a))").forEach((elem) => {
      const m = elem.textContent?.match(/^@(.+)さん$/)
      if (m) {
        elem.innerHTML = `<a href="https://taittsuu.com/users/${m[1]}" target="_blank">${m[0]}</a>`
      } else {
        console.log("not match", elem.textContent)
      }
    })
  })
}

const unset = () => {
  const pane = TaittsuuContentObserver.targetElement()
  pane?.querySelectorAll(".notice-message>b:first-child:has(a)").forEach((elem) => {
    elem.textContent = elem.firstElementChild?.textContent || ""
  })
  TaittsuuContentObserver.stop("LinkOnNoticeUser")
}
export const LinkOnNoticeUser = {
  set,
  unset
}
