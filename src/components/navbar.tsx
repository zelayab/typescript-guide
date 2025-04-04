'use client'

import { Button } from "@/components/ui/button"
import { getLevelContent } from "@/lib/content"
import { Section } from "@/lib/types"
import { ArrowLeft, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const pathname = usePathname()
  const nivel = pathname.split('/')[2] // Obtiene 'basico', 'intermedio', etc.

  useEffect(() => {
    async function loadSections() {
      if (nivel) {
        const levelContent = await getLevelContent(nivel)
        if (levelContent) {
          setSections(levelContent.sections)
        }
      }
    }
    loadSections()
  }, [nivel])

  // Si estamos en la página principal, no mostramos la navbar
  if (pathname === '/') return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-semibold">TypeScript para Profesionales</span>
            {nivel && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-primary capitalize">{nivel}</span>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === section.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {section.title}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-2">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`block py-2 text-sm transition-colors hover:text-primary ${
                  pathname === section.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {section.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
} 