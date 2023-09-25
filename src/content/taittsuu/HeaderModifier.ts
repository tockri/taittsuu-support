let watcher: HeaderWatcher | null = null

const init = () => {
  watcher = new HeaderWatcher()
}

class HeaderWatcher {
  readonly h3: HTMLHeadingElement | null = null
  readonly links: HTMLDivElement | null = null
  constructor() {
    const h3 = document.querySelector<HTMLHeadingElement>(".container-left > h3:first-of-type")
    if (h3) {
      h3.classList.add("taittsuu-support-header-h3")
      this.h3 = h3
      const next = h3.nextElementSibling
      if (next && next.tagName === "DIV" && next.querySelector('a[href="https://taittsuu.com/home"]')) {
        next.classList.add("taittsuu-support-header-links")
        this.links = next as HTMLDivElement
      }
    }
  }

  private moveByClientY(elem: HTMLElement, goalLeft: number, g: number) {
    const { y } = elem.getBoundingClientRect()
    if (y < goalLeft / g) {
      elem.style.marginLeft = `${goalLeft - y * g}px`
    } else {
      elem.style.removeProperty("margin-left")
    }
  }

  onScroll() {
    if (this.h3) {
      this.moveByClientY(this.h3, 120, 2)
    }
    if (this.links) {
      this.moveByClientY(this.links, 310, 3)
    }
  }

  deactivate() {
    const reset = (elem: HTMLElement) => {
      elem.style.removeProperty("margin-left")
    }
    if (this.h3) {
      reset(this.h3)
    }
    if (this.links) {
      reset(this.links)
    }
  }
}

const scrollListener = () => {
  if (watcher) {
    watcher.onScroll()
  }
}

const set = () => {
  document.body.classList.add("taittsuu-support-modify-header")
  window.addEventListener("scroll", scrollListener)
  if (watcher) {
    watcher.onScroll()
  }
}

const unset = () => {
  document.body.classList.remove("taittsuu-support-modify-header")
  window.removeEventListener("scroll", scrollListener)
  if (watcher) {
    watcher.deactivate()
  }
}

export const HeaderModifier = {
  init,
  set,
  unset
}
