import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function EditUser(props) {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUser, setImageUser] = useState(null)
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin')));
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        birthDay: '',
        userUrl: '',
    })
    useEffect(() => {
        const userLoginData = JSON.parse(localStorage.getItem('userLogin'));
        if (userLoginData) {
            setUserLogin(userLoginData);
        }
    }, [localStorage.getItem('userLogin')]);
    useEffect(() => {
        if (userLogin) {
            setFormData({
                username: userLogin.username || '',
                password: userLogin.password || '',
                fullName: userLogin.fullName || '',
                email: userLogin.email || '',
                birthDay: userLogin.birthDay || '',
                userUrl: userLogin.userUrl || '',
            });
        }
    }, [userLogin]);

    const handleFileChange = (e) => {
        setImageUser(e.target.files[0])
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('birthDay', formData.birthDay);
            if (imageUser) {
                formDataToSend.append('userFile', imageUser);
            }

            const response = await axios.put(`http://localhost:9090/api.myservice.com/v1/user/account`, formDataToSend, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userLogin.accessToken}`
                }
            })
            if (response.status === 200) {
                toast.success('Edit Success');
                localStorage.setItem("userLogin", JSON.stringify(response.data.data))
                props.toggle();
            }
        } catch (error) {
            toast.error('Email đã tồn tại ')
        }
    };

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Edit User</ModalHeader>
                <ModalBody>
                    <label htmlFor="fullName">Full Name :</label><br />
                    <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} /><br />
                    <label htmlFor="password">Password :</label><br />
                    <input name="password" type="text" onChange={handleChange} /><br />
                    <label htmlFor='email'>Email :</label><br />
                    <input name='email' type="text" value={formData.email} onChange={handleChange} /><br />
                    <label htmlFor='birthDay'>Date of Birth :</label><br />
                    <input name='birthDay' type="date" value={formData.birthDay} onChange={handleChange} /><br />
                    <label>User Image</label><br />
                    <img src=
                        {imagePreview ? imagePreview : formData.userUrl}
                        alt='User Preview' style={{ maxWidth: '100%', maxHeight: '200px' }} /><br />
                    <input type='file' onChange={handleFileChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditUser;