import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBrain,
    faTrophy,
    faClock,
    faArrowTrendUp
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";

import "./home.scss";

const HomeGuest = () => {
    return (
        <div className="home">

            <div className="home-header">
                <div className="home-header-icon">
                    <FontAwesomeIcon className="home-header-icon-item animate__bounceIn  " icon={faBrain} />
                </div>

                <div className="home-header-title">
                    <h1>Welcome to QuizMaster</h1>
                </div>

                <div className="home-header-description">
                    <p>
                        Challenge yourself with quizzes across multiple categories.
                        Track your progress, compete with friends, and become a quiz master!
                    </p>
                </div>
            </div>

            <Row className="home-characteristics  animate__animated animate__fadeInUp animate__fast">

                <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={6}
                >
                    <div className="home-characteristics-item">
                        <FontAwesomeIcon className="home-characteristics-item-icon icon-1" icon={faBrain} />
                        <h2>Multiple Categories</h2>
                        <p>
                            Choose from Geography, Science, History, and more
                        </p>
                    </div>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={6}
                >
                    <div className="home-characteristics-item ">
                        <FontAwesomeIcon className="home-characteristics-item-icon icon-2" icon={faTrophy} />
                        <h2>Track Your Score</h2>
                        <p>
                            See your performance and compete for top scores
                        </p>
                    </div>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={6}
                >
                    <div className="home-characteristics-item ">
                        <FontAwesomeIcon className="home-characteristics-item-icon icon-3" icon={faClock} />
                        <h2>Quiz History</h2>
                        <p>
                            Review all your past quizzes and results
                        </p>
                    </div>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={6}
                >
                    <div className="home-characteristics-item ">
                        <FontAwesomeIcon className="home-characteristics-item-icon icon-4" icon={faArrowTrendUp} />
                        <h2>Improve Skills</h2>
                        <p>
                            Learn and grow with instant feedback on answers
                        </p>
                    </div>
                </Col>

            </Row>

        </div>
    );
};

export default HomeGuest;