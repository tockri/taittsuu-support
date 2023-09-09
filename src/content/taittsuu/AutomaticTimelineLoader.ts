let on = true

const set = () => {
  if (!on) {
    on = true
    return
  }
  const button = document.querySelector<HTMLButtonElement>(".container-left>div>button#loadButton")
  const listPane = button?.parentElement?.previousElementSibling
  if (button && listPane) {
    let timer = 0
    let prevCount = 0
    const observer = new IntersectionObserver((e) => {
      const updatedCount = listPane.childElementCount
      if (e[0]?.isIntersecting && prevCount !== updatedCount && on) {
        prevCount = updatedCount
        timer = window.setTimeout(() => {
          button.click()
        }, 500)
      } else {
        window.clearTimeout(timer)
      }
    })
    observer.observe(button)
  }
}

const unset = () => {
  on = false
}

export const AutomaticTimelineLoader = {
  set,
  unset
}
