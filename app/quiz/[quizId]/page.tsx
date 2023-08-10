'use client'
import { useEffect, useState } from 'react';
import { fetchQuestionsByQuizId } from '../../../utils/supabaseApi';

interface Answer {
    answer_id: number;
    answer: string;
    correct: boolean;
}

interface Question {
    question_id: number;
    text: string;
    Answer: Answer[];
}

const QuestionPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        async function fetchQuestionsData() {
            const fetchedQuestions = await fetchQuestionsByQuizId(1); // Zmienić na odpowiedni quizId
            setQuestions(fetchedQuestions);
        }

        fetchQuestionsData();
    }, []);

    const handleSelectAnswer = (answerId: number, correct: boolean) => {
        if (selectedAnswerId === null) {
            setSelectedAnswerId(answerId);
            if (correct) {
                setScore(score + 1);
            } else {
                setScore(score - 1);
            }
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions!.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerId(null);
        }
    };

    if (!questions || questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h1>Question</h1>
            <h2>{currentQuestion.text}</h2>
            <ul>
                {currentQuestion.Answer.map((answer) => (
                    <li
                        key={answer.answer_id}
                        onClick={() => handleSelectAnswer(answer.answer_id, answer.correct)}
                        style={{
                            background: selectedAnswerId === answer.answer_id
                                ? (answer.correct ? 'green' : 'red')
                                : 'white',
                        }}
                    >
                        {answer.answer} - {selectedAnswerId === answer.answer_id && answer.correct ? 'Correct' : 'Incorrect'}
                    </li>
                ))}
            </ul>
            <p>Score: {score}</p>
            <button onClick={handleNextQuestion}>Next Question</button>
        </div>
    );
};

export default QuestionPage;
