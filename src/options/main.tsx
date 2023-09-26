import { Provider } from "jotai"
import { createRoot } from "react-dom/client"
import { ConfigApp } from "./ConfigApp"
import React from "react"

let initialized = false
const start = () => {
  if (!initialized) {
    initialized = true
    const rootElem = document.getElementById("main-root")
    if (rootElem) {
      const reactRoot = createRoot(rootElem)
      reactRoot.render(
        <Provider>
          <React.Suspense fallback="">
            <ConfigApp />
          </React.Suspense>
        </Provider>
      )
    } else {
      console.warn("main-root not found on options.html")
    }
  }
}

start()
