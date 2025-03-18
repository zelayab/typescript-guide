import { LevelContent } from "./types"

const contentMap: Record<string, LevelContent> = {
  basics: {
    title: "TypeScript Básico 🎈",
    description: "Fundamentos y conceptos básicos de TypeScript",
    prerequisites: [],
    sections: [
      {
        id: "tipos-primitivos",
        title: "Tipos Primitivos",
        description: "Los tipos básicos en TypeScript...",
        examples: [
          {
            code: `// Tipos básicos
const nombre: string = 'TypeScript';
const version: number = 4.5;
const esEstable: boolean = true;`,
            fileName: "tipos-basicos.ts"
          }
        ],
        exercises: [
          {
            title: "Validación de Tipos",
            description: "Implementa una función que valide diferentes tipos de datos",
            initialCode: `function validarDato(dato: unknown): string {
  // Tu código aquí
}`,
            solution: `function validarDato(dato: unknown): string {
  if (typeof dato === "string") return "
}

export function getContentForSection(section: string): LevelContent | null {
  return contentMap[section] || null
} 