// pages/index.tsx
'use client'
// pages/index.tsx
import { useUser } from '@/app/context/user'; // Adjust the import path
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import PostCard from '@/components/Postcard';
import Layout from '@/components/layout';

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]); // Provide the correct type for posts
    const { user } = useUser();

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('Post')
                .select();
            if (data) {
                setPosts(data);
            }
            // Handle error
        }
        fetchPosts();
    }, []);

    return (
        <Layout>
            <div className="p-8">
                {!user && <p>Please log in to see the posts.</p>}
                {user &&
                    posts.map((post) => (
                        <PostCard key={post.post_id} post={post} />
                    ))}
            </div>
        </Layout>
    );
}
