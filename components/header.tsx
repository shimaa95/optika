import Link from "next/link"
import { cn } from "@/lib/utils"

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("bg-black text-white", className)}>
      <div className="flex items-center justify-between px-8 py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Optika
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/about" className="text-sm transition-opacity hover:opacity-70">
            About
          </Link>
          <Link href="/products" className="text-sm transition-opacity hover:opacity-70">
            Products
          </Link>
          <Link href="/showreel" className="text-sm transition-opacity hover:opacity-70">
            ShowReel
          </Link>
          <Link href="/try-on" className="text-sm transition-opacity hover:opacity-70">
            Try-On
          </Link>
        </nav>

        <Link href="https://rx.optikalenses.com/auth" className="text-sm transition-opacity hover:opacity-70">
          / For Partners
        </Link>
      </div>
    </header>
  )
}
