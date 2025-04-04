
import { advancedQuestions } from "@/app/api/quiz/question/advanced-questions";
import { basicQuestions } from "@/app/api/quiz/question/basic-questions";
import { expertQuestions } from "@/app/api/quiz/question/expert-questions";
import { intermediateQuestions } from "@/app/api/quiz/question/intermediate-questions";
import { superQuestions } from "@/app/api/quiz/question/super-questions";
import { QuizQuestion } from "./types";

export interface QuizQuestions {
    [key: string]: QuizQuestion[];
}

export const quizQuestions: QuizQuestions = {
    basic: basicQuestions,
    intermediate: intermediateQuestions,
    advanced: advancedQuestions,
    expert: expertQuestions,
    super: superQuestions
};
