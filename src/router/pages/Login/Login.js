import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserList, EditUser } from '../../../giveApi/services/UserSevice';
import { useDispatch } from 'react-redux';
import { setCookie } from '../../../cookies/index.js';
import { useNavigate } from 'react-router-dom';
import { CheckUser } from '../../../redux/actions/user.js';
const InputLogin = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const res = await getUserList();
            setData(res);
        };
        fetchData();
    }, []);
    const handleSubmit = async (e) => {
        const user = data?.find((item) => item.email === e.email && item.password === e.password);
        if (user) {
            const token = Math.random().toString(36).substring(2);
            await EditUser(user.id, { token: token });
            setCookie('token', token, 1);
            setCookie('userId', user.id, 1);
            dispatch(CheckUser({ 'userId': user.id, 'token': token }));
            message.success("Register successful!");
            navigate('/');



        } else {
            message.error("Email or password is incorrect!");
        }
    }
    return (
        <>
            <Form className="form animate__animated animate__fadeInLeft" onFinish={handleSubmit}>
                <FontAwesomeIcon className="form-icon" icon={faArrowRightToBracket} />
                <h1>Login</h1>
                <p>Welcome back to QuizMaster</p>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" className="form-button">
                        Log in
                    </Button>
                    Don't have an account? <Link to="/register">Register now!</Link>
                </Form.Item>
            </Form>
        </>
    )
}
export default InputLogin
