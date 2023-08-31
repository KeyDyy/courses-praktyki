import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchFeed() {
    try {
        const { data: feed, error } = await supabase
            .from("Post")
            .select("*")
            .order("date_created", { ascending: false });

        if (error) {
            console.error("Error fetching feed:", error);
            return [];
        }

        return feed || [];
    } catch (error) {
        console.error("Error fetching feed:", error);
        return [];
    }
}
