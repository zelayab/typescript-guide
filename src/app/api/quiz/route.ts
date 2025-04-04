import { NextResponse } from "next/server";
import { quizQuestions } from "./questions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get("difficulty") as keyof typeof quizQuestions;
  
  if (!difficulty || !quizQuestions[difficulty]) {
    return NextResponse.json({ error: "Dificultad no válida" }, { status: 400 });
  }

  const questions = quizQuestions[difficulty];
  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];

  return NextResponse.json(question);
} 