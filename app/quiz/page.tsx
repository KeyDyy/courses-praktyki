import React from 'react';
import Link from 'next/link';
import QuestionPage from './[quizId]//QuestionPage'; // Import the QuestionPage component

const QuizListPage = () => {
    const quizzes = [
        { id: 1, title: 'Quiz 1' },
        { id: 2, title: 'Quiz 2' },
        // Add other quizzes here
    ];

    return (
        <div>
            <h1>Available Quizzes</h1>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                        <Link href={`/quiz/${quiz.id}`} passHref>
                            <p>Start {quiz.title}</p>
                        </Link>
                        {/* Pass the quizId as a prop to QuestionPage */}

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizListPage;
