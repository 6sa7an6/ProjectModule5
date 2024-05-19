import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./ModalShowCart.scss";

function ShowCart(props) {
    const [totalPrice, setTotalPrice] = useState(0);

    // Hàm tính tổng tiền
    const calculateTotalPrice = () => {
        let total = 0;
        props.listCartItem.forEach((item) => {
            total += item.quantity * item.product.unitPrice;
        });
        return total;
    };
    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [props.listCartItem]);
    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader>Edit User</ModalHeader>
            <ModalBody>
                <table id="example1" className="table table-bordered table-striped text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ProductName</th>
                            <th>Image</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listCartItem.map((item) => (
                            <tr key={item.cartItemId}>
                                <td>{item.product.productId}</td>
                                <td>{item.product.productName}</td>
                                <td><img src={item.product.productUrl} alt="Image does not exist" width="100px" height="100px" /></td>
                                <td>{item.product.unitPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.product.unitPrice}</td>
                            </tr>
                        ))}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>Total Price : {totalPrice}</td>
                        </tr>
                    </tfoot>

                </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary">
                    Check Out
                </Button>
                <Button color="secondary" onClick={props.toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ShowCart;