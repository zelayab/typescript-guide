import { CodeBlock } from "./code-block"
import { SectionCard } from "./section-card"
import type { LevelContent } from "@/lib/types"

interface LevelContentProps {
  content: LevelContent
}

export function LevelContent({ content }: LevelContentProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="text-xl text-muted-foreground">{content.description}</p>
      </div>

      <div className="grid gap-6">
        {content.sections.map((section) => (
          <SectionCard 
            key={section.id}
            section={section}
          />
        ))}
      </div>
    </div>
  )
} 