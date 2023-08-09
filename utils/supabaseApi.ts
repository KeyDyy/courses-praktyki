import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Question, Answer } from '@prisma/client';



const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;


const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function fetchQuestions(): Promise<Question[]> {
    const { data, error } = await supabase.from('Question').select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function fetchAnswersByQuestionId(
    questionId: number
): Promise<Answer[]> {
    const { data, error } = await supabase
        .from('Answer')
        .select('*')
        .eq('question_id', questionId);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
