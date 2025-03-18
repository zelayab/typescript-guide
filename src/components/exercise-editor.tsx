'use client'

import { runTests } from "@/lib/test-runner"
import { cn } from "@/lib/utils"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
import { Button } from "./ui/button"

interface TestResult {
  passed: boolean
  message?: string
}

interface ExerciseEditorProps {
  initialCode: string
  language: string
  exerciseId: string
}

export function ExerciseEditor({ 
  initialCode, 
  language, 
  exerciseId 
}: ExerciseEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])

  async function handleRunTests() {
    setIsRunning(true)
    try {
      const testResults = await runTests(exerciseId, code)
      setResults(testResults)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleRunTests}
          disabled={isRunning}
        >
          {isRunning ? 'Ejecutando...' : 'Ejecutar Tests'}
        </Button>

        {results.length > 0 && (
          <span className={cn(
            "text-sm font-medium",
            results.every(r => r.passed) 
              ? "text-green-500" 
              : "text-red-500"
          )}>
            {results.filter(r => r.passed).length} / {results.length} tests pasados
          </span>
        )}
      </div>
    </div>
  )
} 