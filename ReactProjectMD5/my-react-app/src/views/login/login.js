import React, { useState } from "react";
import './Login.scss';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}
function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (input) => {
        setFormData({ ...formData, [input.target.name]: input.target.value })
    }

    const handleLogin = async () => {
        const { username, password } = formData
        if (!username || !password) {
            toast.error('Missing value')
            return
        }
        try {
            const response = await axios.post('http://localhost:9090/api.com/v2/auth/sign-in', formData, defaultOptions);
            if (response.status === 200) {
                toast.success('Login Success')
                localStorage.setItem("userLogin", JSON.stringify(response.data.data))
                setTimeout(() => {
                    navigate('/');
                }, 2000);

            }
        } catch (error) {
            toast.error('Login failed')
        }
    }
    return (
        <div className="container">
            <div className="title">
                <h2>Đăng Nhập</h2>
                <p>Bạn chưa có tài khoản ? <a id="myLink" href="/register">Đăng ký tại đây</a></p>
            </div>
            <div className="container__login">
                <label htmlFor="username">UserName :</label><br />
                <input name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Your's Username" /><br />
                <label htmlFor="password">Password :</label><br />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Your's Password" /><br />
                <button className="btn btn-outline-primary btn-lg" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;