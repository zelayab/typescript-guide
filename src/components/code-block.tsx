'use client'

import { Copy } from 'lucide-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from './ui/button'

interface CodeBlockProps {
  code: string
  language: string
  fileName?: string
}

export function CodeBlock({ code, language, fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      {fileName && (
        <div className="bg-muted px-4 py-2 text-sm font-mono border-b">
          {fileName}
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 opacity-50 hover:opacity-100"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copiar código</span>
        </Button>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: fileName ? '0 0 8px 8px' : '8px',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {copied && (
        <div className="absolute right-2 top-2 rounded-md bg-green-500 px-2 py-1 text-xs text-white">
          ¡Copiado!
        </div>
      )}
    </div>
  )
} 