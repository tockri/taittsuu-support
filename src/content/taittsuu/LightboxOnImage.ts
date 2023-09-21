const $ = <E extends HTMLElement = HTMLElement>(tag: string, className: string): E => {
  const elem = document.createElement(tag.toUpperCase()) as E
  elem.className = className
  return elem
}

class ImgViewer {
  private readonly root: HTMLDivElement
  private readonly leftHandle: HTMLDivElement
  private readonly rightHandle: HTMLDivElement
  private readonly img: HTMLImageElement
  private imgUrls: string[] = []
  private showingIdx = -1
  private active = true

  constructor() {
    const root = $<HTMLDivElement>("div", "taittsuu-support-lightbox-membrane")
    root.style.display = "none"
    root.addEventListener("click", () => {
      this.hide()
    })
    document.body.append(root)
    this.root = root

    const area = $<HTMLDivElement>("div", "taittsuu-support-lightbox-area")
    root.append(area)

    const left = $<HTMLDivElement>("div", "taittsuu-support-lightbox-handle")
    left.innerText = "<"
    left.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.show(this.showingIdx - 1)
    })
    area.append(left)
    this.leftHandle = left

    const img = $<HTMLImageElement>("img", "taittsuu-support-lightbox-img")
    area.append(img)
    this.img = img

    const right = $<HTMLDivElement>("div", "taittsuu-support-lightbox-handle")
    right.innerText = ">"
    right.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.show(this.showingIdx + 1)
    })
    area.append(right)
    this.rightHandle = right

    document.body.addEventListener("keydown", (e) => {
      if (this.showingIdx >= 0) {
        if (e.key === "ArrowRight") {
          if (this.showingIdx < this.imgUrls.length - 1) {
            this.show(this.showingIdx + 1)
          }
        } else if (e.key === "ArrowLeft") {
          if (this.showingIdx > 0) {
            this.show(this.showingIdx - 1)
          }
        } else if (e.key === "Escape") {
          this.hide()
        }
      }
    })
  }

  show(idx: number) {
    this.showingIdx = idx
    if (idx === 0) {
      this.leftHandle.style.display = "none"
    } else {
      this.leftHandle.style.removeProperty("display")
    }
    this.img.src = this.imgUrls[idx]
    if (idx >= this.imgUrls.length - 1) {
      this.rightHandle.style.display = "none"
    } else {
      this.rightHandle.style.removeProperty("display")
    }
    this.root.style.removeProperty("display")
  }

  hide() {
    this.root.style.display = "none"
    this.showingIdx = -1
  }

  setImgUrls(imgUrls: string[]) {
    this.imgUrls = imgUrls
  }

  activate(active: boolean) {
    this.active = active
  }

  isActive() {
    return this.active
  }
}

const viewer = new ImgViewer()

const registerImagesToViewer = () => {
  document.querySelectorAll<HTMLDivElement>("div.post-media:has(a)").forEach((div) => {
    if (!div.classList.contains("taittsuu-support-image-viewer-root")) {
      div.classList.add("taittsuu-support-image-viewer-root")
      const anchors = Array.from(div.querySelectorAll<HTMLAnchorElement>("a:has(img)"))
      const imgUrls = anchors.map((a) => a.href)
      anchors.forEach((a, idx) => {
        a.addEventListener("click", (e) => {
          if (viewer.isActive()) {
            e.preventDefault()
            e.stopPropagation()
            viewer.setImgUrls(imgUrls)
            viewer.show(idx)
          }
        })
      })
    }
  })
}

const observer = new MutationObserver(registerImagesToViewer)

const set = () => {
  viewer.activate(true)
  registerImagesToViewer()
  document.querySelectorAll<HTMLElement>("div.container-left").forEach((div) => {
    observer.observe(div, {
      childList: true,
      subtree: true
    })
  })
}

const unset = () => {
  viewer.activate(false)
}

export const LightboxOnImage = {
  set,
  unset
}
