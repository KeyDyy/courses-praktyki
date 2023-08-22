'use client'
import React from "react";
import Link from "next/link";
import { useUser } from "@/app/context/user";

const Navbar: React.FC = () => {
    const { user, logout } = useUser(); // Add logout function to the hook

    return (
        <nav>
            <ul>
                {user ? (
                    <li>
                        <p>Witaj{user.email ? `, ${user.email}` : ''}!</p>
                        <button onClick={logout}>Wyloguj się</button> {/* Use the logout function */}
                    </li>
                ) : (
                    <li>
                        <Link href="/auth">
                            <p>Zaloguj się</p>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
