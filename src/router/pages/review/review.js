import { useState, useEffect } from "react";
import { getQuestionsByCategory } from "../../../giveApi/services/QuestionsService";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Spin, Button, Result } from "antd";
import { useSelector } from "react-redux";
import { getCookie } from "../../../cookies/index";
import { createHistory } from "../../../giveApi/services/HistoryService";

const LogicReview = () => {
    const mode = "quiz";
    const userRedux = useSelector((state) => state.CheckUser);
    const token = getCookie("token");
    const user = userRedux || token;
    const userId = getCookie("userId");
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    const [TrueAnswer, setTrueAnswer] = useState(0);
    const [FalseAnswer, setFalseAnswer] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await getQuestionsByCategory(categoryId);
            setQuestions(result);
        };

        fetchQuestions();
    }, [categoryId]);

    const handleAnswerClick = (answer) => {
        if (selectedAnswer) return;

        setSelectedAnswer(answer);
        if (answer !== question.correct_answer) {
            setFalseAnswer(FalseAnswer + 1);
        } else {
            setTrueAnswer(TrueAnswer + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            setIsFinished(true);
        }
    };
    const handleSubmitReview = async () => {
        await createHistory({
            id: Date.now().toString(),
            userId: userId,
            categoryId: categoryId,
            mode: mode,
            correct: TrueAnswer,
            wrong: FalseAnswer,
            createdAt: new Date().toLocaleString("vi-VN"),
        });
        navigate(`/category/${categoryId}/result`, {
            state: {
                correct: TrueAnswer,
                wrong: FalseAnswer,
                mode: mode,
            }
        });
    };

    if (!user) {
        return <Navigate to="/" />;
    }

    if (questions.length === 0) {
        return (
            <Spin size="large">
                Loading questions...
            </Spin>
        );
    }

    if (isFinished) {
        return (
            <Result
                status="success"
                title="Great, you have completed the review!"
                extra={
                    <Button
                        type="primary"
                        onClick={() => handleSubmitReview()}
                        className="Finish-button"
                    >
                        Finish
                    </Button>
                }
            />
        );
    }

    const question = questions[currentQuestion];
    console.log("question", questions);
    return (
        <div>
            <div
                className="Back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </div>
            <div className="Category-title animate__animated animate__fadeInDown">
                <h2>{question.category}</h2>
            </div>
            <div className="box-quiz animate__animated animate__fadeIn">
                <div
                    key={question.id}
                    className="box-quiz-item"
                >
                    <div className="box-quiz-item-question ">
                        <h3>
                            Question {currentQuestion + 1}: {question.question}
                        </h3>
                    </div>

                    <div className="box-quiz-item-answer">
                        {question.answers.map((answer, index) => {
                            let className = "box-quiz-item-answer-item";

                            if (selectedAnswer) {
                                if (answer === question.correct_answer) {
                                    className += " green";
                                } else if (answer === selectedAnswer) {
                                    className += " red";
                                }
                            }

                            return (
                                <div
                                    key={index}
                                    className={className}
                                    onClick={() => handleAnswerClick(answer)}
                                >
                                    {answer}
                                </div>
                            );
                        })}
                    </div>

                    <div className="box-quiz-item-button">
                        <Button
                            type="primary"
                            disabled={!selectedAnswer}
                            onClick={handleNextQuestion}
                        >
                            {currentQuestion < questions.length - 1
                                ? "Next Question"
                                : "Finish Review"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogicReview;