import { combineReducers } from "redux";
import CheckUser from "./user";
import SaveAnswers from "./saveAnswers";
const AllReducer = combineReducers({
    CheckUser,
    SaveAnswers,
    // add Reducer in here
})
export default AllReducer;