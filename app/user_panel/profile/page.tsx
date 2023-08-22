'use client'
import React from "react";
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation"; // Import the router
import Navbar from "@/components/Navbar";

const ProfilePage = () => {
    const { user, signOut } = useUser();
    const router = useRouter(); // Use the router here

    if (!user) {
        return <div>Please sign in</div>;
    }

    return (
        <div className="app">
            <Navbar />
            <div>
                <h1>Welcome, {user.email}</h1>
                {/* Other content */}
                <button onClick={async () => {
                    await signOut();
                    router.push('/');
                }}>
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
