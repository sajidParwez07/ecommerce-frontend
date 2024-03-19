import React, {useState,useEffect} from "react";
import AdminHeader from "./adminheader";

const MyDashboard = () => {
    let[product,updateProduct] = useState([]);
    let[order, updateOrder]=useState([]);

    const getOrder = () =>{
        fetch("http://localhost:1234/orderlist")
        .then(response=>response.json())
        .then(orderArray=>{
            updateOrder(orderArray);
        })
    }

    const getProduct = () =>{
        fetch("http://localhost:1234/product")
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray);
        })
    }
    useEffect(()=>{
        getOrder();
        getProduct();
    },[1]);
    return(
        <>
            <AdminHeader/>
            <div className="container mt-5">
                    <div className="row mb-4">
                            <div className="col-lg-12 text-center">
                                <h2 className="text-primary"> Dashboard</h2>
                            </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-3">
                            <div className="p-4 rounded border shadow">
                                <i className="fa fa-suitcase fa-4x text-info"> </i>
                                <h4> {product.length} Total Products </h4>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="p-4 rounded border shadow">
                                <i className="fa fa-headset fa-4x text-success"> </i>
                                <h4> {order.length} Total Orders </h4>
                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
            </div>
        </>
    )

}
export default MyDashboard;