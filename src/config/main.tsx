import { JsxUtil } from "../util/JsxUtil"
import { Provider } from "jotai"
import { createRoot } from "react-dom/client"
import { ConfigApp } from "./ConfigApp"
import React from "react"

const start = () => {
  if (!document.querySelector(".config-root")) {
    const rootElem = JsxUtil.jsxToElement(<div className="config-root" />)
    document.body.append(rootElem)
    const reactRoot = createRoot(rootElem)
    reactRoot.render(
      <Provider>
        <React.Suspense fallback="">
          <ConfigApp />
        </React.Suspense>
      </Provider>
    )
  }
}

start()
