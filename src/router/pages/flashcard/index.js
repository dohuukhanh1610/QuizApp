import LogicFlashcard from "./flashcard";
import { getCookie } from "../../../cookies/index.js"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Flashcard.scss';
const Flashcard = () => {
    const userRedux = useSelector((state) => state.CheckUser);
    const token = getCookie("token");

    const user = userRedux || token;
    const navigate = useNavigate();
    return (
        !user ? <Navigate to="/" /> : (

            <>
                <div className="Back-button" onClick={() => navigate(-1)}>
                    ← Back
                </div>
                <LogicFlashcard />
            </>
        )
    )
}
export default Flashcard;