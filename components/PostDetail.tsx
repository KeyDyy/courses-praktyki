'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { usePathname } from 'next/navigation';
import Layout from '@/components/layout';
import { CommentForm } from './CommentForm';
import { useUser } from '@/app/context/user';
import './PostDetail.css';
import { VoteType } from '@prisma/client';
import VoteButton from '@/components/fetchForum'


type ItemType = 'post' | 'comment';

interface Comment {
    comment_id: number;
    text: string;
    user_id: string;
    date_posted: string;
    votes?: Vote[];
}

interface Vote {
    vote_id: number;
    type: VoteType;
    post_id?: number | null;
    comment_id?: number | null;
    user_id: string;
}


interface Post {
    post_id: number;
    title: string;
    text: string;
    content?: JSON;
    user_id: string; // User ID
    date_created: string; // Date
    comments?: Comment[];
    votes?: Vote[];
}

interface User {
    user_id: string;
    email: string;
    username?: string;
    Comment: Comment[];
    Post: Post[];
    votes?: Vote[];
}


export default function PostDetail() {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [postUser, setPostUser] = useState<User | null>(null);
    const [commentUsers, setCommentUsers] = useState<{ [key: string]: User }>({});
    const { user } = useUser();
    const pathname = usePathname();
    const postIdString = pathname.split("/").pop();
    const postId = postIdString ? parseInt(postIdString, 10) : undefined;
    const [userVotes, setUserVotes] = useState<{ [key: string]: VoteType }>({});
    const [additionalContent, setAdditionalContent] = useState<string | null>(null);

    async function fetchComments() {
        try {
            const { data, error } = await supabase
                .from('Comment')
                .select('*')
                .eq('post_id', postId);

            if (data) {
                setComments(data);
                const commentUserIds = Array.from(new Set(data.map(comment => comment.user_id)));
                fetchCommentUsers(commentUserIds);
            } else if (error) {
                // Handle error, e.g., console.error('Error fetching comments:', error);
            }
        } catch (error) {
            console.error('An error occurred while fetching comments:', error);
        }
    }


    async function fetchPostUser(userId: string) {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (data) {
            setPostUser(data);
        } else if (error) {
            console.error("Error fetching user:", error);
        }
    }

    async function fetchCommentUsers(userIds: string[]) {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .in('user_id', userIds);

        if (data) {
            const usersMap: { [key: string]: User } = {};
            data.forEach(user => {
                usersMap[user.user_id] = user;
            });
            setCommentUsers(usersMap);
        } else if (error) {
            console.error("Error fetching comment users:", error);
        }
    }


    useEffect(() => {
        async function fetchData() {
            if (postId && user) {
                try {
                    const [postData, commentsData] = await Promise.all([
                        supabase.from('Post').select('*').eq('post_id', postId).single(),
                        supabase.from('Comment').select('*').eq('post_id', postId)
                    ]);

                    if (postData.data) {
                        setPost(postData.data);
                        fetchPostUser(postData.data.user_id);

                    }

                    // Ustawienie dodatkowej zawartości


                    if (commentsData.data) {
                        setComments(commentsData.data);
                        const commentUserIds = Array.from(new Set(commentsData.data.map(comment => comment.user_id)));
                        fetchCommentUsers(commentUserIds);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }

        fetchData();
    }, [postId, user]);

    useEffect(() => {
        if (user) {
            fetchUserVotes();
        }
    }, [user]);

    async function fetchUserVotes() {
        if (!user) {
            return;
        }

        try {
            const { data, error } = await supabase
                .from('Vote')
                .select('*')
                .eq('user_id', user.id);

            if (data) {
                const votesMap: { [key: string]: VoteType } = {};
                data.forEach((vote: Vote) => {
                    votesMap[vote.post_id ? vote.post_id.toString() : vote.comment_id!.toString()] = vote.type;
                });
                setUserVotes(votesMap);
                console.log('Fetched user votes:', votesMap);
            } else if (error) {
                console.error("Error fetching user votes:", error);
            }
        } catch (error) {
            console.error("Error fetching user votes:", error);
        }
    }

    async function fetchVotes(itemId: number, itemType?: ItemType) {
        try {
            const { data, error } = await supabase
                .from('Vote')
                .select('*')
                .eq(itemType === 'comment' ? 'comment_id' : 'post_id', itemId);

            if (data) {
                console.log('Fetched votes:', data);
                return data;
            } else if (error) {
                console.error("Error fetching votes:", error);
            }
        } catch (error) {
            console.error("Error fetching votes:", error);
        }
        return null;
    }

    const handleVote = async (type: VoteType, itemId: number, itemType: ItemType) => {
        const existingVote = userVotes[itemId.toString()];

        if (!user) return;

        const oppositeVote = type === 'UP' ? 'DOWN' : 'UP';

        if (existingVote === type) {
            // Deleting the vote (both UP and DOWN)
            await supabase
                .from('Vote')
                .delete()
                .eq(itemType === 'post' ? 'post_id' : 'comment_id', itemId)
                .eq('user_id', user.id);

            const updatedUserVotes = { ...userVotes };
            delete updatedUserVotes[itemId.toString()];
            setUserVotes(updatedUserVotes);
        } else {
            // Clearing opposite vote
            if (userVotes[itemId.toString()] === oppositeVote) {
                await supabase
                    .from('Vote')
                    .delete()
                    .eq(itemType === 'post' ? 'post_id' : 'comment_id', itemId)
                    .eq('user_id', user.id);

                const updatedUserVotes = { ...userVotes };
                delete updatedUserVotes[itemId.toString()];
                setUserVotes(updatedUserVotes);
            }

            // Adding or updating a vote
            const { error } = await supabase
                .from('Vote')
                .upsert([
                    {
                        type,
                        user_id: user.id,
                        [itemType === 'post' ? 'post_id' : 'comment_id']: itemId,
                    },
                ]);

            if (!error) {
                const updatedVotes = await fetchVotes(itemId, itemType);
                if (updatedVotes) {
                    const updatedUserVotes = { ...userVotes };
                    updatedVotes.forEach((vote: Vote) => {
                        updatedUserVotes[vote.post_id ? vote.post_id.toString() : vote.comment_id!.toString()] = vote.type;
                    });
                    setUserVotes(updatedUserVotes);
                }
            }
        }
    };


    return (
        <Layout>
            <div className="p-8">
                {post ? (
                    <>


                        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
                        <p className="text-lg mb-4">{post.text}</p>
                        {additionalContent && (
                            <div className="additional-content">
                                {additionalContent}
                            </div>
                        )}
                        {postUser ? (
                            <p>Posted by: {postUser.username || postUser.email} | Date: {post.date_created.substring(0, 10)}</p>
                        ) : (
                            <p>Loading post author...</p>
                        )}
                        <div className="vote-buttons">
                            <VoteButton
                                type="UP"
                                itemId={post.post_id}
                                itemType="post"
                                userVotes={userVotes}
                                handleVote={handleVote}
                            />
                            <VoteButton
                                type="DOWN"
                                itemId={post.post_id}
                                itemType="post"
                                userVotes={userVotes}
                                handleVote={handleVote}
                            />
                        </div>
                        {comments && comments.length > 0 ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                                <ul>
                                    {comments.map(comment => (
                                        <li key={comment.comment_id}>
                                            <div className="vote-buttons">
                                                <VoteButton
                                                    type="UP"
                                                    itemId={comment.comment_id}
                                                    itemType="comment"
                                                    userVotes={userVotes}
                                                    handleVote={handleVote}
                                                />
                                                <VoteButton
                                                    type="DOWN"
                                                    itemId={comment.comment_id}
                                                    itemType="comment"
                                                    userVotes={userVotes}
                                                    handleVote={handleVote}
                                                />
                                            </div>
                                            {commentUsers[comment.user_id] ? (
                                                <p>Comment by: {commentUsers[comment.user_id].username || commentUsers[comment.user_id].email} | Date: {comment.date_posted.substring(0, 10)}</p>
                                            ) : (
                                                <p>Loading comment author...</p>
                                            )}
                                            <p>{comment.text}</p>
                                        </li>
                                    ))}
                                </ul>
                                {post && <CommentForm postId={post.post_id} onCommentAdded={fetchComments} />}
                            </div>
                        ) : (
                            <div>
                                <p>No comments yet.</p>
                                {post && <CommentForm postId={post.post_id} onCommentAdded={fetchComments} />}
                            </div>
                        )}
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </Layout>
    );

}