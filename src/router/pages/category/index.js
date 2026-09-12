import LogicCategory from "./category";
import { getCookie } from "../../../cookies/index.js"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import './category.scss'
const Category = () => {
    const userRedux = useSelector((state) => state.CheckUser);
    const token = getCookie("token");

    const user = userRedux || token;
    return (
        !user ? <Navigate to="/" /> : (
            <div >
                <div className="category-header animate__animated animate__fadeInDown">
                    <h1>Choose Your Category</h1>
                    <p>Select a category to start your quiz challenge</p>
                </div>
                <LogicCategory />
            </div>
        ))
}
export default Category