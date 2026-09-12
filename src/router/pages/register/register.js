import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUser, getUserList } from '../../../giveApi/services/UserSevice';
import { useEffect, useState } from 'react';
const RegisterLogic = () => {
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
        if (data?.find((item) => item.email === e.email)) {
            message.error("Email already exists");
            return;
        }
        await createUser({ name: e.Username, email: e.email, password: e.password, token: '' });
        message.success("Registration successful");
        navigate('/login');
    }
    return (
        <>
            <Form className="form animate__animated animate__fadeInLeft" onFinish={handleSubmit}

            >
                <FontAwesomeIcon className="form-icon" icon={faUserPlus} />
                <h1>Create Account</h1>
                <p>Join QuizMaster today</p>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error("Passwords do not match!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button
                        className="form-button"
                        block
                        type="primary"
                        htmlType="submit"
                    >
                        Register
                    </Button>

                    <div className="form-login">
                        Already have an account?{" "}
                        <Link to="/login">Login now!</Link>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
export default RegisterLogic