import Link from "next/link"

export function Header() {
  return (
    <header className="bg-black text-white">
      <div className="flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Optika
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link href="/about" className="text-sm hover:opacity-70 transition-opacity">
            About
          </Link>
          <Link href="/products" className="text-sm hover:opacity-70 transition-opacity">
            Products
          </Link>
          <Link href="/showreel" className="text-sm hover:opacity-70 transition-opacity">
            ShowReel
          </Link>
          <Link href="/try-on" className="text-sm hover:opacity-70 transition-opacity">
            Try-On
          </Link>
        </nav>

        {/* Partners Link */}
        <Link href="/partners" className="text-sm hover:opacity-70 transition-opacity">
          / For Partners
        </Link>
      </div>
    </header>
  )
}
