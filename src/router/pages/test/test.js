import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";

import { getQuestionsByCategory } from "../../../giveApi/services/QuestionsService";
import { createHistory } from "../../../giveApi/services/HistoryService";
import { SaveAnswer } from "../../../redux/actions/user";
import { getCookie } from "../../../cookies";

const LogicTest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const userId = getCookie("userId");

    const [data, setData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [time, setTime] = useState(30 * 60);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getQuestionsByCategory(categoryId);
            setData(result);
        };

        fetchData();
    }, [categoryId]);

    const handleAnswerSelect = (e, questionId) => {
        const answer = {
            questionId: questionId,
            answer: e.target.value,
        };

        setAnswers((prev) => {
            const others = prev.filter(
                (item) => item.questionId !== questionId
            );

            return [...others, answer];
        });
    };

    const calculateResult = useCallback(() => {
        let correct = 0;

        answers.forEach((item) => {
            const question = data.find(
                (q) => q.id === item.questionId
            );

            if (question?.correct_answer === item.answer) {
                correct++;
            }
        });

        return {
            correct,
            wrong: data.length - correct,
        };
    }, [answers, data]);

    const submitTest = useCallback(async () => {
        const { correct, wrong } = calculateResult();

        dispatch(SaveAnswer(answers));

        await createHistory({
            id: Date.now().toString(),
            userId,
            categoryId,
            mode: "test",
            correct,
            wrong,
            createdAt: new Date().toLocaleString("vi-VN"),
        });

        navigate(`/category/${categoryId}/result`, {
            state: {
                correct,
                wrong,
                mode: "test",
            },
        });
    }, [
        answers,
        calculateResult,
        dispatch,
        userId,
        categoryId,
        navigate,
    ]);
    const handleTimeOut = useCallback(() => {
        Modal.confirm({
            title: "Hết thời gian",
            content: "Bạn đã hết thời gian làm bài.",
            okText: "Nộp bài",
            cancelButtonProps: {
                style: {
                    display: "none",
                },
            },
            async onOk() {
                await submitTest();
            },
        });
    }, [submitTest]);

    useEffect(() => {
        if (time <= 0) {
            handleTimeOut();
            return;
        }

        const timer = setTimeout(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [time, handleTimeOut]);

    const minutes = String(
        Math.floor(time / 60)
    ).padStart(2, "0");
    const seconds = String(
        time % 60
    ).padStart(2, "0");

    const showConfirm = () => {
        if (answers.length < data.length) {
            Modal.warning({
                title: "Chưa hoàn thành bài thi",
                content: `Bạn còn ${data.length - answers.length} câu chưa trả lời.`,
            });

            return;
        }

        Modal.confirm({
            title: "Xác nhận nộp bài",
            content: "Bạn có chắc chắn muốn nộp bài?",
            okText: "Nộp bài",
            cancelText: "Hủy",
            async onOk() {
                await submitTest();
            },
        });
    };
    console.log("answers", answers);
    return (
        <>
            <div
                className="Back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </div>

            <div className="time-count">
                <h1>
                    {minutes}:{seconds}
                </h1>
            </div>

            <div className="test-header">
                <h2>
                    {data[0]?.category || "Test"}
                </h2>
            </div>

            <div className="question">
                {data.map((question, index) => (
                    <div
                        className="question-item"
                        key={question.id}
                    >
                        <div className="question-item-question">
                            <h3>
                                Question {index + 1}:{" "}
                                {question.question}
                            </h3>
                        </div>

                        <div className="question-item-answer">
                            {question.answers.map(
                                (answer, answerIndex) => (
                                    <label
                                        key={answerIndex}
                                        htmlFor={`answer-${index}-${answerIndex}`}
                                        className="question-item-answer-item"
                                    >
                                        <input
                                            type="radio"
                                            id={`answer-${index}-${answerIndex}`}
                                            name={`question-${index}`}
                                            value={answer}
                                            onChange={(e) =>
                                                handleAnswerSelect(
                                                    e,
                                                    question.id
                                                )
                                            }
                                        />

                                        <span>{answer}</span>
                                    </label>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="Button-confirm">
                <Button
                    type="primary"
                    onClick={showConfirm}
                >
                    Nộp bài
                </Button>
            </div>
        </>
    );
};

export default LogicTest;