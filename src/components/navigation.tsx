import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TypeScript Guide
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/basics">Básicos</Link>
          <Link href="/intermediate">Intermedio</Link>
          <Link href="/advanced">Avanzado</Link>
          <Link href="/expert">Experto</Link>
          <Link href="/exercises">Ejercicios</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
} 