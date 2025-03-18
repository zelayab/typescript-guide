interface ExerciseInstructionsProps {
  instructions: string
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
}

export function ExerciseInstructions({
  instructions,
  examples
}: ExerciseInstructionsProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert">
        {instructions}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ejemplos:</h3>
        <div className="space-y-4">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="bg-muted rounded-lg p-4 space-y-2"
            >
              <div>
                <span className="font-medium">Input: </span>
                <code className="text-sm bg-background rounded px-1.5 py-0.5">
                  {example.input}
                </code>
              </div>
              <div>
                <span className="font-medium">Output: </span>
                <code className="text-sm bg-background rounded px-1.5 py-0.5">
                  {example.output}
                </code>
              </div>
              {example.explanation && (
                <div className="text-sm text-muted-foreground">
                  {example.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 