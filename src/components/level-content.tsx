'use client'

import type { Section } from "@/lib/types"
import { SectionCard } from "./section-card"

interface LevelContentProps {
  content:any 
}

export function LevelContent({ content }: LevelContentProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="text-xl text-muted-foreground">{content.description}</p>
      </div>

      <div className="grid gap-6">
        {content.sections.map((section: Section) => (
          <SectionCard 
            key={section.id}
            section={section}
          />
        ))}
      </div>
    </div>
  )
} 