import LayoutDefault from "../LayoutDefault";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/register";
import History from "../pages/history";
import Result from "../pages/result";
import Category from "../pages/category";
import Flashcard from "../pages/flashcard";
import Quiz from "../pages/review";
import Test from "../pages/test";
import ChooseMode from "../pages/ChoseMode/ChoseMode";
import ReviewAnswer from "../pages/reviewAnswer";

export const router = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "history/:userId",
                element: <History />,
            },

            {
                path: "category",
                children: [
                    {
                        index: true,
                        element: <Category />,
                    },
                    {
                        path: ":categoryId",
                        children: [
                            {
                                path: "result",
                                element: <Result />,
                            },
                            {
                                index: true,
                                element: <Category />,
                            },
                            {
                                path: ":chooseMode",
                                element: <ChooseMode />,
                            },
                            {
                                path: "flashcard",
                                element: <Flashcard />,
                            },
                            {
                                path: "quiz",
                                element: <Quiz />,
                            },
                            {
                                path: "test",
                                children: [
                                    {
                                        index: true,
                                        element: <Test />,
                                    },
                                    {
                                        path: "reviewAnswer",
                                        element: <ReviewAnswer />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];