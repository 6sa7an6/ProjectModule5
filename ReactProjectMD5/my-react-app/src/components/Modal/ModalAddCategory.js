import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ModalAddCategory(props) {
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin')));
    useEffect(() => {
        const userLoginData = JSON.parse(localStorage.getItem('userLogin'));
        if (userLoginData) {
            setUserLogin(userLoginData);
        }
    }, [localStorage.getItem('userLogin')]);
    const [formData, setFormData] = useState({
        categoryName: '',
        description: '',

    })
    const handleChange = (input) => {
        setFormData({ ...formData, [input.target.name]: input.target.value })
    };
    const handleAddCategory = async () => {
        const { categoryName } = formData
        if (!categoryName) {
            toast.error('Missing value')
            return
        }
        try {
            const response = await axios.post('http://localhost:9090/api.myservice.com/v1/admin/categories', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userLogin.accessToken}`
                }
            });
            if (response.status === 201) {
                props.updateCategoryList();
                toast.success('Add Success')
            }
        } catch (error) {
            toast.error('Add failed');
            console.log(error)
        }
    }
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    return (
        <div>
            <Button color="primary" onClick={toggle}>
                Add New Category
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
                <ModalBody>
                    <label htmlFor="categoryName">Category Name :</label><br />
                    <input name="categoryName" type="text" value={formData.categoryName} onChange={handleChange} /><br />
                    <label htmlFor="description">Description :</label><br />
                    <input name="description" type="text" value={formData.description} onChange={handleChange} /><br />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { toggle(); handleAddCategory(); }}>
                        Confirm
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ModalAddCategory;