"use client";
import React, { useEffect, useState } from "react";
import { fetchQuestionsByQuizId } from "@/utils/supabaseApi";
import { insertUserStats } from "@/utils/saveScoreToServer";
import { useUser } from "@/app/context/user";
import Link from "next/link";
interface Answer {
  answer_id: number;
  answer: string;
  correct: boolean;
}

interface Question {
  question_id: number;
  text: string;
  content: string;
  Answer: Answer[];
}

interface QuestionPageProps {
  quizId: number;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ quizId }) => {
  const { user } = useUser();

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const isLastQuestion = currentQuestionIndex === (questions?.length ?? 0) - 1;
  const [insertedStats, setInsertedStats] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestionsData() {
      const fetchedQuestions = await fetchQuestionsByQuizId(quizId);
      setQuestions(fetchedQuestions);
    }

    fetchQuestionsData();
  }, [quizId]);

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
    if (isLastQuestion) {
      if (!user || !user.id) {
        console.log(
          "Użytkownik nie jest zalogowany lub brakuje identyfikatora."
        );
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setAnswered(false);
    }
  };

  const handleInsertScore = () => {
    if (user && user.id) {
      insertUserStats(user.id, quizId, score);
      return <div>
        <p>Well done!</p>
        <Link href="/user_panel/course">
          <p>return to course page</p>
        </Link>
      </div>
    }
    return null;
  };

  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="center-content font-sans text-center">
      {isLastQuestion && answered ? (
        <div className="summary">
          <h2>Quiz Summary</h2>
          <p>Total Questions: {questions?.length ?? 0}</p>
          <p>Correct Answers: {score}</p>
          <p>Incorrect Answers: {questions?.length - score ?? 0}</p>
          <p>
            Accuracy:{" "}
            {questions ? ((score / questions.length) * 100).toFixed(2) : "0.00"}
            %
          </p>

          {handleInsertScore()}
        </div>
      ) : (
        <>
          <h1 className="question-title">Question</h1>
          <h2 className="question-subtitle">{currentQuestion.text}</h2>
          {currentQuestion.content && (
            <div className="question-image">
              {currentQuestion.content.endsWith(".jpg") ||
                currentQuestion.content.endsWith(".png") ? (
                <img
                  src={currentQuestion.content}
                  alt="Question"
                  className="max-w-full h-auto"
                />
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
                className={`answer-item ${selectedAnswerIndex === index
                  ? answer.correct
                    ? "selected correct"
                    : "selected incorrect"
                  : ""
                  }`}
              >
                <strong>{String.fromCharCode(65 + index)}</strong> -{" "}
                {answer.answer}
              </li>
            ))}
          </ul>

          <p className="score">Score: {score}</p>
          {!answered ? (
            <button onClick={handleConfirmAnswer} className="button">
              Confirm Answer
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="button">
              {isLastQuestion ? "Show Summary" : "Next Question"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionPage;
