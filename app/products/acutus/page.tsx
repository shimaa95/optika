import type { Metadata } from "next"
import AcutusClient from "./AcutusClient"

export const metadata: Metadata = {
  title: "ACUTUS | Optika",
  description:
    "Our exclusive range of premium lenses. Premium lenses solutions across three professional lines, built to the highest standards.",
}

export default function AcutusPage() {
  return <AcutusClient />
}
