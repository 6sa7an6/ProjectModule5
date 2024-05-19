import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import './ProductAdmin.scss';
import ModalAddProduct from "../../components/Modal/ModalAddProduct";
import { toast } from "react-toastify";
import EditProduct from "../../components/Modal/ModalEditProduct";
import ModalAddCategory from "../../components/Modal/ModalAddCategory";

function ProductAdmin() {
    const [productId, setProductId] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [modal, setModal] = useState(false);
    const [listCategory, setListCategory] = useState([])
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin')));
    const updateCategoryList = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api.myservice.com/v1/admin/categories', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userLogin.accessToken}`
                }
            });
            setListCategory(response.data.data || []);
        } catch (error) {
            console.error('Error updating category list:', error);
        }
    };
    useEffect(() => {
        const userLoginData = JSON.parse(localStorage.getItem('userLogin'));
        if (userLoginData) {
            setUserLogin(userLoginData);
        }
    }, [localStorage.getItem('userLogin')]);
    const toggle = () => {
        setModal(!modal);
    }
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api.myservice.com/v1/admin/products', {
                headers: {
                    'Authorization': `Bearer ${userLogin.accessToken}`
                }
            })
            setListProduct(response.data.data || []);
        } catch (e) {
            console.error(e)
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    const handleAfterUpdateProduct = (updateProduct) => {
        let updateList = listProduct.map(product => {
            if (product.productId === updateProduct.productId) { return updateProduct } else { return product }
        })
        setListProduct(updateList)
    }

    const handleToggleProductStatus = async (productId) => {
        const confirmed = window.confirm(`Are you sure you want to change this product?`);
        if (!confirmed) return;
        try {
            const response = await axios.put(`http://localhost:9090/api.myservice.com/v1/admin/products/toggleStatus/${productId}`, null, {
                headers: {
                    'Authorization': `Bearer ${userLogin.accessToken}`
                }
            });
            fetchData();
            toast.success('Change Status Success')
        } catch (error) {
            console.error("Error toggling product status:", error);
        }
    }
    const handleEditClick = (idProduct) => {
        toggle();
        setProductId(idProduct);
        setModalEdit(true)
    }

    return (
        <div className="container-product">
            <div className="modal-product">
                <div>
                    <ModalAddProduct
                        showProduct={fetchData}
                    />
                </div>
                <div className="modal-category">
                    <ModalAddCategory
                        updateCategoryList={updateCategoryList}
                    />
                </div>
            </div>
            <div className="card-body">
                <table id="example1" className="table table-bordered table-striped text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ProductName</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct.map((item) => (
                            <tr key={item.productId}>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td>{item.description}</td>
                                <td><img src={item.productUrl} alt="Image does not exist" width="100px" height="100px" /></td>
                                <td>{item.unitPrice}</td>
                                <td>{item.category.categoryName}</td>
                                <td>{item.status ? 'Active' : 'Block'}</td>
                                <td><Button
                                    onClick={() => handleToggleProductStatus(item.productId)} color={item.status ? 'danger' : 'success'}>
                                    {item.status ? 'Block' : 'Active'}
                                </Button>
                                </td>
                                <td>
                                    <Button onClick={() => handleEditClick(item.productId)}>
                                        Edit Product
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
            {modalEdit && <EditProduct handleAfterUpdateProduct={handleAfterUpdateProduct} productId={productId} modalEdit={modalEdit} toggle={toggle} modal={modal} />}
        </div>
    )
}

export default ProductAdmin;