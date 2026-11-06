import { mkdirSync } from "node:fs"

const folders = [
  "src/assets",
  "src/components/ui",
  "src/hooks",
  "src/layouts",
  "src/pages",
  "src/services",
  "src/store",
  "src/types",
  "src/utils"
]

for (const folder of folders) {
  mkdirSync(folder, { recursive: true })
}
