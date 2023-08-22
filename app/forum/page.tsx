'use client'
import React from "react";
import type { GetStaticProps } from "next";
import Layout from "@/components/layout";
import PostComponent, { PostProps } from "@/components/Post";
import supabase from "@/utils/supabaseClient"; // Update the import path
import { useUser } from '@/app/context/user';

export const getStaticProps: GetStaticProps = async () => {
    const { data: feed, error } = await supabase
        .from('Post')
        .select('*')
        .order('date_created', { ascending: false });

    if (error) {
        console.error('Error fetching feed:', error);
        return {
            notFound: true,
        };
    }

    return {
        props: { feed },
        revalidate: 10,
    };
};

type Props = {
    feed: PostProps[];
};

const Forum: React.FC<Props> = (props) => {
    const { user } = useUser();

    return (
        <Layout>
            <div className="page">
                <h1>Public Feed</h1>
                <main>
                    {props.feed.map((post) => (
                        <div key={post.post_id} className="post">
                            <PostComponent post={post} />
                        </div>
                    ))}
                </main>
            </div>
            <style jsx>{`
                .post {
                    background: white;
                    transition: box-shadow 0.1s ease-in;
                }

                .post:hover {
                    box-shadow: 1px 1px 3px #aaa;
                }

                .post + .post {
                    margin-top: 2rem;
                }
            `}</style>
        </Layout>
    );
};

export default Forum;
