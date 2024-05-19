import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.scss';
import logo from '../../assets/logo/logo.png';
import { Search, Person, HowToReg } from '@mui/icons-material';
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import EditUser from "./ModalEditUser";
import ShowCart from "../Modal/ModalShowCart";
import axios from "axios";
function Nav({ onSearch }) {
    const [listCartItem, setListCartItem] = useState([]);
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin')));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalShowCart, setModalShowCart] = useState(false);
    const [modalCart, setModalCart] = useState(false);
    const [modal, setModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const toggleCart = () => {
        setModalCart(!modalCart);
    }
    const toggle = () => {
        setModal(!modal);
    }
    const navigate = useNavigate();
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('userLogin'));
        if (userLogin) {
            setUserLogin(userLogin);
        }
    }, [localStorage.getItem('userLogin')])
    const handleIconClick = () => {
        setIsModalOpen(!isModalOpen); // Mở modal
    };
    const handleLogOut = () => {
        localStorage.removeItem('userLogin');
        setUserLogin(null);
        toast.success('Đang đăng xuất')
        setIsModalOpen(false)
        setTimeout(() => {
            navigate('/login')
        }, 2000);
    }
    const handleEditClick = () => {
        toggle();
        setModalEdit(true)
    }
    const handleSearchClick = () => {
        onSearch(searchValue);
    }
    const handleChange = (input) => {
        setSearchValue(input.target.value);
    };
    const handleShowCart = () => {
        toggleCart();
        setModalShowCart(true)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api.myservice.com/v1/user/shopping-cart', {
                headers: {
                    'Authorization': `Bearer ${userLogin ? userLogin.accessToken : null}`
                }
            })
            setListCartItem(response.data.data || []);
        } catch (e) {
            console.error(e)
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <header>
                <div className="header__main">
                    <div className="topnav">
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }>Home</NavLink>;

                        <NavLink
                            to="/about"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }>Giới thiệu</NavLink>;
                        <NavLink
                            to="/product"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }>Product</NavLink>;

                        {userLogin && userLogin.role.includes("ROLE_ADMIN") && (
                            <>


                                <NavLink
                                    to="/user"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }>User</NavLink>;


                                <NavLink
                                    to="/adminProduct"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }>Product Admin</NavLink>;
                            </>
                        )}

                    </div>
                    <div className="header__logo"><a href="/"><img src={logo} alt="logo"
                        width="150px" height="50px" /></a></div>
                    <div className="header__right">
                        <ul>
                            <li><div><input style={{ height: "30px", fontSize: "medium" }} value={searchValue} onChange={handleChange} type="text" /><Button style={{ marginLeft: "10px" }} onClick={handleSearchClick}><Search /></Button></div></li>
                            <li style={{ textAlign: "right" }} className="person"><Button onClick={handleIconClick}><Person /></Button>
                            </li>
                        </ul>
                        <Modal isOpen={isModalOpen} toggle={handleIconClick}>
                            {userLogin ? (
                                <>
                                    <ModalHeader toggle={handleIconClick}>User Information</ModalHeader>
                                    <ModalBody>

                                        <>
                                            <p>User Name: {userLogin.username}</p>
                                            <p>Full Name : {userLogin.fullName}</p>
                                            <p>Email: {userLogin.email}</p>
                                            <p>Birth Day : {userLogin.birthDay}</p>
                                            <p>User Image : </p>
                                            <img src=
                                                {userLogin.userUrl}
                                                alt='Product Preview' style={{ maxWidth: '100%', maxHeight: '100px', marginBottom: '20px' }} /><br />
                                            <div>
                                                <span>
                                                    <Button color="success" onClick={() => handleShowCart()}>
                                                        Check my Cart
                                                    </Button>
                                                </span>
                                                <span>
                                                    <Button onClick={() => handleEditClick()}>
                                                        Edit User
                                                    </Button>
                                                </span>
                                            </div>
                                        </>

                                    </ModalBody>
                                    <ModalFooter>
                                        <div>
                                            <Button color="warning" onClick={handleLogOut}>Logout</Button>
                                            <Button color="secondary" onClick={handleIconClick}>Close</Button>
                                        </div>
                                    </ModalFooter>
                                </>
                            )
                                :
                                (
                                    <>
                                        <ModalHeader toggle={handleIconClick}>You have Account ?</ModalHeader>
                                        <ModalBody>
                                            <div className="how-to-reg">
                                                <ul>
                                                    <li><a href='/login'><Person />Login</a></li>
                                                    <li><a href='/register'><HowToReg /> Register</a></li>
                                                </ul>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={handleIconClick}>Close</Button>
                                        </ModalFooter>

                                    </>
                                )
                            }
                        </Modal>
                    </div>
                </div>
                {modalEdit && <EditUser modalEdit={modalEdit} toggle={toggle} modal={modal} />}
                {modalShowCart && <ShowCart modalShowCart={modalShowCart} toggle={toggleCart} modal={modalCart} listCartItem={listCartItem} />}
            </header>
        </>
    )
}

export default Nav;