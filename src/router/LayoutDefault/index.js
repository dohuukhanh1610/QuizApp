import { Outlet, Link } from "react-router-dom"
import "./layout.scss"
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { UserOutlined, DownOutlined, LogoutOutlined, QuestionCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Avatar, message } from 'antd';
import { deleteCookie, getCookie } from "../../cookies/index.js";
import { EditUser } from "../../giveApi/services/UserSevice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserList } from "../../giveApi/services/UserSevice";
import { CheckUser } from "../../redux/actions/user.js";
const LayoutDefault = () => {
    const userRedux = useSelector((state) => state.CheckUser);
    const token = getCookie("token");
    const user = userRedux?.token || token;
    const userId = userRedux?.userId || getCookie("userId");
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const res = await getUserList();
            setData(res);
        };
        fetchData();
    }, [user]);
    const dataUser = data?.find((item) => item.token === user);
    const userName = dataUser?.name;
    const handleLogout = async () => {
        if (!dataUser) return;
        await EditUser(dataUser.id, { token: '' });
        deleteCookie('token');
        message.success("Logout successful");

        navigate("/");
        dispatch(CheckUser(null));
    }
    const items = [
        {
            key: '1',
            label: userName,
            icon: <Avatar size={24} icon={<UserOutlined />} />,
        },
        {
            key: '2',
            label: <Link to={`/history/${userId}`}>History</Link>,
            icon: <HistoryOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: <span onClick={handleLogout}>Logout</span>,
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];
    return (
        <div className="Layout-default">

            <header className="Layout-default-header">
                <div className="Layout-default-logo">
                    <Link to="/"><span className="Layout-default-logo-icon"><QuestionCircleOutlined /></span>
                        <span className="Layout-default-logo-text">Quizmaster</span>
                    </Link>
                </div>
                {user ? (
                    <div className="Layout-user">


                        <Dropdown trigger={['click']} menu={{ items }}>
                            <Button type="primary">
                                <Space>
                                    <UserOutlined />
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                ) : (
                    <div className="Layout-auth">
                        <div className="Layout-auth-login">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="Layout-auth-register">
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                )}
            </header>
            <main className="Layout-default-main">
                <Outlet />
            </main>
            <footer className="Layout-default-footer">
                <p>© 2026 QuizMaster. Test your knowledge across various categories.</p>
            </footer>
        </div>
    )
}
export default LayoutDefault