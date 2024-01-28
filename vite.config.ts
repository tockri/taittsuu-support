import { crx, defineManifest } from "@crxjs/vite-plugin"
import { PluginOption, defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const manifest = defineManifest({
  manifest_version: 3,
  name: "どこでもタイーツ",
  version: "1.8.7",
  description:
    "任意のウェブサイトから簡単にタイーツでき、タイッツーのUIのかゆいところに手が届くカスタマイズを加えます。",
  background: {
    service_worker: "src/background/worker.ts"
  },
  permissions: ["tabs", "storage"],
  icons: {
    "48": "icon48.png",
    "128": "icon128.png"
  },
  content_scripts: [
    {
      matches: ["https://taittsuu.com/*"],
      js: ["src/content/taittsuu.ts"],
      css: ["css/taittsuu.css"],
      run_at: "document_end"
    },
    {
      matches: ["https://twitter.com/intent/tweet?*", "https://twitter.com/share?*", "https://x.com/intent/tweet?*", "https://x.com/share?*"],
      js: ["src/content/twitter-intent.ts"],
      run_at: "document_start"
    }
  ],
  action: {
    default_title: "タイーツする"
  },
  options_page: "src/options/options.html"
})

export default defineConfig({
  plugins: [react() as PluginOption, crx({ manifest })]
})
