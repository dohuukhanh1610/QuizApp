import { useNavigate, Navigate } from "react-router-dom";
import './ChooseMode.scss';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOutlined, QuestionOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { getTopicList } from "../../../giveApi/services/TopicService";
import { useSelector } from "react-redux";
import { getCookie } from "../../../cookies/index";
import { Row, Col } from 'antd';
const ChooseMode = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [Topic, setTopic] = useState([]);
    const userRedux = useSelector((state) => state.CheckUser);
    const token = getCookie("token");

    const user = userRedux || token;
    useEffect(() => {
        const fetchData = async () => {
            const res = await getTopicList();
            setTopic(res);
        }
        fetchData();
    }, []);
    const currentTopic = Topic.find(topic => topic.id === String(categoryId));
    return (
        !user ? <Navigate to="/" /> : (
            <div>

                <div className="header animate__animated animate__fadeInLeft">
                    <h1>Choose Your Mode</h1>
                    <p>How would you like to study {currentTopic?.name}?</p>
                </div>
                <div className="mode-option animate__animated animate__fadeInUp">
                    <Row gutter={[16, 16]} justify="center" align="middle">
                        <Col xl={8} md={8} lg={8} sm={12}>
                            <div className="mode-option-item" onClick={() => navigate(`/category/${categoryId}/flashcard`)}>
                                <div className="mode-option-item-icon icon-flashcard">
                                    <BookOutlined />
                                </div>
                                <h2>Flashcards</h2>
                                <div className="mode-option-item-description">
                                    Learn at your own pace with interactive flashcards. Flip cards to reveal answers.
                                </div>
                                <div className="mode-option-item-button">
                                    Start Learning
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} md={8} lg={8} sm={12}>
                            <div className="mode-option-item" onClick={() => navigate(`/category/${categoryId}/quiz`)}>
                                <div className="mode-option-item-icon icon-quiz">
                                    <QuestionOutlined />
                                </div>
                                <h2>Quiz</h2>
                                <div className="mode-option-item-description ">
                                    Practice with instant feedback. See correct answers immediately after each question.
                                </div>
                                <div className="mode-option-item-button">
                                    Start Quiz
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} md={8} lg={8} sm={12}>
                            <div className="mode-option-item" onClick={() => navigate(`/category/${categoryId}/test`)}>
                                <div className="mode-option-item-icon icon-test">
                                    <FieldTimeOutlined />
                                </div>
                                <h2>Test</h2>
                                <div className="mode-option-item-description">
                                    Challenge yourself with a timed quiz. Race against the clock to answer all questions.
                                </div>
                                <div className="mode-option-item-button">
                                    Start Test
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="back-button" onClick={() => navigate(-1)}>
                    ← Back to Categories
                </div>
            </div>
        )
    )
}
export default ChooseMode;