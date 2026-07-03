import type { Metadata } from "next"
import { VirtualTryOn } from "@/components/try-on/virtual-try-on"
import { Navigation } from "@/components/navigation"
import "./try-on.css"

export const metadata: Metadata = {
  title: "Virtual Try-On | Optika",
  description:
    "Preview Optika lens colors on our signature frame. Choose your tint and learn more about Acutus lenses.",
}

export default function TryOnPage() {
  return (
    <>

      <VirtualTryOn />

    </>
  )
}
