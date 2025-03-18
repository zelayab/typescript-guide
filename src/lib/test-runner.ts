interface TestResult {
  name: string
  passed: boolean
  message?: string
}

export async function runTests(
  exerciseId: string, 
  code: string
): Promise<TestResult[]> {
  // Aquí implementarías la lógica real de ejecución de tests
  // Por ahora retornamos datos de ejemplo
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          name: "Test básico",
          passed: true
        },
        {
          name: "Test de casos límite",
          passed: code.includes("if"),
          message: "Debes manejar casos límite"
        }
      ])
    }, 1000)
  })
} 