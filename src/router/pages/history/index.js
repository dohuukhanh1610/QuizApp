import LogicHistory from "./history"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHistory } from "../../../giveApi/services/HistoryService.js";
import { getTopicList } from "../../../giveApi/services/TopicService.js";
import "./history.scss";
const History = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [history, setHistory] = useState([]);
    const [Topic, setTopic] = useState([]);
    useEffect(() => {
        const result = async () => {
            const data = await getHistory(userId);
            setHistory(data);
            const dataTopic = await getTopicList();
            setTopic(dataTopic);
        };
        result();
    }, [userId]);
    return (
        history.length === 0 ? (
            <div>
                <div className="Back-button" onClick={() => navigate('/')}>
                    ← Back to home
                </div>
                <h1>No history found</h1>
            </div>
        ) : (
            <div>
                <div className="Back-button" onClick={() => navigate('/')}>
                    ← Back to home
                </div>
                <LogicHistory Topic={Topic} history={history} />
            </div>
        ))
}
export default History