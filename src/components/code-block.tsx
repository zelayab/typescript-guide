import { Copy } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
  fileName?: string
}

export function CodeBlock({ code, language, fileName }: CodeBlockProps) {
  return (
    <div className="relative mt-4 rounded-lg border bg-muted">
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <span className="text-sm text-muted-foreground">{fileName}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
      <pre className={cn(
        "p-4 overflow-x-auto",
        fileName ? "" : "rounded-t-lg"
      )}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
} 