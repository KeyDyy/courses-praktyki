import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function insertUserStats(
    user_id: string | null | undefined,
    quiz_id: number,
    points: number
  ): Promise<void> {
    try {
      const currentDate = new Date().toISOString();
  
      const { data, error } = await supabase
        .from("QuizResult")
        .insert([
          {
            user_id: user_id,
            quiz_id: quiz_id,
            points: points.toString(), // Convert points to string
            date_attempt: currentDate,
          },
        ]).select();
  
      if (error) {
        console.error(
          "Błąd podczas zapisywania wyników użytkownika:",
          error.message
        );
      } else {
        console.log("Wyniki zapisane pomyślnie!");
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania wyników użytkownika:", error);
    }
  }
