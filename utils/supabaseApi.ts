import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Question, Answer } from '@prisma/client';

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function fetchQuestionsByQuizId(quizId: number): Promise<Question[] | null> {
    try {
        const response = await supabase
            .from('Question')
            .select('*, Answer(answer, correct)')
            .eq('quiz_id', quizId)
            .order('question_id', { ascending: true });

        if (response.error) {
            throw response.error;
        }

        const questions: Question[] = response.data.map((questionData: any) => {
            const answers: Answer[] = questionData.Answer;
            return {
                question_id: questionData.question_id,
                quiz_id: questionData.quiz_id,
                text: questionData.text,
                content: questionData.content,
                Answer: answers,
            };
        });

        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return null;
    }
}
