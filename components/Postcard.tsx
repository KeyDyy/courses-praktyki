import React from 'react';
import Link from 'next/link';

import VoteCount from './fetchForum';
import { VoteType } from '@prisma/client';
import './PostDetail.css'

type ItemType = 'post' | 'comment';
interface Post {
    post_id: number;
    title: string;
    text: string;

}

interface PostCardProps {
    post: Post;
    handleVote: (type: VoteType, itemId: number, itemType: ItemType) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, handleVote }) => {
    const { post_id, title, text } = post;
    const userVotes: Record<string, VoteType> = {};

    return (
        <div className="border p-4 mb-4 post-card">
            <Link href={`/forum/${post.post_id}`}>
                <p className="text-xl font-semibold">{post.title}</p>
                <p>{post.text}</p>
            </Link>

            <div className="vote-counts">
                <VoteCount type="UP" itemId={post_id} itemType="post" userVotes={userVotes} handleVote={handleVote} />
                <VoteCount type="DOWN" itemId={post_id} itemType="post" userVotes={userVotes} handleVote={handleVote} />
            </div>

        </div>
    );
};

export default PostCard;
