
import { useNavigate } from "react-router-dom";
import { Progress } from "antd";
const LogicHistory = ({ Topic, history }) => {

    const Navigate = useNavigate();

    const averagePercent =
        history.length > 0
            ? (
                history.reduce(
                    (sum, item) => sum + (item.correct / (item.correct + item.wrong)) * 100,
                    0
                ) / history.length
            ).toFixed(2)
            : 0;
    return (
        <div>
            <div className="history">
                <h1>History</h1>

                <p>Track your progress and review past quizzes</p>

                <div className="total-quiz">
                    <p>Total Quizzes: {history.length}</p>
                </div>

                <div className="Average-score">
                    <p>Average Percentage: {averagePercent}%</p>
                </div>

                <table className="history-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Quiz Name</th>
                            <th>Score</th>
                            <th>Percentage</th>
                            <th>Date</th>
                            <th>Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{Topic.find(topic => topic.id === item.categoryId)?.name || 'Unknown Topic'}</td>
                                <td>{`${item.correct}/${(item.correct) + (item.wrong)}`}</td>
                                <td><Progress percent={((item.correct / ((item.correct) + (item.wrong))) * 100).toFixed(2)} size="small" />
                                </td>
                                <td>{item.createdAt}</td>
                                <td>{item.mode}</td>
                                <td><button onClick={() => { Navigate(`/category/${item.categoryId}/${item.mode}`) }}>Retry</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default LogicHistory;