import React, { useState, useEffect } from "react";
import UserHeader from "./userhearder";

const MyCart = () => {

    let [cartitem, updateProduct] = useState([]);


    let subTotalCartPrice = 0;
    let totalCartPrice = 0;
    let shippingCharges = 100;

    const user = JSON.parse(localStorage.getItem("user"));
    // console.log('user++++++++++++', user.id)

    const getProduct = () => {
        fetch("http://localhost:1234/cart?cid=" + user.id)
            .then(response => response.json())
            .then(productArray => {
                console.log('productArray', productArray)
                updateProduct(productArray);
            })
    }

    useEffect(() => {
        getProduct();
    }, [1]);

    let [msg, updateMessage] = useState("");
    const deleteItem = (id) => {
        var url = "http://localhost:1234/cart/" + id;
        var postData = {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        }
        fetch(url, postData)
            .then(response => response.json())
            .then(serverRes => {
                updateMessage("Item No. " + id + " Deleted Succesfully !");
                getProduct(); // to reload the list
            })





    }
    let [name, pickName] = useState("");
    let [mobile, pickMobile] = useState("");
    let [email, pickEmail] = useState("");
    let [address, pickAddress] = useState("");


    const updateQuantity = (id, newQuantity) => {
        const updatedCart = cartitem.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: item.iteminfo.price * newQuantity
                };
            }
            return item;
        });

        updateProduct(updatedCart);

        const itemToUpdate = cartitem.find(item => item.id === id);

        const updatedItem = {
            ...itemToUpdate,
            quantity: newQuantity,
            totalPrice: itemToUpdate.iteminfo.price * newQuantity
        };

        fetch(`http://localhost:1234/cart/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedItem)
        })
            .then(response => response.json())
            .then(() => {
                getProduct();
            });
    };


    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
   
    const placeOrder = (orderitem, user, userid,  subTotalCartPrice, shippingCharges, TotalAmount) => {
        orderitem.map(element => {
            element.iteminfo.isOrderPlaced = true;
        });
        console.log('orderitem', orderitem)
        let url = 'http://localhost:1234/orderlist';
        let postoptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ orderitem, user, cid: userid,subTotalCartPrice:subTotalCartPrice,
                shippingCharges:shippingCharges, TotalAmount:TotalAmount })
        }
        fetch(url, postoptions)
            .then(response => response.json())
            .then(serRes => {
                alert('Order placed....!');
                setIsPlacingOrder(true)
            })
    };

    return (
        <>
            <UserHeader />
            <div className="container mt-4">
                <div className="row">
                    <p className="text-center text-danger m-2 mb-3">{msg}</p>
                    <div className="col-lg-8  mb-5 shadow-lg">
                        <h2 className="py-4 font-weight-bold">
                            Cart ({cartitem.length} items)
                        </h2>
                        {
                            cartitem.map((item, index) => {
                                totalCartPrice += (item.iteminfo.price * item.quantity);
                                subTotalCartPrice += (item.iteminfo.price * item.quantity);
                              
                                return (
                                    <div className="card p-4">
                                        <div className="row" key={index}>
                                            <div className="col-lg-5 w-25 bg-light d-flex justify-content-center align-items-center shadow-lg">
                                                <img
                                                    src={item.iteminfo.photo}
                                                    className="img-fluid"
                                                    alt="cart img"
                                                />
                                            </div>
                                            <div className="col-lg-7 mx-auto px-4 mt-2">
                                                <div className="row">
                                                    <div className="col-lg-6 card-title">
                                                        <h1 className="mb-4">{item.iteminfo.name}</h1>
                                                        <p className="mb-2">{item.iteminfo.details}</p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <ul className="pagination justify-content-center">
                                                            <li className="page-item">
                                                            {/* disabled={item.iteminfo.isOrderPlaced} */}
                                                                <button 
                                                                    className="page-link "
                                                                    onClick={() => {
                                                                        if (item.quantity > 1) {
                                                                            updateQuantity(item.id, item.quantity - 1);
                                                                        }
                                                                    }}
                                                                >
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </li>
                                                            <li className="page-item">
                                                                <input
                                                                    type="text"
                                                                    name="quantity"
                                                                    value={item.quantity}
                                                                    className="page-link"
                                                                />
                                                            </li>
                                                            <li className="page-item">
                                                            {/* disabled={item.iteminfo.isOrderPlaced} */}
                                                                <button
                                                                    className="page-link"
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                >
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-8 d-flex justify-content-between">
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={deleteItem.bind(this, item.id)}
                                                        >
                                                            <i className="fas fa-trash-alt  fa-1.8x "></i>{' '}
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <div className="col-lg-4 d-flex justify-content-end">
                                                        <h3>Rs. {item.totalPrice}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="col-lg-4 mx-auto">
                        <div className="p-3 shadow bg-white">
                            <h2 className="mb-5 text-center">Total Amount</h2>
                            <div className="d-flex justify-content-between mb-3">
                                <p className="h5">Sub Total</p>
                                <p className="h5">{subTotalCartPrice}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="h5">Shipping Charge</p>
                                <p className="h5">100.0</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between font-weight-bold">
                                <p className="total-cart">Total Amount</p>
                                <p className="total-cart">
                                    {totalCartPrice + shippingCharges}
                                </p>
                            </div>
                            <div className="d-grid mt-3">
                                <button
                                    className="btn btn-primary text-uppercase"
                                    align="center"
                                    onClick={placeOrder.bind(this, cartitem, user, user.id, subTotalCartPrice, shippingCharges,
                                         (totalCartPrice + shippingCharges))}
                                    disabled={isPlacingOrder}
                                >
                                    Placeorder - Rs.{totalCartPrice + shippingCharges}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCart;
