import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/utils/supabase';
import { useUser } from '@/app/context/user';
import styles from './AddPostForm.module.css'; // Import the CSS file
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

interface AddPostFormProps {
    onPostAdded: () => void;
}

export function AddPostForm({ onPostAdded }: AddPostFormProps) {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useUser();

    const onSubmit = async (data: any) => {
        if (user) {
            const newPost = {
                user_id: user.id,
                title: data.title,
                text: data.text,
                forumtopic_id: 1,
                content: data.content || null, // Optional JSON content
                date_created: new Date().toISOString(), // Current date and time
            };

            const { error } = await supabase.from('Post').upsert([newPost]);
            if (!error) {
                reset();
                onPostAdded();
                toast.success('Post added successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000, // Auto-close the toast after 3 seconds
                });
            } else {
                toast.error('Failed to add post', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
                className={styles.input}
                {...register('title', { required: true })}
                placeholder="Title"
            />
            <textarea
                className={styles.textarea}
                {...register('text', { required: true })}
                placeholder="Text"
            />
            <textarea
                className={styles.textarea}
                {...register('content')}
                placeholder="JSON Content (optional)"
            />
            <button className={styles.button} type="submit">Add Post</button>
        </form>
    );
}
