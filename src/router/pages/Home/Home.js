import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeGuest from "./HomeGuest.js";
import { getCookie } from "../../../cookies/index";
const LogicHome = () => {
    const userRedux = useSelector((state) => state.CheckUser);
    const token = getCookie("token");

    const user = userRedux || token;
    if (user) {
        return <Navigate to="/category" />;
    }

    return <HomeGuest />;
}
export default LogicHome