import { crx, defineManifest } from "@crxjs/vite-plugin"
import { defineConfig } from "vite"

const manifest = defineManifest({
  manifest_version: 3,
  name: "どこでもタイーツ",
  version: "1.0.1",
  description: "任意のウェブサイトから簡単にタイーツできます。",
  background: {
    service_worker: "src/background/worker.ts"
  },
  permissions: ["tabs", "scripting"],
  icons: {
    "48": "icon48.png",
    "128": "icon128.png"
  },
  content_scripts: [
    {
      matches: ["https://taittsuu.com/home"],
      js: ["src/content/taittsuu.ts"],
      run_at: "document_end"
    }
  ],
  action: {
    default_title: "タイーツする"
  }
})

export default defineConfig({
  plugins: [crx({ manifest })]
})
