import { useLocation } from "react-router-dom";
import { Pie } from "@ant-design/plots";
import { Button } from "antd";
import { ReloadOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
const LogicResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { categoryId } = useParams();
    const { correct, wrong, mode } = location.state || {
        correct: 0,
        wrong: 0,
        mode: "",
    };
    console.log(categoryId);
    const total = correct + wrong;

    const data = [
        {
            type: "Correct",
            value: correct,
        },
        {
            type: "Wrong",
            value: wrong,
        },
    ];

    const config = {
        data,
        angleField: "value",
        colorField: "type",
        innerRadius: 0.6,

        label: {
            text: "value",
            style: {
                fontWeight: "bold",
                fontSize: 16,
            },
        },

        tooltip: {
            items: [
                (item) => ({
                    name: item.type,
                    value: `${item.value} câu (${(
                        (item.value / total) *
                        100
                    ).toFixed(2)}%)`,
                }),
            ],
        },

        legend: {
            color: {
                title: false,
                position: "right",
                rowPadding: 5,
            },
        },

        annotations: [
            {
                type: "text",
                style: {
                    text:
                        total === 0
                            ? "0%"
                            : `${((correct / total) * 100).toFixed(2)}%`,
                    x: "50%",
                    y: "50%",
                    textAlign: "center",
                    fontSize: 40,
                    fontWeight: "bold",
                },
            },
        ],
        interaction: {
            legendFilter: false,
        },
    };

    return (
        <div>
            <div className="result-header animate__animated animate__tada">
                <div className="result-header-icon">
                    <FontAwesomeIcon icon={faTrophy} />
                </div>
                <h2>Review Results</h2>
                <h2>Completed!</h2>

            </div>
            <Pie {...config} />
            <div className="button">
                {mode === "test" && (
                    <Button className="button-review" type="dashed" onClick={() => navigate(`/category/${categoryId}/test/reviewAnswer`)}>
                        Review Answers
                    </Button>
                )}
                <Button className="button-retry" type="primary" onClick={() => navigate(-1)}>
                    <ReloadOutlined /> Retry Quiz
                </Button>
                <Button
                    className="button-home" type="default" onClick={() => navigate("/")}>
                    <HomeOutlined />Home
                </Button>
            </div>
        </div>
    );
};

export default LogicResult;