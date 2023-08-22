'use client'
import { FC } from 'react';
import { useUser } from '@/app/context/user';
import Layout from '@/components/layout'; // Załóżmy, że masz komponent Layout

const Forum: FC = () => {
    const { user } = useUser();

    if (!user) {
        // Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania
        // W rzeczywistym projekcie warto również przekazać informację o stronie, którą chcieli wejść po zalogowaniu
        return <p>Musisz być zalogowany, aby mieć dostęp do forum. Przekierowuję na stronę logowania...</p>;
    }

    return (
        <Layout>
            <div>
                {/* Tutaj umieść zawartość swojego forum */}
                <h1>Forum</h1>
                <p>Witaj na naszym forum, {user.email}!</p>
                {/* ... */}
            </div>
        </Layout>
    );
};

export default Forum;
