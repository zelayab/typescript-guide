'use client'

import type { Section } from "@/lib/types"
import { CodeBlock } from "./code-block"
import { Card } from "./ui/card"

interface SectionCardProps {
  section: Section
}

export function SectionCard({ section }: SectionCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4" id={section.id}>
        {section.title}
      </h2>
      
      <div className="prose dark:prose-invert mb-6">
        {section.description}
      </div>

      {section.examples.map((example, index) => (
        <CodeBlock
          key={index}
          code={example.code}
          language="typescript"
          fileName={example.fileName}
        />
      ))}
    </Card>
  )
} 