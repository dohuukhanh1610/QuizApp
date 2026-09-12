import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuestionsByCategory } from "../../../giveApi/services/QuestionsService";
import { Badge } from "antd";
const LogicReviewAnswer = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const userAnswers = useSelector(state => state.SaveAnswers);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getQuestionsByCategory(categoryId);
            setData(result);
        };
        fetchData();
    }, [categoryId])
    console.log("Question:", data);
    console.log("User answer:", userAnswers);
    return (
        <>
            <div
                className="Back-button"
                onClick={() => navigate("/")}
            >
                ← Back to home
            </div>


            <div className="question">
                {data.map((question, index) => {
                    const userAnswer = userAnswers.find(
                        item => item.questionId === question.id
                    );
                    let text = '';
                    let color = '';
                    if (question.correct_answer === userAnswer?.answer) {
                        text = 'Correct';
                        color = 'green';
                    } else {
                        text = 'Incorrect';
                        color = 'red';
                    }
                    return (
                        <Badge.Ribbon color={color} text={text} key={index}>
                            <div
                                className="question-item"
                                key={question.id}
                            >
                                <div className="question-item-question">
                                    <h3>
                                        Question {index + 1}: {question.question}
                                    </h3>
                                </div>

                                <div className="question-item-answer">
                                    {question.answers.map((answer, answerIndex) => (
                                        <div
                                            className={`question-item-answer-item ${(question.correct_answer === answer) ? 'green' : 'red'}`}
                                            key={answerIndex}
                                        >
                                            <input
                                                type="radio"
                                                id={`answer-${index}-${answerIndex}`}
                                                name={question.id}
                                                value={answer}
                                                checked={userAnswer?.answer === answer}
                                                readOnly
                                            />

                                            <label
                                                htmlFor={`answer-${index}-${answerIndex}`}
                                            >
                                                {answer}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </Badge.Ribbon>
                    )
                }
                )}
            </div>
        </>
    )
}
export default LogicReviewAnswer