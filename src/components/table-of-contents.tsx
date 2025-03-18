import { cn } from "@/lib/utils"
import Link from "next/link"

interface TableOfContentsProps {
  items: {
    id: string
    title: string
    level: number
  }[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="sticky top-8">
      <h3 className="text-lg font-semibold mb-4">Contenido</h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block py-1 text-muted-foreground hover:text-foreground transition-colors",
              item.level === 1 ? "pl-0" : `pl-${item.level * 4}`
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
} 