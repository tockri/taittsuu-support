const listener = (e: KeyboardEvent) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !e.isComposing) {
    const button = document.getElementById("taiitsuButton")
    button?.click()
  }
}

const set = () => {
  const textarea = document.getElementById("taiitsuInput")
  if (textarea) {
    textarea.addEventListener("keydown", listener)
  }
}

const unset = () => {
  const textarea = document.getElementById("taiitsuInput")
  if (textarea) {
    textarea.removeEventListener("keydown", listener)
  }
}

export const SubmitByKeyboard = {
  set,
  unset
}
