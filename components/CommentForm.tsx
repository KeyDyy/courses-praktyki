import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useUser } from '@/app/context/user';
import styles from './CommentForm.module.css';

interface CommentFormProps {
    postId: number;
    onCommentAdded: () => void;
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
    const { user } = useUser();
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            const newComment = {
                text: commentText,
                user_id: user.id,
                post_id: postId,
            };

            const { error } = await supabase.from('Comment').upsert([newComment]);
            if (!error) {
                setCommentText('');
                onCommentAdded();
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
                className={styles.textarea}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
            />
            <button className={styles.button} type="submit">Add Comment</button>
        </form>
    );
}
