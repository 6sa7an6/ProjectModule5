import React, { useState } from "react";
import axios from "axios";
import './Register.scss';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const defaultOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
}
function Register() {
    const [imagePreview, setImagePreview] = useState(null)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        birthDay: "",
        userFile: ""
    });
    const navigate = useNavigate();

    const handleChange = (input) => {
        setFormData({ ...formData, [input.target.name]: input.target.value })
    };
    const handleFileChange = (e) => {
        setFormData({ ...formData, userFile: e.target.files[0] });
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleRegister = async () => {
        const { username, password, fullName, email, birthDay } = formData
        if (!username || !password || !fullName || !email || !birthDay) {
            toast.error('Missing value')
            return
        }
        try {
            const response = await axios.post('http://localhost:9090/api.com/v2/auth/sign-up', formData, defaultOptions);
            if (response.status === 201) {
                toast.success('Register Success')

                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            }
        } catch (error) {
            toast.error('Register failed')
        }
    }
    return (
        <div className="container">
            <div className="title">
                <h2>Đăng ký tài khoản</h2>
                <p>Bạn đã là thành viên ? <a id="myLink" href="/login">Đăng nhập tại đây</a></p>
            </div>
            <div className="container__register">
                <label htmlFor="username">UserName :</label><br />
                <input name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Your's Username" /><br />
                <label htmlFor="password">Password :</label><br />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Your's Password" /><br />
                <label htmlFor="fullName">FullName :</label><br />
                <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Your's Name" /><br />
                <label htmlFor="email">Email :</label><br />
                <input name="email" type="text" value={formData.email} onChange={handleChange} placeholder="Your's Email" /><br />
                <label htmlFor="email">Birthday :</label><br />
                <input type="date" name="birthDay" value={formData.birthDay} onChange={handleChange} />
                <label>User Image</label><br />
                {imagePreview && <img src={imagePreview} alt='User Preview' style={{ maxWidth: '100%', maxHeight: '100px' }} />}<br />
                <input type='file' onChange={handleFileChange} />
                <button className="btn btn-outline-primary btn-lg" onClick={handleRegister}>Register</button>
            </div>
        </div>
    )
}

export default Register;