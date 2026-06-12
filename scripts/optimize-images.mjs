import sharp from "sharp"
import { readdirSync, statSync, renameSync, unlinkSync } from "fs"
import { join, extname } from "path"

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname
const MAX_EDGE = 2048 // px on the longest edge — plenty for any screen
const MIN_BYTES = 400 * 1024 // only touch files larger than ~400KB

sharp.cache(false)
sharp.concurrency(1)

const files = readdirSync(PUBLIC_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f))

let totalBefore = 0
let totalAfter = 0

for (const file of files) {
  const fullPath = join(PUBLIC_DIR, file)
  const beforeSize = statSync(fullPath).size
  if (beforeSize < MIN_BYTES) continue

  const ext = extname(file).toLowerCase()
  const tmpPath = fullPath + ".tmp"

  try {
    const img = sharp(fullPath, { failOn: "none" })
    const meta = await img.metadata()
    const longest = Math.max(meta.width || 0, meta.height || 0)

    let pipeline = sharp(fullPath, { failOn: "none" }).rotate()

    if (longest > MAX_EDGE) {
      pipeline = pipeline.resize({
        width: meta.width >= meta.height ? MAX_EDGE : undefined,
        height: meta.height > meta.width ? MAX_EDGE : undefined,
        withoutEnlargement: true,
      })
    }

    if (ext === ".png") {
      // Keep PNG format (preserves any transparency + same file path/extension)
      pipeline = pipeline.png({ compressionLevel: 9, quality: 80, effort: 8, palette: true })
    } else {
      pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true })
    }

    await pipeline.toFile(tmpPath)

    const afterSize = statSync(tmpPath).size
    if (afterSize < beforeSize) {
      unlinkSync(fullPath)
      renameSync(tmpPath, fullPath)
      totalBefore += beforeSize
      totalAfter += afterSize
      console.log(
        `${file}: ${(beforeSize / 1024 / 1024).toFixed(2)}MB -> ${(afterSize / 1024 / 1024).toFixed(2)}MB`
      )
    } else {
      unlinkSync(tmpPath)
      console.log(`${file}: skipped (no gain)`)
    }
  } catch (err) {
    console.log(`${file}: ERROR ${err.message}`)
    try {
      unlinkSync(tmpPath)
    } catch {}
  }
}

console.log(
  `\nTOTAL: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
)
