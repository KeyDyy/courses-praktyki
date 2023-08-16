import Link from 'next/link';

const QuizListPage = () => {
    const quizzes = [
        { id: 1, title: 'Quiz 1' },
        { id: 2, title: 'Quiz 2' },
        // Dodaj inne quizy tutaj
    ];

    return (
        <div>
            <h1>Available Quizzes</h1>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                        <Link href={`/quiz/${quiz.id}`} passHref>
                            <h5>Start {quiz.title}</h5>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizListPage;
