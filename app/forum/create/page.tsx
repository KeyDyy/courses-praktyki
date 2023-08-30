// NewPostPage.tsx
'use client'
import React, { useState } from 'react';
import Layout from '@/components/layout';
import { AddPostForm } from '@/components/AddPostForm';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

export default function NewPostPage() {
    const [postsUpdated, setPostsUpdated] = useState(false);

    const handlePostAdded = () => {
        setPostsUpdated(!postsUpdated);
    };

    return (
        <Layout>
            <div className="p-8">
                <h1 className="text-2xl font-semibold mb-4">Add a New Post</h1>
                <AddPostForm onPostAdded={handlePostAdded} />
                <ToastContainer /> {/* Add ToastContainer here */}
            </div>
        </Layout>
    );
}
