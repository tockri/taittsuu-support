import ReactDomServer from "react-dom/server"

import { JSX } from "react"

const jsxToElement = <T extends HTMLElement = HTMLElement>(jsx: JSX.Element) => {
  const wrapper = document.createElement("DIV")
  wrapper.innerHTML = ReactDomServer.renderToStaticMarkup(jsx)
  return wrapper.firstChild as T
}

export const JsxUtil = {
  jsxToElement
}
