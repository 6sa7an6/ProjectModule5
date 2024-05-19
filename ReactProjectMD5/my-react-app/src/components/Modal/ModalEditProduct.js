import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function EditProduct({ productId, toggle, modal, handleAfterUpdateProduct }) {
    const [listCategory, setListCategory] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageProduct, setImageProduct] = useState(null)
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
        productUrl: ''

    })
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api.myservice.com/v1/admin/products/${productId}`, {
                    headers: {
                        'Authorization': `Bearer ${userLogin.accessToken}`
                    }
                });
                const productData = response.data.data;
                setFormData({
                    productName: productData.productName,
                    description: productData.description,
                    unitPrice: productData.unitPrice,
                    stock: productData.stock,
                    categoryId: productData.category.categoryId,
                    productUrl: productData.productUrl,
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [productId]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api.myservice.com/v1/admin/categories', {
                    headers: {
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
    const handleFileChange = (e) => {
        setImageProduct(e.target.files[0])
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
            formDataToSend.append('productId', formData.productId);
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('unitPrice', formData.unitPrice);
            formDataToSend.append('stock', formData.stock);
            formDataToSend.append('categoryId', formData.categoryId);
            if (imageProduct) {
                formDataToSend.append('productFile', imageProduct);
            }

            const response = await axios.put(`http://localhost:9090/api.myservice.com/v1/admin/products/${productId}`, formDataToSend, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userLogin.accessToken}`

                }
            })
            if (response.status === 200) {
                handleAfterUpdateProduct(response.data.data);
                toast.success('Edit Success');
                toggle();
            } else { toast.error('Product Name ') }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
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
                        {listCategory.map((item, index) => (
                            <option key={index} value={item.categoryId} >{item.categoryName}</option>
                        ))}
                    </select><br />
                    <label>Product Image</label><br />
                    <img src=
                        {imagePreview ? imagePreview : formData.productUrl}
                        alt='Product Preview' style={{ maxWidth: '100%', maxHeight: '200px' }} /><br />
                    <input type='file' onChange={handleFileChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditProduct;