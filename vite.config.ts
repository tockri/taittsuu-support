import { crx, defineManifest } from "@crxjs/vite-plugin"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

const manifest = defineManifest({
  manifest_version: 3,
  name: "どこでもタイーツ",
  version: "1.2.0",
  description: "任意のウェブサイトから簡単にタイーツできます。",
  background: {
    service_worker: "src/background/worker.ts"
  },
  permissions: ["tabs", "scripting", "storage"],
  icons: {
    "48": "icon48.png",
    "128": "icon128.png"
  },
  content_scripts: [
    {
      matches: ["https://taittsuu.com/*"],
      js: ["src/content/taittsuu.ts"],
      run_at: "document_end"
    },
    {
      matches: ["https://twitter.com/intent/tweet?*"],
      js: ["src/content/twitter-intent.ts"],
      run_at: "document_start"
    }
  ],
  action: {
    default_title: "タイーツする"
  },
  options_page: "src/config/config.html"
})

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  test: {
    globals: true
  }
})
