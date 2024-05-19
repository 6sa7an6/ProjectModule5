import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function ModalAddProduct(args) {
    const [listCategory, setListCategory] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin')));
    useEffect(() => {
        const userLoginData = JSON.parse(localStorage.getItem('userLogin'));
        if (userLoginData) {
            setUserLogin(userLoginData);
        }
    }, [localStorage.getItem('userLogin')]);
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        unitPrice: '',
        stock: '',
        categoryId: '',
        productFile: ''

    })
    const handleFileChange = (e) => {
        setFormData({ ...formData, productFile: e.target.files[0] });
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleChange = (input) => {
        setFormData({ ...formData, [input.target.name]: input.target.value })
    };
    const handleAddProduct = async () => {
        const { productName, unitPrice, stock, categoryId } = formData
        if (!productName || !unitPrice || !stock || !categoryId) {
            toast.error('Missing value')
            return
        }
        try {
            const response = await axios.post('http://localhost:9090/api.myservice.com/v1/admin/products', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userLogin.accessToken}`
                }
            });
            if (response.status === 201) {
                toast.success('Add Success')
                args.showProduct();
            }
        } catch (error) {
            toast.error('Add failed');
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api.myservice.com/v1/admin/categories', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${userLogin.accessToken}`
                    }
                })
                setListCategory(response.data.data || []);
            } catch (e) {
                console.error(e)
            }
        };

        fetchData();
    }, []);
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    return (
        <div>
            <Button color="primary" onClick={toggle}>
                Add New Product
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
                <ModalBody>
                    <label htmlFor="productName">Product Name :</label><br />
                    <input name="productName" type="text" value={formData.productName} onChange={handleChange} /><br />
                    <label htmlFor="description">Description :</label><br />
                    <input name="description" type="text" value={formData.description} onChange={handleChange} /><br />
                    <label htmlFor='unitPrice'>Unit Price :</label><br />
                    <input name='unitPrice' type="text" value={formData.unitPrice} onChange={handleChange} /><br />
                    <label htmlFor='stock'>Stock :</label><br />
                    <input name='stock' type="number" value={formData.stock} onChange={handleChange} /><br />
                    <label>Category :</label><br />
                    <select value={formData.categoryId} onChange={handleChange} name='categoryId'>
                        <option value="" disabled>Select Category</option>
                        {listCategory.map((item, index) => (
                            <option key={index} value={item.categoryId}>{item.categoryName}</option>
                        ))}
                    </select><br />
                    <label>Product Image</label><br />
                    {imagePreview && <img src={imagePreview} alt='Product Preview' style={{ maxWidth: '100%', maxHeight: '200px' }} />}<br />
                    <input type='file' onChange={handleFileChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { toggle(); handleAddProduct(); }}>
                        Confirm
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalAddProduct;