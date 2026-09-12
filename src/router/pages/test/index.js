import LogicTest from "./test";
import { useSelector } from "react-redux";
import { getCookie } from "../../../cookies/index.js"
import { Navigate } from "react-router-dom";
import './test.scss'
const Test = () => {
    const userRedux = useSelector((state) => state.CheckUser);
    const token = getCookie("token");

    const user = userRedux || token;
    return (
        !user ? <Navigate to="/" /> : (<>

            <LogicTest />
        </>
        )
    )
}
export default Test;