import React, { useEffect, useState } from "react";
import './Product.scss';
import axios from "axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

function Product({ searchValue }) {
    const [currentPage, setCurrentPage] = useState(0); // Đổi từ 1 sang 0 vì react-paginate sử dụng index từ 0
    const [totalPages, setTotalPages] = useState(0);
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin')));
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('userLogin'));
        if (userLogin) {
            setUserLogin(userLogin);
        }
    }, [])


    const [listProduct, setListProduct] = useState([]);
    const fetchData = async () => {
        try {
            let response = null;
            if (searchValue == "" || searchValue == null) {
                response = await axios.get(`http://localhost:9090/api.myservice.com/v1/products?page=${currentPage}`)
            } else {
                response = await axios.get(`http://localhost:9090/api.myservice.com/v1/products/search?productName=${searchValue}&page=${currentPage}`)
            }
            setTotalPages(response.data.data.pages);
            setListProduct(response.data.data.data || []);
        } catch (e) {
            console.error(e)
        }
    };
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        fetchData();
    }, [searchValue])

    const handleAddToCart = async (productId) => {
        const formDataToSend = {
            quantity: 1,
            product: {
                productId: productId
            }
        };
        try {
            const response = await axios.post('http://localhost:9090/api.myservice.com/v1/user/shopping-cart', formDataToSend, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userLogin.accessToken}`
                }
            });
            if (response.status === 200) {
                toast.success('Add to cart Success')
            }
        } catch (error) {
            toast.error('Add failed');
            console.log(error)
        }
    }
    return (
        <div>
            <div id="product" className="container__list">
                {listProduct.map((item, index) => (
                    <div className="container__item" key={index}>
                        <img src={item.productUrl} alt="item1" />
                        <p className="item__name">{item.productName}</p>
                        <p>ID : {item.productId}</p>
                        <p>Price : {item.unitPrice}</p>
                        <p>Stock : {item.stock}</p>
                        <p>Category : {item.categoryName}</p>
                        <p><Button onClick={() => handleAddToCart(item.productId)}>Thêm vào giỏ hàng</Button></p>
                    </div>
                ))}
            </div>
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                previousLabel={<KeyboardDoubleArrowLeftIcon />} // Nhãn cho nút Previous
                nextLabel={<KeyboardDoubleArrowRightIcon />} // Nhãn cho nút Next
            />
        </div>
    )
}

export default Product;