'use client'
// UserProfilePage.tsx

import { useUser } from "@/app/context/user"; // Adjust the import path
import Link from "next/link";
import Image from "next/image";
import LanguageSelector from "@/components/LanguageSelector"; // Import your language selector component

export default function UserProfilePage() {
    // ...other code

    const handleLanguageChange = (language: string) => {
        // Implement logic to update the language in your app
        console.log(`Language changed to: ${language}`);
    };

    const { user, signOut } = useUser();

    return (
        <div className="container mx-auto p-4">
            <header className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">User Profile</h1>
                <Link href="/">
                    <p className="text-blue-500 hover:underline">Home</p>
                </Link>
            </header>

            {user ? (
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16">
                        <Image
                            src={user.image || ""}
                            alt={`${user.first_name} ${user.last_name}`}
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">
                            {user.first_name} {user.last_name}
                        </p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}

            <div className="mt-4">
                <LanguageSelector onSelectLanguage={handleLanguageChange} />
            </div>

            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={signOut}
            >
                Sign Out
            </button>
        </div>
    );
}
