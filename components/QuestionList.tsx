import React, { useEffect, useState } from 'react';
import { fetchQuestions, fetchAnswersByQuestionId } from '../utils/supabaseApi';
import { Question, Answer } from '@prisma/client'; // Import the types

function QuestionList() {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const questionData = await fetchQuestions();
                setQuestions(questionData);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Question List</h1>
            <ul>
                {questions.map((question) => (
                    <li key={question.question_id}>
                        {question.text}
                        <ul>
                            {/* Fetch and display answers */}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionList;
