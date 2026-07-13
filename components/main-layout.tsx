import { Footer } from "@/components/footer"
import { Navigation } from "./navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
<div className="flex flex-col gap-32"> {children}    </div>
  )
}
