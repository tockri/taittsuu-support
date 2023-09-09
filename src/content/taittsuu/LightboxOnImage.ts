const openLightBox = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  const a = e.currentTarget as HTMLAnchorElement
  const membrane = document.createElement("DIV")
  const ms = membrane.style
  ms.display = "flex"
  ms.flexDirection = "row"
  ms.alignItems = "center"
  ms.position = "fixed"
  ms.top = "0"
  ms.left = "0"
  ms.right = "0"
  ms.bottom = "0"
  ms.backgroundColor = "rgba(0, 0, 0, 0.85)"
  ms.zIndex = "10"

  const img = document.createElement("IMG") as HTMLImageElement
  img.src = a.href
  const ist = img.style
  ist.maxHeight = "80%"
  ist.maxWidth = "80%"
  ist.marginLeft = "auto"
  ist.marginRight = "auto"
  membrane.appendChild(img)
  document.body.append(membrane)
  membrane.onclick = () => {
    membrane.remove()
  }
}

const updateEvent = () => {
  document.querySelectorAll<HTMLAnchorElement>("div.post-media:has(a)>a").forEach((a) => {
    a.removeEventListener("click", openLightBox)
    a.addEventListener("click", openLightBox)
  })
}

const observer = new MutationObserver(updateEvent)

const set = () => {
  updateEvent()
  document.querySelectorAll<HTMLElement>("div.container-left").forEach((div) => {
    observer.observe(div, {
      childList: true,
      subtree: true
    })
  })
}

const unset = () => {
  document.querySelectorAll<HTMLAnchorElement>("div.post-media:has(a)>a").forEach((a) => {
    a.removeEventListener("click", openLightBox)
  })
  observer.disconnect()
}

export const LightboxOnImage = {
  set,
  unset
}
