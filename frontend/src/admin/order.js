import React, { useEffect, useState } from "react";
import AdminHeader from "./adminheader";
import { useNavigate } from "react-router-dom";


const MyOrder = () => {
    let [order, setOrder] = useState([]);
    const navigate = useNavigate();

    const getproduct = () => {
        fetch('http://localhost:1234/orderlist')
            .then(Response => Response.json())
            .then(serRes => {
                const data = serRes.map((value) => {
                    return value;
                });
                setOrder(data)
            })
    };

    useEffect(() => {
        getproduct();
    }, [1]);


    const orderDetailsByUser = (userid) =>{
        // console.log('userid***', userid)
        navigate('/userdetails/'+userid);
    };


    return (
        <>
            <AdminHeader />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3 className="text-success">Total Orders {order.length} </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h6 className="text-center text-danger"> Order Item </h6>
                        <table className="table table-bordered shadow rounded text-center">
                            <thead>
                                <tr className="bg-light text-primary">
                                    <th> user ID </th>
                                    <th> Product Name </th>
                                    <th> Product Price </th>
                                    <th> Product Photo </th>
                                    <th> Product Quantity </th>
                                    <th> total Price </th>
                                    <th> User Details </th>
                                </tr>
                            </thead>
                            {
                                order.map((value, index) => {
                                    return (
                                        value.orderitem.map((pdata, index) => {
                                            return (
                                                <>
                                                    <tbody>
                                                        <tr key={index + 1}>
                                                            <td> {pdata.cid} </td>
                                                            <td> {pdata.iteminfo.name} </td>
                                                            <td> {pdata.iteminfo.price} </td>
                                                            <td><img src={pdata.iteminfo.photo} height="50" width="60" /></td>
                                                            <td>{pdata.quantity}</td>
                                                            <td>{pdata.totalPrice}</td>
                                                            <td>
                                                                <button className="btn btn-success" onClick={orderDetailsByUser.bind(this, pdata.cid)}>Details</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </>
                                            )
                                        })
                                    )
                                })
                            }
                        </table>
                    </div >
                </div >
            </div >
        </>
    )

}
export default MyOrder;