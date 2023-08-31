// pages/index.tsx
'use client'
import { useUser } from '@/app/context/user';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import PostCard from '@/components/Postcard';
import Layout from '@/components/layout';
import Link from 'next/link';

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const { user } = useUser();

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('Post')
                .select();
            if (data) {
                setPosts(data);
            }
        }
        fetchPosts();
    }, []);



    return (
        <Layout>
            <div className="p-8">
                {!user && <div>
                    <Link href="/auth">
                        <p>Please log in to see the posts.</p>
                    </Link>

                </div >}
                {user &&
                    posts.map((post) => (
                        <PostCard key={post.post_id} post={post} />
                    ))}
            </div>
        </Layout>
    );
}
