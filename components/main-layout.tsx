import { Footer } from "@/components/footer"
import { Navigation } from "./navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-[#f5f5f5] overflow-x-hidden">
      <main>{children}</main>
      <Footer />
    </div>
  )
}
