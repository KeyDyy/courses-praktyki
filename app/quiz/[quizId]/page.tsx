'use client'
import React, { useEffect, useState } from 'react';
import { fetchQuestionsByQuizId } from '../../../utils/supabaseApi';
import './index.css';
interface Answer {
    answer_id: number;
    answer: string;
    correct: boolean;
}

interface Question {
    question_id: number;
    text: string;
    content: string; // Zmieniam typ pola 'content' na 'string'
    Answer: Answer[];
}

const QuestionPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);
    const [answered, setAnswered] = useState<boolean>(false);

    useEffect(() => {
        async function fetchQuestionsData() {
            const fetchedQuestions = await fetchQuestionsByQuizId(1);
            setQuestions(fetchedQuestions);
        }

        fetchQuestionsData();
    }, []);

    const handleSelectAnswer = (answerIndex: number, correct: boolean) => {
        if (!answered) {
            setSelectedAnswerIndex(answerIndex);
        }
    };

    const handleConfirmAnswer = () => {
        if (selectedAnswerIndex !== null && !answered) {
            const selectedAnswer = currentQuestion.Answer[selectedAnswerIndex];
            if (selectedAnswer) {
                setScore(score + (selectedAnswer.correct ? 1 : 0));
                setAnswered(true);
            }
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions!.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerIndex(null);
            setAnswered(false);
        }
    };

    if (!questions || questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="center-content font-sans text-center">
            <h1 className="question-title">Question</h1>
            <h2 className="question-subtitle">{currentQuestion.text}</h2>
            {currentQuestion.content && (
                <div className="question-image">
                    {currentQuestion.content.endsWith('.jpg') || currentQuestion.content.endsWith('.png') ? (
                        <img src={currentQuestion.content} alt="Question" className="max-w-full h-auto" />
                    ) : (
                        <iframe
                            width="560"
                            height="315"
                            src={currentQuestion.content}
                            title="Question Video"
                            allowFullScreen
                            className="max-w-full"
                        />
                    )}
                </div>
            )}
            <ul className="answer-list">
                {currentQuestion.Answer.map((answer, index) => (
                    <li
                        key={answer.answer_id}
                        onClick={() => handleSelectAnswer(index, answer.correct)}
                        className={`answer-item ${selectedAnswerIndex === index ? (answer.correct ? 'selected correct' : 'selected incorrect') : ''}`}
                    >
                        <strong>{String.fromCharCode(65 + index)}</strong> - {answer.answer}
                    </li>
                ))}
            </ul>

            <p className="score">Score: {score}</p>
            {!answered ? (
                <button
                    onClick={handleConfirmAnswer}
                    className="button"
                >
                    Confirm Answer
                </button>
            ) : (
                <button
                    onClick={handleNextQuestion}
                    className="button"
                >
                    Next Question
                </button>
            )}
        </div>
    );
}

export default QuestionPage;