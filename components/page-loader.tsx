"use client"

import { useState } from "react"
import { Loader } from "./loader"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  if (!isLoading) return null

  return <Loader onComplete={() => setIsLoading(false)} />
}
