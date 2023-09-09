const set = () => {
  const styleId = "taittsuu-support-wideInput-style"
  if (!document.getElementById(styleId)) {
    const st = document.createElement("STYLE")
    st.id = styleId
    st.innerHTML = `
#taiitsuDialogInner textarea#taiitsuInput {
  width: 560px;
  min-height: 240px;
}
    `
    document.head.append(st)
  }
}

const unset = () => {
  const styleId = "taittsuu-support-wideInput-style"
  const st = document.getElementById(styleId)
  if (st) {
    st.remove()
  }
}

export const WideInputStyle = {
  set,
  unset
}
