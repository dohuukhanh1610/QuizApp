import { useEffect, useState } from "react";
import { getTopicList } from "../../../giveApi/services/TopicService";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
const LogicCategory = () => {
    const [Topic, setTopic] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await getTopicList();
            setTopic(res);
        }
        fetchData();
    }, [])
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`${id}/chooseMode`);
    }
    return (
        <div className="category-container animate__animated animate__fadeInUp">
            <Row gutter={[16, 16]} >
                {Topic.map((item, index) => (
                    <Col key={item.id} xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="category-item " onClick={() => handleClick(item.id)}>
                            <div className={`category-item-icon icon-${index + 1}`}>
                                {item.icon}
                            </div>
                            <div className="category-item-name">
                                {item.name}
                            </div>
                            <div className="category-item-description">
                                {item.description}
                            </div>
                            <div className="category-item-start">
                                Start now →
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default LogicCategory;