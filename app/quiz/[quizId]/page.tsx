'use client'
import React from 'react';
import QuestionPage from '@/components/QuestionPage'; // Path to your QuestionPage component
import { usePathname } from 'next/navigation';
import './index.css'


const QuizPage: React.FC = () => {
    const pathname = usePathname();
    const quizIdString = pathname.split("/").pop();
    const quizId = quizIdString ? parseInt(quizIdString, 10) : undefined;

    return (
        <div className="app">
            {/* ... other content ... */}
            {quizId !== undefined ? <QuestionPage quizId={quizId} /> : null}
        </div>
    );
};

export default QuizPage;
