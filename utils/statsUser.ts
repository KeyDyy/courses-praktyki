import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface QuizResultData {
  points: number;
}

interface QuizData {
  quiz_id: number;
  QuizResult: QuizResultData | null;
}

interface ModuleData {
  module_id: number;
  name: string;
  Quiz: QuizData[];
}

export async function userStats(user_id: string): Promise<
  Array<{
    module_id: number;
    module_name: string;
    quizResult_points: number | null;
    totalPossiblePoints: number;
    attemptDate: string;
    bestResult: number | null;
  }>
> {
  try {
    const { data: moduleQuizData, error: moduleQuizError } =
      await supabase.from("Module").select(`
        module_id,
        name,
        Quiz (
          quiz_id,
          QuizResult (
            points,
            date_attempt
          ),
          Question(
            question_id
          )
        )
      `);

    if (moduleQuizError) {
      console.error("Błąd podczas pobierania danych:", moduleQuizError.message);
      throw moduleQuizError;
    }

    const results = moduleQuizData.reduce(
      (acc, module) => {
        const module_id: number = module.module_id;
        const module_name: string = module.name;

        const quizResults = module.Quiz.map((quiz) => {
          const quiz_id: number = quiz.quiz_id;
          const quizResult_points: number | null =
            quiz.QuizResult?.[0]?.points || null;

          const bestResult: number | null =
            quiz.QuizResult && quiz.QuizResult.length > 0
              ? Math.max(...quiz.QuizResult.map((result) => result.points))
              : null;

          const totalPossiblePoints: number = quiz.Question.length;
          const attemptDate: string = quiz.QuizResult?.[0]?.date_attempt
            ? new Date(quiz.QuizResult[0]?.date_attempt).toLocaleString(
                "pl-PL",
                {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "N/A";

          return {
            module_id,
            module_name,
            quiz_id,
            quizResult_points,
            totalPossiblePoints,
            attemptDate,
            bestResult,
          };
        });

        acc.push(...quizResults);

        return acc;
      },
      [] as Array<{
        module_id: number;
        module_name: string;
        quiz_id: number;
        quizResult_points: number | null;
        totalPossiblePoints: number;
        attemptDate: string;
        bestResult: number | null;
      }>
    );

    return results;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    return [];
  }
}
