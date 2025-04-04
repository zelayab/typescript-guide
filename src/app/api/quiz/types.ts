export interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{
    text: string;
    example: string;
    explanation: string;
  }>;
  correctAnswer: number;
  explanation: string;
  difficulty: "basic" | "intermediate" | "advanced" | "expert" | "super";
}

export type QuizQuestions = Record<string, QuizQuestion[]>; 