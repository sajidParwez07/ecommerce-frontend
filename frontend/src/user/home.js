import React, { useState, useEffect } from "react";
import UserHeader from "./userhearder";
import { useNavigate } from "react-router-dom";

const MyHome = () => {
const navigate = useNavigate();
    let [product, updateProduct] = useState([]);
    let [myProduct, setMyProduct] = useState([]);
    const getProduct = () => {
        fetch("http://localhost:1234/product")
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray);
            })
    }

    useEffect(() => {
        getProduct();
        getProductById();
    }, [1]);


    const user = JSON.parse(localStorage.getItem("user"));
    // console.log('user***', user)

    const getProductById = () => {
        if(user !== null) {
            fetch("http://localhost:1234/cart?cid=" + user.id)
            .then(response => response.json())
            .then(productArray => {
                setMyProduct(productArray)
            console.log('productArray', productArray)
            })
        }
        
    }

    const addToCart = (iteminfo) => {
        console.log('iteminfo', iteminfo);
        console.log('myProduct', myProduct);
        const existedProduct = myProduct.find(elt => elt.iteminfo.id === iteminfo.id)
        console.log('existedProduct', existedProduct)
        // iteminfo.isOrderPlaced = false;
        // console.log('pdata', pdata);
        if (user !== null) {
            const pdata ={iteminfo, cid:user.id, quantity:1, totalPrice:iteminfo.price}

            pdata.quantity = existedProduct ? existedProduct.quantity + 1 : pdata.quantity;
            pdata.totalPrice = existedProduct ? Number(existedProduct.totalPrice) + Number(iteminfo.price) : Number(pdata.totalPrice);
                console.log('pdata', pdata)
                var url = existedProduct ? `http://localhost:1234/cart/${existedProduct.id}` : "http://localhost:1234/cart";
                var postData = {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pdata),
                    method: existedProduct ? "PUT" : "POST"
                };
    
                fetch(url, postData)
                    .then(response => response.json())
                    .then(serverRes => {
                        updateMessage(iteminfo.name + " Added in Cart")
                    })
            } else {
                navigate('/login');
            }
        
    }

    let [msg, updateMessage] = useState("");
    return (
        <>
            <UserHeader />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-12">
                        <p className="text-center text-danger">
                            {msg}
                        </p>
                    </div>
                </div>
                <div className="row mt-3">

                    {
                        product.map((myproduct, index) => {
                            return (
                                <div className='text-center bg-white shadow-lg rounded-2' key={index}
                                    style={{ width: '25%', margin: '8px' }}
                                >
                                    <h3 className='text-primary text-center'>{myproduct.name}</h3>
                                    <img src={myproduct.photo} className='img-fluid mb-2' width="100" height="100" />
                                    <p className='p-0'> Rs.{myproduct.price} </p>
                                    <p>
                                        {myproduct.details}
                                    </p>
                                    <div className='text-center'>
                                    <button disabled={myproduct.productQty === 0}
                                        className='btn btn-danger btn-sm mb-3' onClick={addToCart.bind(this, myproduct)}>
                                            {myproduct.productQty === 0  ? "Not Available" : "Add to Cart"}
                                    </button>
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default MyHome;
