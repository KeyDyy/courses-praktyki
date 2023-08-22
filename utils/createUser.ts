// createUser.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function checkUserExistence(userId: string): Promise<boolean> {
    console.error('Checking user existence...');
    try {
        const { data: existingUser, error } = await supabase
            .from('User')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error checking user existence:', error);
            throw error;
        }

        return existingUser && existingUser.length > 0;
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false;
    }
}

export async function createUser(id: string, firstName: string, lastName: string | null): Promise<boolean> {
    console.error('Creating user ...');
    try {
        const { data: newUser, error } = await supabase
            .from('User')
            .insert([
                {
                    user_id: id,
                    first_name: firstName,
                    last_name: lastName || '',
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
