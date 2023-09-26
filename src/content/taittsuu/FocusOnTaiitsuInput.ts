const dialog = document.getElementById("taiitsuDialog")
const observer = new MutationObserver(() => {
  if (dialog && dialog.getBoundingClientRect().width) {
    const ta = dialog.querySelector<HTMLTextAreaElement>("textarea")
    if (ta) {
      ta.focus()
    }
  }
})

const set = () => {
  if (dialog) {
    observer.observe(dialog, { attributes: true })
  }
}

const unset = () => {
  observer.disconnect()
}

export const FocusOnTaiitsuInput = {
  set,
  unset
}
