"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';

export default function AuthPage() {
    const supabase = createClientComponentClient();

    return (
        <div id="AuthPage" className="app">
            <div className="mt-40 px-5">
                <h2 className="text-center text-3xl font-bold mb-5 text-gray-800">
                    Logowanie / Rejestracja
                </h2>
            </div>

            <div className="max-w-[400px] mx-auto px-2">
                <Auth
                    onlyThirdPartyProviders
                    redirectTo={`${window.location.origin}/auth/callback`}
                    supabaseClient={supabase}
                    providers={['google']}
                    appearance={{ theme: ThemeSupa }}
                />
            </div>

            <div className="bottom-image">
                <img src="/unia.jpg" alt="Logo" className="rounded-image"/>
            </div>
        </div>
    )
}

