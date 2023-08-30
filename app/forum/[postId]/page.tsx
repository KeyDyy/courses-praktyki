// SomeOtherComponent.tsx
'use client'
import { useUser } from '@/app/context/user'; // Adjust the import path
import PostDetail from '@/components/PostDetail';

export default function SomeOtherComponent() {
    const { user } = useUser();

    if (!user) {
        // If user is not logged in, redirect to the login page
        // You can use Next.js router for this purpose
        // For example: router.push('/login');
        return <p>Please log in to access this page.</p>;
    }

    return (
        <div>
            {/* ... other content ... */}
            <PostDetail />
            {/* ... other content ... */}
        </div>
    );
}
