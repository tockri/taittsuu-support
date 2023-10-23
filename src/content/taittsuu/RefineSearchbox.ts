let on = false

const setInputEvent = (input: HTMLInputElement, button: HTMLButtonElement) => {
  input.addEventListener("keydown", (e) => {
    if (on && e.key === "Enter" && !e.isComposing) {
      button.click()
    }
  })
}

const set = () => {
  const searchBox = document.querySelector(".container-left .search-panel")
  if (searchBox) {
    on = true
    document.body.classList.add("taittsuu-support-refine-searchbox")
    searchBox.previousElementSibling?.classList.add("taittsuu-support-search-mode")
    const input = document.getElementById("searchInput") as HTMLInputElement
    const button = document.getElementById("searchButton") as HTMLButtonElement
    if (input && button) {
      setInputEvent(input, button)
    }
  }
}

const unset = () => {
  on = false
  document.body.classList.remove("taittsuu-support-refine-searchbox")
}

export const RefineSearchbox = {
  set,
  unset
}
