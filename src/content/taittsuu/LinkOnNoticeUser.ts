const getNoticesElement = () => document.querySelector(".container-left>#notices")
const update = () => {
  const pane = getNoticesElement()
  pane?.querySelectorAll(".notice-message>b:first-child:not(:has(a))").forEach((elem) => {
    const m = elem.textContent?.match(/^@(.+)さん$/)
    if (m) {
      elem.innerHTML = `<a href="https://taittsuu.com/users/${m[1]}" target="_blank">${m[0]}</a>`
    } else {
      console.log("not match", elem.textContent)
    }
  })
}

const observer = new MutationObserver(update)

const set = () => {
  const pane = getNoticesElement()
  if (pane) {
    update()
    observer.observe(pane, {
      childList: true,
      subtree: true
    })
  }
}

const unset = () => {
  observer.disconnect()
  const pane = getNoticesElement()
  pane?.querySelectorAll(".notice-message>b:first-child:has(a)").forEach((elem) => {
    elem.textContent = elem.firstElementChild?.textContent || ""
  })
}
export const LinkOnNoticeUser = {
  set,
  unset
}
