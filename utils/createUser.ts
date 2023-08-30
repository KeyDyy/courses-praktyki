// createUser.ts
import { Language, lessFortunate } from '@prisma/client';
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
    lessFortunate: lessFortunate | null;
    // Dodaj pozostałe pola modelu User
}


export async function checkUserExistence(userId: string): Promise<User | null> {
    console.error('Checking user existence...');
    try {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error checking user existence:', error);
            throw error;
        }

        if (data && data.length > 0) {
            return data[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        return null;
    }
}
export async function createUser(id: string, firstName: string, lastName: string | null, email: string,): Promise<boolean> {
    console.error('Creating user ...');
    try {
        const { data: newUser, error } = await supabase
            .from('User')
            .insert([
                {
                    user_id: id,
                    first_name: firstName,
                    last_name: lastName || '',
                    email: email,
                },
            ]);

        if (error) {
            console.error('Error creating user:', error);
            throw error;
        }

        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
}