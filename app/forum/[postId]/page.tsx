'use client'
import { useUser } from '@/app/context/user';
import PostDetail from '@/components/PostDetail';
import Link from 'next/link';
export default function SomeOtherComponent() {
    const { user } = useUser();

    if (!user) {
        // If user is not logged in, redirect to the login page

        return <div>
            <Link href="/auth">
                <p>Please log in to access this page.</p>;
            </Link>

        </div >
    }

    return (
        <div>

            <PostDetail />

        </div>
    );
}
