import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import './User.scss';

function User() {
    const [listUser, setListUser] = useState([]);
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin')));
    useEffect(() => {
        const userLoginData = JSON.parse(localStorage.getItem('userLogin'));
        if (userLoginData) {
            setUserLogin(userLoginData);
        }
    }, [localStorage.getItem('userLogin')]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api.myservice.com/v1/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${userLogin.accessToken}`

                    }
                })
                setListUser(response.data.data.data || []);
            } catch (e) {
                console.error(e)
            }
        };

        fetchData();
    }, []);
    return (
        <div className="card-body">
            <table id="example1" className="table table-bordered table-striped text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>FullName</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser.map((item) => (
                        <tr key={item.userId}>
                            <td>{item.userId}</td>
                            <td>{item.username}</td>
                            <td>{item.fullName}</td>
                            <td><img src={item.userUrl} alt="Image does not exist" width="100px" height="100px" /></td>
                            <td>{item.email}</td>
                            <td>
                                {item.roleSet.map((role, index) => (
                                    <span key={index}>{role.roleName}</span>
                                ))}
                            </td>
                            <td>{item.status ? 'Active' : 'Block'}</td>
                            <td><Button>Block</Button></td>
                            <td><Button>ROle</Button></td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )
}

export default User;