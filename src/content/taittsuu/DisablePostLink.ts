export const DisablePostLink = {
  set: () => {
    document.body.classList.add("taittsuu-support-disable-post-link")
  },
  unset: () => {
    document.body.classList.remove("taittsuu-support-disable-post-link")
  }
}
