// createUser.ts
import { Language } from '@prisma/client';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
export interface User {
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    picture: string | null;
    language: Language | null;
    // Dodaj pozostałe pola modelu User
}

export async function editUser(id: string, firstName: string, lastName: string, language: Language | null): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('User')
        .update({
          first_name: firstName,
          last_name: lastName,
          language: language,
        })
        .eq('user_id', id);
  
      if (error) {
        console.error('Error updating user:', error);
        throw error;
      }
  
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }