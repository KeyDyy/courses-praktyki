import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
    post_id: number; // Update id to post_id
    title: string;
    User: {
        name: string; // Update author to User.name
        email: string; // You can also add User.email if needed
    } | null;
    content: string; // Update content to text
    published: boolean; // Add published field if needed
};

const PostComponent: React.FC<{ post: PostProps }> = ({ post }) => {
    const authorName = post.User ? post.User.name : "Unknown author"; // Update post.author to post.User
    return (
        <div onClick={() => Router.push("/post/[id]", `/post/${post.post_id}`)}>
            <h2>{post.title}</h2>
            <small>By {authorName}</small>
            <ReactMarkdown children={post.content} />
            <style jsx>{`
                div {
                    color: inherit;
                    padding: 2rem;
                }
            `}</style>
        </div>
    );
};

export default PostComponent;
