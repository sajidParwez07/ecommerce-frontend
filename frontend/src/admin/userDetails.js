import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from './adminheader';

const UserDetails = () => {
    let [user, setUser] = useState([]);
    const { id } = useParams();
    // console.log('id***', id)


    const getUserDetails = () => {
        fetch('http://localhost:1234/orderlist?cid=' + id)
            .then(Response => Response.json())
            .then(serRes => {
                console.log('serRes***user', serRes)
                setUser(serRes);
            })
    };

    useEffect(() => {
        getUserDetails();
    }, [1]);


    return (
        <>
            <AdminHeader />
            <div className='container mt-4'>
                <div className='row'>
                    {
                        user.map((udata, index) => {
                            console.log('udata', udata)
                            return (
                                <>
                                    <div className='col-lg-5 me-5 mt-5 position-relative'>
                                        <div className='card shadow bg-white'>
                                            <div className='card-header'>
                                                <h4 className='text-success text-center'>Customer Details</h4>
                                            </div>
                                            <div className='card-body' key={index + 1}>
                                                <h6 className='mb-3'>Name : <span className='text-primary ms-3'>{udata.user.name}</span></h6>
                                                <h6 className='mb-3'>Address : <span></span></h6>
                                                <h6 className='mb-3'>Mobile-No : <span></span></h6>
                                                <h6 className='mb-3'>Email : <span className='text-primary ms-3'>{udata.user.email}</span></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 ms-5 mt-5">
                                        <div className="p-3 shadow bg-white">
                                            <h2 className="mb-5 text-center">Total Amount</h2>
                                            <div className="d-flex justify-content-between mb-3">
                                                <p className="h5">Sub Total</p>
                                                <p className="h5">{udata.subTotalCartPrice}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="h5">Shipping Charge</p>
                                                <p className="h5">{udata.shippingCharges}</p>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between font-weight-bold">
                                                <p className="total-cart">Total Amount</p>
                                                <p className="total-cart">{udata.TotalAmount}</p>
                                            </div>
                                            <div className="d-grid mt-3">
                                                <button
                                                    className="btn btn-primary text-uppercase"
                                                    align="center"
                                                >
                                                    Order Accept
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        udata.orderitem.map((pdata, index) => {
                                            return (
                                                <div className='col-lg-6 mt-5'>
                                                    <div className='card shadow bg-white'>
                                                        <div className='card-header'>
                                                            <h4 className='text-center'>Order Item</h4>
                                                        </div>
                                                        <div className='card-body'>
                                                            <div className='row mt-4'>
                                                                <div className='col-lg-6'>
                                                                    <img src={pdata.iteminfo.photo}
                                                                        alt='product.jpg' className='img-fluid' width='200' />
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <h5 className='mb-4'>Title : {pdata.iteminfo.name}</h5>
                                                                    <h5 className='mb-4'>Quantity : {pdata.quantity}</h5>
                                                                    <h5 className='mb-4'>Price : Rs.{pdata.totalPrice}</h5>
                                                                    <h5 className='mb-4' style={{ whiteSpace: 'nowrap' }}>Payment : Cash-on-Delivery</h5>
                                                                    <div>
                                                                        <button className='btn btn-success'>Accept</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default UserDetails;